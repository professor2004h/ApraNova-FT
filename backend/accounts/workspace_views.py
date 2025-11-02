import docker
import socket
import os
from pathlib import Path
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings

# Only connect to Docker if available (prevents crash on Render)
try:
    client = docker.from_env()
except Exception as e:
    client = None
    print(f"Docker not available: {e}")

def get_free_port():
    """Find an available port for user container."""
    s = socket.socket()
    s.bind(('', 0))
    port = s.getsockname()[1]
    s.close()
    return port

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_workspace(request):
    """Provision code-server container for the user"""

    # Check if Docker is available
    if client is None:
        return Response(
            {
                "error": "Workspace feature not available",
                "message": "Docker is not accessible from the backend container. This feature requires Docker-in-Docker configuration with proper permissions.",
                "details": "Please contact your administrator to enable workspace provisioning."
            },
            status=status.HTTP_503_SERVICE_UNAVAILABLE
        )
    
    user = request.user
    container_name = f"workspace_{user.id}"
    try:
        # Check if container already exists
        container = client.containers.get(container_name)
        container.reload()

        # Get the port mapping
        port_bindings = container.attrs['HostConfig']['PortBindings']
        if port_bindings and '8080/tcp' in port_bindings:
            port = port_bindings['8080/tcp'][0]['HostPort']
        else:
            port = "8080"

        # Use localhost URL for development
        use_localhost = os.getenv("DEBUG", "False").lower() == "true"
        if use_localhost:
            url = f"http://localhost:{port}"
        else:
            url = f"http://workspace-{user.id}.apranova.com"

        if container.status == "running":
            return Response(
                {"url": url, "port": port, "status": "running"},
                status=status.HTTP_200_OK,
            )
        else:
            container.start()
            return Response(
                {"url": url, "port": port, "status": "started"},
                status=status.HTTP_200_OK,
            )
    except docker.errors.NotFound:
        port = get_free_port()

        # Create workspace directory if it doesn't exist
        workspace_base = os.getenv("WORKSPACE_BASE_PATH", "/app/workspaces")
        user_volume = f"{workspace_base}/{user.id}"
        Path(user_volume).mkdir(parents=True, exist_ok=True)

        # Use localhost URL for development
        use_localhost = os.getenv("DEBUG", "False").lower() == "true"

        try:
            container = client.containers.run(
                "apra-nova-code-server:latest",
                name=container_name,
                detach=True,
                ports={"8080/tcp": port},
                environment={
                    "PASSWORD": f"{user.id}_workspace",
                },
                volumes={user_volume: {"bind": "/home/coder/project", "mode": "rw"}},
                network="apranova_network",  # Use the same network as other containers
                restart_policy={"Name": "unless-stopped"},
            )

            # Return localhost URL for development
            if use_localhost:
                url = f"http://localhost:{port}"
            else:
                url = f"http://workspace-{user.id}.apranova.com"

            return Response(
                {"url": url, "port": port, "msg": "Workspace created successfully."},
                status=status.HTTP_201_CREATED,
            )
        except docker.errors.ImageNotFound:
            return Response(
                {
                    "error": "Code-server image not found",
                    "message": "The apra-nova-code-server:latest image needs to be built first.",
                    "details": "Run: docker build -t apra-nova-code-server:latest ./backend/apra-nova-code-server"
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
