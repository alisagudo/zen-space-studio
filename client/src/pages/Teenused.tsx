import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "../components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/Tabs";
import { Button } from "../components/ui/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";

export function Services() {
  const [services, setServices] = useState<any[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  const activeTab =
    location.pathname.includes("activities") ? "activities" : "space";

  useEffect(() => {
    fetch("http://localhost:4000/services")
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(() => {});
  }, []);

  const spaceServices = services.filter(s => s.category === "space");
  const activityServices = services.filter(s => s.category === "activity");

  const handleTab = (value: string) => {
    navigate(`/services/${value}`);
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 text-gray-800">Mis on Zen Space?</h2>
        </div>

        <Tabs value={activeTab} onValueChange={handleTab}>

          <TabsList className="grid grid-cols-2 max-w-2xl mx-auto mb-12 rounded-full p-1.5">
            <TabsTrigger value="space">Tutvu ruumiga</TabsTrigger>
            <TabsTrigger value="activities">Avasta tegevusi</TabsTrigger>
          </TabsList>

          {/* SPACE TAB */}
          <TabsContent value="space">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {spaceServices.map(service => (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mb-4">
                      {service.icon && (
                        <span className="text-4xl">{service.icon}</span>
                      )}
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="text-center mt-10">
              <Button asChild>
                <Link to="/booking">Broneeri ruum</Link>
              </Button>
            </div>
          </TabsContent>

          {/* ACTIVITIES TAB */}
          <TabsContent value="activities">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activityServices.map(service => (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mb-4">
                      {service.icon && (
                        <span className="text-4xl">{service.icon}</span>
                      )}
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="text-center mt-10">
              <Button asChild>
                <Link to="/tunniplaan">Vaata tunniplaani</Link>
              </Button>
            </div>
          </TabsContent>

        </Tabs>
      </div>
    </section>
  );
}
