import { Routes, Route } from 'react-router-dom'
import { Navigation } from './components/Navbar'
import Avaleht from './pages/Avaleht'
import { Booking } from './pages/Booking'
import { Services } from './pages/Teenused'
import Tunniplaan from './pages/Tunniplaan'
import { Contact } from './pages/Kontakt'
import { Footer } from './pages/Footer' 
import './styles/progress.css';

function App() {
  return (
    <div className="App flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Avaleht />} />
          <Route path="/teenused" element={<Services />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/tunniplaan" element={<Tunniplaan />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer /> { }
    </div>
  )
}

export default App
