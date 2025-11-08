import { Card, CardContent } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { Button } from '../components/ui/Button'
import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 text-gray-800">
            Võta ühendust
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl mb-6 text-gray-800">Kontaktandmed</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-gray-800">Asukoht</div>
                    <p className="text-gray-600">Kalaranna 8/11</p>
                    <p className="text-gray-600">Tallinn</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-gray-800">Telefon</div>
                    <p className="text-gray-600">+372 5XXX XXXX</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-gray-800">Email</div>
                    <p className="text-gray-600">sten@zenspace.ee</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <div className="text-gray-800">Instagram</div>
                    <a 
                      href="https://instagram.com/zen.space.studio" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      @zen.space.studio
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Facebook className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-gray-800">Facebook</div>
                    <a 
                      href="https://www.facebook.com/profile.php?id=100094370556638&locale=et_EE" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      Zen Space Studio
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-2xl mb-6 text-gray-800">Saada meile sõnum</h3>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm text-gray-700">Nimi</label>
                  <Input id="name" placeholder="Teie nimi" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm text-gray-700">E-post</label>
                  <Input id="email" type="email" placeholder="teie@email.ee" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm text-gray-700">Telefon</label>
                  <Input id="phone" type="tel" placeholder="+372 5XXX XXXX" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm text-gray-700">Sõnum</label>
                  <Textarea 
                    id="message" 
                    placeholder="Rääkige meile oma broneeringuvajadustest või esitage küsimusi..." 
                    rows={5} 
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Saada sõnum
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-5xl mx-auto mt-12">
          <div>
            <h3 className="text-2xl mb-4 text-gray-800">Lahtiolekuajad</h3>
            <div className="text-gray-600">
              Esmaspäev - pühapäev, 7:00 - 23:00
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
