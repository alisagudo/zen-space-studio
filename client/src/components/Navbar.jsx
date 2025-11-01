import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      <h2 className="text-2xl font-semibold text-blue-600">Zen Space Studio</h2>
      <ul className="flex gap-6">
        <li>
          <Link to="/" className="hover:text-blue-500">
            Avaleht
          </Link>
        </li>
        <li>
          <Link to="/schedule" className="hover:text-blue-500">
            Teenused
          </Link>
        </li>
        <li>
          <Link to="/booking" className="hover:text-blue-500">
            Tunniplaan
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-blue-500">
            Kontakt
          </Link>
        </li>
      </ul>
    </nav>
  )
}
