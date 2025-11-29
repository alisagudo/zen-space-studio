import { useEffect, useState } from "react";
import { Facebook, Instagram } from "lucide-react";

export function Footer() {
  const [info, setInfo] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:4000/studioinfo")
      .then(res => res.json())
      .then(data => setInfo(data));
  }, []);

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
              <li><a href="/" className="hover:text-white">Avaleht</a></li>
              <li><a href="/teenused" className="hover:text-white">Teenused</a></li>
              <li><a href="/tunniplaan" className="hover:text-white">Tunniplaan</a></li>
              <li><a href="/booking" className="hover:text-white">Broneerimine</a></li>
              <li><a href="/contact" className="hover:text-white">Kontakt</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4">Kontakt</h4>

            {info && (
              <ul className="space-y-2 text-sm">
                <li>{info.location}</li>
                <li>{info.phone}</li>
                <li>{info.email}</li>
                <li className="flex items-center gap-2 pt-2">
                  <a href={`https://instagram.com/${info.instagram.replace("@", "")}`}
                     target="_blank"
                     className="hover:text-white"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href={`https://facebook.com/${info.facebook.replace(/\s/g, "")}`}
                     target="_blank"
                     className="hover:text-white"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; Zen Space Studio</p>
        </div>

      </div>
    </footer>
  );
}
