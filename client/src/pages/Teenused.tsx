import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from '../components/ui/Button'
import { Users, Calendar, Clock, Check } from "lucide-react";
import logo from "../assets/zen-space-logo.PNG"

export function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 text-gray-800">
            Meie teenused
          </h2>
          
          <h3 className="text-2xl text-gray-800 mt-8 mb-4">
            Ruum igale praktikale!
          </h3>
          
          <p className="text-gray-600">
            Meie stuudio pakub hubast, valgusküllast keskkonda, mis sobib ideaalselt 
            erinevateks praktikateks ja üritusteks.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
          <div className="space-y-6">

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="text-gray-800">Jooga- ja meditatsioonitunnid</div>
                  <div className="text-sm text-gray-600">Liikumise ja kehalise teadlikkuse praktikad</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="text-gray-800">Pilatese treeningud</div>
                  <div className="text-sm text-gray-600">Korraldage oma regulaarseid treeninguid meie hubases ruumis</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="text-gray-800">Teetseremooniad</div>
                  <div className="text-sm text-gray-600">Rahulikud hetked tee nautimiseks ja sisemise rahu leidmiseks</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="text-gray-800">Helirännakud</div>
                  <div className="text-sm text-gray-600">Sügavad tervendamise sessioonid</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="text-gray-800">Hingamispraktikad</div>
                  <div className="text-sm text-gray-600">Sügavavad ja turvalised rännakud alateadvusesse</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="text-gray-800">Kunstinäitused</div>
                  <div className="text-sm text-gray-600">Stuudio ruumide seinad on ka kunstnikele galeriide korraldamiseks</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="text-gray-800">Eraüritused</div>
                  <div className="text-sm text-gray-600">Looge meeldejäävaid kogemusi eriliste inimeste ringis</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="text-gray-800">Seminarid ja koolitused</div>
                  <div className="text-sm text-gray-600">Ideaalne workshop'ideks ja töötubadeks</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="text-gray-800">Ettevõtte heaolu</div>
                  <div className="text-sm text-gray-600">Meeskonnaüritused ettevõtetele</div>
                </div>
              </div>
            </div>

            <Button size="lg" className="mt-4" asChild>
              <a href="#booking">Broneeri ruum</a>
            </Button>
          </div>

          <div className="flex justify-center lg:justify-end">
            <img
              src={logo}
              alt="Zen Space Studio interior"
              className="rounded-2xl shadow-xl w-4/5 h-auto"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle>Mahutavus</CardTitle>
              <CardDescription>
                Ruum mahutab kuni 15 inimest korraga
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle>Paindlik broneerimine</CardTitle>
              <CardDescription>
                Saadaval tunnipõhised ja terve päeva rentimivõimalused
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle>Lahtiolekuajad</CardTitle>
              <CardDescription>
                Esmaspäev - pühapäev, 7:00 - 23:00
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}
