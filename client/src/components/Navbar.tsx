import { useState } from "react"
import { NavLink } from "react-router-dom"
import { Button } from "./ui/Button"
import { Menu, X } from "lucide-react"
import logo from "../assets/zen-space-logo.PNG"

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `transition-colors ${
      isActive ? "text-gray-900 font-semibold" : "text-gray-600 hover:text-gray-900"
    }`

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <NavLink to="/" className="flex items-center gap-3">
              <img src={logo} alt="Zen Space Studio" className="h-14 w-auto" />
              <div className="flex flex-col leading-tight">
                <span className="text-gray-800 font-semibold">Zen Space</span>
                <span className="text-gray-800">Studio</span>
              </div>
            </NavLink>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-12">
            <nav className="flex items-center gap-8">
              <NavLink to="/" className={linkClasses}>
                Avaleht
              </NavLink>
              <NavLink to="/teenused" className={linkClasses}>
                Teenused
              </NavLink>
              <NavLink to="/tunniplaan" className={linkClasses}>
                Tunniplaan
              </NavLink>
              <NavLink to="/contact" className={linkClasses}>
                Kontakt
              </NavLink>
            </nav>

            <Button asChild>
              <NavLink to="/booking" className="text-white">
                Broneeri ruum
              </NavLink>
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col gap-4">
              <NavLink
                to="/"
                className={linkClasses}
                onClick={() => setMobileMenuOpen(false)}
              >
                Avaleht
              </NavLink>
              <NavLink
                to="/teenused"
                className={linkClasses}
                onClick={() => setMobileMenuOpen(false)}
              >
                Teenused
              </NavLink>
              <NavLink
                to="/tunniplaan"
                className={linkClasses}
                onClick={() => setMobileMenuOpen(false)}
              >
                Tunniplaan
              </NavLink>
              <NavLink
                to="/contact"
                className={linkClasses}
                onClick={() => setMobileMenuOpen(false)}
              >
                Kontakt
              </NavLink>
              <Button className="w-full" asChild>
                <NavLink
                  to="/booking"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white"
                >
                  Broneeri ruum
                </NavLink>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
