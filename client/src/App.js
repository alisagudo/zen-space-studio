import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Avaleht from './pages/Avaleht'
import Teenused from './pages/Teenused'
import Tunniplaan from './pages/Tunniplaan'
import Kontakt from './pages/Kontakt'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Avaleht />} />
        <Route path="/schedule" element={<Teenused />} />
        <Route path="/booking" element={<Tunniplaan />} />
        <Route path="/contact" element={<Kontakt />} />
      </Routes>
    </div>
  )
}

export default App
