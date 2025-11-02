@echo off
echo ========================================
echo ApraNova Quick Setup
echo ========================================
echo.
echo This will set up your ApraNova project.
echo.
echo Prerequisites:
echo - Docker Desktop must be installed
echo.
pause

echo.
echo Running setup script...
echo.

powershell -ExecutionPolicy Bypass -File setup.ps1

echo.
echo ========================================
echo Setup script completed!
echo ========================================
echo.
echo To create a superuser, run:
echo docker-compose exec backend python manage.py createsuperuser
echo.
pause

