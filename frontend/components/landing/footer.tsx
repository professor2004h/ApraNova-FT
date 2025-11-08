"use client"

import Link from "next/link"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"

export default function Footer() {
  const footerLinks = {
    product: [
      { label: "Features", href: "#features" },
      { label: "Tracks", href: "#tracks" },
      { label: "Pricing", href: "/pricing" },
      { label: "FAQ", href: "/faq" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
    legal: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cookie Policy", href: "/cookie-policy" },
      { label: "Refund Policy", href: "/refund" },
    ],
  }

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Mail, href: "mailto:support@apranova.com", label: "Email" },
  ]

  return (
    <footer className="bg-gray-900 dark:bg-black border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold text-white">
                ApraNova
              </span>
            </Link>
            <p className="text-gray-400 mb-4 max-w-xs">
              Empowering the next generation of tech professionals with cloud-based learning.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-900 hover:text-white transition-colors text-gray-400"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} ApraNova. All rights reserved.
          </p>
          <p className="text-sm text-gray-400">
            Made with ❤️ for aspiring developers
          </p>
        </div>
      </div>
    </footer>
  )
}
