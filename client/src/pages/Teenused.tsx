import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/Tabs";
import { Users, Calendar, Clock, Check, Sparkles, Heart, Music, Coffee } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { useLocation, useNavigate } from "react-router-dom";


export function Services() {
  const location = useLocation();
  const navigate = useNavigate();

  // Mis tab on URL-i järgi?
  const activeTab = location.pathname.includes("activities")
    ? "activities"
    : "space";

  // Kui kasutaja vahetab tabi, uuendame URL-i
  const handleTabChange = (value: string) => {
    navigate(`/services/${value}`);
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 text-gray-800">
            Mis on Zen Space?
          </h2>
          <p className="text-gray-600">
            Ruum, mis toetab kohalolu ja loovust.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-2 mb-12 h-auto rounded-full p-1.5">
            <TabsTrigger value="space" className="h-auto py-2.5 flex flex-col gap-0.5 rounded-full">
              <span>Tutvu stuudio</span>
              <span>ruumi võimalustega</span>
            </TabsTrigger>
            <TabsTrigger value="activities" className="h-auto py-2.5 flex flex-col gap-0.5 rounded-full">
              <span>Avasta, mida siin</span>
              <span>korraldatakse!</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: Ruumi ja broneerimisvõimalused */}
          <TabsContent value="space" className="space-y-12">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-3xl text-gray-800 mb-4">Ruumi omadused:</h3>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-gray-800">Valgusküllane ruum</div>
                      <div className="text-sm text-gray-600">Looduslik päevavalgus ja suured aknad</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-gray-800">Mahutavus</div>
                      <div className="text-sm text-gray-600">Ruum mahutab kuni 15 inimest</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-gray-800">Heliüsüsteem</div>
                      <div className="text-sm text-gray-600">Professionaalne heliüsüsteem bluetooth ühendusega</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-gray-800">Joogavarustus</div>
                      <div className="text-sm text-gray-600">Joogamatid, plokid, pleedid ja padjad</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-gray-800">Hubane kööginurk</div>
                      <div className="text-sm text-gray-600">Võimalus teha teed või kohvi</div>
                    </div>
                  </div>
                </div>

                <Button size="lg" className="mt-4" asChild>
                  <Link to="/booking">Broneeri ruum</Link>
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-3xl text-gray-800 mb-2">Broneerimine ja hinnad:</h3>
                </div>
                
                <div className="grid gap-6">
                  <div className="p-6 border-2 border-gray-800 rounded-lg bg-gray-50">
                    <div className="text-gray-800 mb-2">Tunnipõhine</div>
                    <div className="text-3xl text-gray-800 mb-1">25€</div>
                    <div className="text-sm text-gray-600 mb-4">tund</div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Ideaalne lühemateks sessioonideks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Kõik varustus kaasa arvatud</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 border-2 border-gray-800 rounded-lg bg-gray-50">
                    <div className="text-gray-800 mb-2">Pool päeva</div>
                    <div className="text-3xl text-gray-800 mb-1">90€</div>
                    <div className="text-sm text-gray-600 mb-4">4 tundi</div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Ideaalne workshopideks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Soodustus 10€ võrreldes tunnitasuga</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Kõik varustus kaasa arvatud</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 border-2 border-gray-800 rounded-lg bg-gray-50">
                    <div className="text-gray-800 mb-2">Terve päev</div>
                    <div className="text-3xl text-gray-800 mb-1">160€</div>
                    <div className="text-sm text-gray-600 mb-4">8 tundi</div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Ideaalne üritusteks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Soodustus 40€ võrreldes tunnitasuga</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Kõik varustus kaasa arvatud</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Tab 2: Mis stuudio ruumis toimub */}
          <TabsContent value="activities" className="space-y-12">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h3 className="text-3xl text-gray-800 mb-4">
                Ruum igale praktikale!
              </h3>
              <p className="text-gray-600">
                Meie stuudio on mitmekülgne ruum, mis sobib erinevateks 
                praktikateks ja üritusteks. Avasta, mida siin korraldatakse!
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle>Jooga- ja meditatsioonitunnid</CardTitle>
                  <CardDescription>
                    Liikumise ja kehalise teadlikkuse praktikad
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle>Pilatese treeningud</CardTitle>
                  <CardDescription>
                    Korraldage oma regulaarseid treeninguid meie hubases ruumis
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Coffee className="w-6 h-6 text-green-600" />
                  </div>
                  <CardTitle>Teetseremooniad</CardTitle>
                  <CardDescription>
                    Rahulikud hetked tee nautimiseks ja sisemise rahu leidmiseks
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                    <Music className="w-6 h-6 text-pink-600" />
                  </div>
                  <CardTitle>Helirännakud</CardTitle>
                  <CardDescription>
                    Sügavad tervendamise sessioonid
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6 text-teal-600" />
                  </div>
                  <CardTitle>Hingamispraktikad</CardTitle>
                  <CardDescription>
                    Sügavavad ja turvalised rännakud alateadvusesse
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6 text-amber-600" />
                  </div>
                  <CardTitle>Kunstinäitused</CardTitle>
                  <CardDescription>
                    Stuudio ruumide seinad on ka kunstnikele galeriide korraldamiseks
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-rose-600" />
                  </div>
                  <CardTitle>Eraüritused</CardTitle>
                  <CardDescription>
                    Looge meeldejäävaid kogemusi eriliste inimeste ringis
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-indigo-600" />
                  </div>
                  <CardTitle>Seminarid ja koolitused</CardTitle>
                  <CardDescription>
                    Ideaalne workshop'ideks ja töötubadeks
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-cyan-600" />
                  </div>
                  <CardTitle>Ettevõtte heaolu</CardTitle>
                  <CardDescription>
                    Meeskonnaüritused ettevõtetele
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <div className="text-center">
              <Button size="lg" asChild>
                <a href="#calendar">Vaata tunniplaani</a>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}