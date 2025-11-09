import { Facebook, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="text-white text-xl mb-4">Zen Space Studio</div>
            <p className="text-sm">
              Calm your mind, nourish your soul & connect with your body.
            </p>
          </div>

          <div>
            <h4 className="text-white mb-4">Kiirlingid</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="hover:text-white transition-colors">Avaleht</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Teenused</a></li>
              <li><a href="#calendar" className="hover:text-white transition-colors">Tunniplaan</a></li>
              <li><a href="#booking" className="hover:text-white transition-colors">Broneerimine</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Kontakt</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4">Kontakt</h4>
            <ul className="space-y-2 text-sm">
              <li>Kalaranna 8/11, Tallinn</li>
              <li>+372 5XXX XXXX</li>
              <li>sten@zenspace.ee</li>
              <li className="flex items-center gap-2 pt-2">
                <a 
                  href="https://instagram.com/zen.space.studio" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.facebook.com/profile.php?id=100094370556638&locale=et_EE" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; Zen Space Studio</p>
        </div>
      </div>
    </footer>
  );
}
