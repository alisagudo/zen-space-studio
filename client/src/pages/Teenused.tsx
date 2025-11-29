import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "../components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/Tabs";
import { Button } from "../components/ui/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";

import * as Icons from "lucide-react";

// Map icon names from backend → Lucide icons
const ICONS: Record<string, any> = Icons;

export function Services() {
  const [services, setServices] = useState<any[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  const activeTab =
    location.pathname.includes("activities") ? "activities" : "space";

  useEffect(() => {
    fetch("http://localhost:4000/services")
      .then(res => res.json())
      .then(data => setServices(data));
  }, []);

  const spaceFeatures = services.filter(s => s.category === "space-feature");
  const spacePricing = services.filter(s => s.category === "space-pricing");
  const activityServices = services.filter(s => s.category === "activity");

  const handleTab = (value: string) => navigate(`/services/${value}`);

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 text-gray-800">Mis on Zen Space?</h2>
          <p className="text-gray-600">Ruum, mis toetab kohalolu ja loovust.</p>
        </div>

        <Tabs value={activeTab} onValueChange={handleTab}>
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-2 mb-12 h-auto rounded-full p-1.5">
            <TabsTrigger value="space" className="flex flex-col">Tutvu stuudio<br/>ruumi võimalustega</TabsTrigger>
            <TabsTrigger value="activities" className="flex flex-col">Avasta, mida siin<br/>korraldatakse!</TabsTrigger>
          </TabsList>

          {/* SPACE TAB */}
          <TabsContent value="space" className="space-y-12">
            <div className="grid md:grid-cols-2 gap-12 items-start">

              {/* LEFT — FEATURES */}
              <div className="space-y-6">
                <h3 className="text-3xl text-gray-800 mb-4">Ruumi omadused:</h3>
                <div className="space-y-4">

                  {spaceFeatures.map((f) => (
                    <div key={f.id} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                        <Icons.Check className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-gray-800">{f.title}</div>
                        <div className="text-sm text-gray-600">{f.description}</div>
                      </div>
                    </div>
                  ))}

                </div>

                <Button size="lg" className="mt-4" asChild>
                  <Link to="/booking">Broneeri ruum</Link>
                </Button>
              </div>

              {/* RIGHT — PRICING */}
              <div className="space-y-4">
                <h3 className="text-3xl text-gray-800 mb-2">Broneerimine ja hinnad:</h3>

                <div className="grid gap-6">
                  {spacePricing.map((p) => {
                    const Icon = ICONS[p.icon];
                    const priceNum = p.description.match(/^\d+/)?.[0];

                    const descShort = p.description.includes("—")
                      ? p.description.split("—")[1].trim()
                      : p.description;

                    return (
                      <div key={p.id} className="p-6 border-2 border-gray-800 rounded-lg bg-gray-50">
                        <div className="flex items-center gap-2 mb-2 text-gray-800">
                          {Icon && <Icon className="w-5 h-5 text-gray-800" />}
                          <span>{p.title}</span>
                        </div>

                        {priceNum && (
                          <div className="text-3xl text-gray-800 mb-1">{priceNum}€</div>
                        )}

                        <div className="text-sm text-gray-600 mb-4">{descShort}</div>

                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start gap-2">
                            <Icons.Check className="w-4 h-4 text-green-600 mt-0.5" />
                            <span>{p.description}</span>
                          </li>
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </TabsContent>

          {/* ACTIVITIES TAB */}
          <TabsContent value="activities" className="space-y-12">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h3 className="text-3xl text-gray-800 mb-4">Ruum igale praktikale!</h3>
              <p className="text-gray-600">Avasta, mida siin korraldatakse!</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activityServices.map((service) => {
                const Icon = ICONS[service.icon];

                return (
                  <Card key={service.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                        {Icon && <Icon className="w-6 h-6 text-gray-700" />}
                      </div>
                      <CardTitle>{service.title}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>

            <div className="text-center">
              <Button size="lg" asChild>
                <Link to="/tunniplaan">Vaata tunniplaani</Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
