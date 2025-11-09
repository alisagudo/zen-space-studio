import { Routes, Route } from 'react-router-dom'
import { Navigation } from './components/Navbar'
import Avaleht from './pages/Avaleht'
import { Booking } from './pages/Booking'
import { Services } from './pages/Teenused'
import Tunniplaan from './pages/Tunniplaan'
import { Contact } from './pages/Kontakt'

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Avaleht />} />
        <Route path="/teenused" element={<Services />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/tunniplaan" element={<Tunniplaan />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  )
}

export default App
