import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "./ui/Button"
import { Menu, X } from "lucide-react"
import logo from "../assets/zen-space-logo.PNG"

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link to="/">
              <img src={logo} alt="Zen Space Studio" className="h-14 w-auto" />
            </Link>
            <div className="flex flex-col leading-tight">
              <span className="text-gray-800">Zen Space</span>
              <span className="text-gray-800">Studio</span>
            </div>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-12">
            <nav className="flex items-center gap-8">
              <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                Avaleht
              </Link>
              <Link to="/teenused" className="text-gray-600 hover:text-gray-900 transition-colors">
                Teenused
              </Link>
              <Link to="/tunniplaan" className="text-gray-600 hover:text-gray-900 transition-colors">
                Tunniplaan
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                Kontakt
              </Link>
            </nav>

            <Button asChild>
              <Link to="/booking">Broneeri ruum</Link>
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
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Avaleht
              </Link>
              <Link
                to="/teenused"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Teenused
              </Link>
              <Link
                to="/tunniplaan"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Tunniplaan
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Kontakt
              </Link>
              <Button className="w-full" asChild>
                <Link to="/booking" onClick={() => setMobileMenuOpen(false)}>
                  Broneeri ruum
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
