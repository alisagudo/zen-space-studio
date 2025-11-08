import { Button } from '../components/ui/Button'
import { Link } from 'react-router-dom'
import homeImage from '../assets/zen-space.jpg'

export default function Avaleht() {
  return (
    <section id="home" className="pt-20 min-h-screen flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-8 mb-12">
            <h1 className="text-5xl md:text-6xl lg:text-7xl text-gray-800">Zen Space Studio</h1>

            <p className="text-xl text-gray-600">
              Calm your mind, nourish your soul & connect with your body.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/booking">Broneeri ruum</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/schedule">Vaata tunniplaani</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-green-200 to-blue-200 rounded-3xl opacity-30 blur-3xl" />
            <img
              src={homeImage}
              alt="Zen Space Studio interior"
              className="relative rounded-3xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
