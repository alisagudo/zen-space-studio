import { Calendar } from "../components/ui/Calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Textarea } from "../components/ui/Textarea";
import { Button } from "../components/ui/Button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/Select";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from 'react-router-dom'

const bookings = [
  {
    date: new Date(2025, 10, 13),
    title: "Vinyasa Yoga",
    time: "7:00 AM - 8:30 AM",
    instructor: "Tuuli Tuul",
    capacity: 12,
    currentParticipants: 8,
  },
  {
    date: new Date(2025, 10, 13),
    title: "Meditatsiooni Workshop",
    time: "10:00 AM - 12:00 PM",
    instructor: "Peeter Peet",
    capacity: 15,
    currentParticipants: 15,
  },
  {
    date: new Date(2025, 10, 14),
    title: "Pilates",
    time: "6:00 PM - 7:00 PM",
    instructor: "Emma Erm",
    capacity: 10,
    currentParticipants: 5,
  },
  {
    date: new Date(2025, 10, 15),
    title: "Hingamisrännak",
    time: "5:30 PM - 6:30 PM",
    instructor: "David Park",
    capacity: 15,
    currentParticipants: 12,
  },
  {
    date: new Date(2025, 10, 16),
    title: "Teetseremoonia",
    time: "9:00 AM - 10:00 AM",
    instructor: "Saara Mets",
    capacity: 8,
    currentParticipants: 3,
  },
];

export function Tunniplaan () {
  const [selectedDate, setSelectedDate] = useState<
    Date | undefined
  >(new Date(2025, 10, 13));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    training: "",
    message: ""
  });

  const bookingsForSelectedDate = selectedDate
    ? bookings.filter(
        (booking) =>
          booking.date.toDateString() ===
          selectedDate.toDateString(),
      )
    : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Kontrolli, kas sõnumis mainitakse treeningut, mis on täis
    const hasFullCapacityClass = bookingsForSelectedDate.some(
      booking => booking.currentParticipants >= booking.capacity
    );
    
    if (hasFullCapacityClass && formData.message.trim() === "") {
      toast.error("Palun täpsustage sõnumis, millises treeningus soovite osaleda, et saaksime kontrollida kättesaadavust.");
      return;
    }
    
    toast.success("Sõnum edukalt saadetud! Võtame teiega peagi ühendust.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      training: "",
      message: ""
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="calendar" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 text-gray-800">
            Stuudio tunniplaan
          </h2>
          <p className="text-gray-600">
            Vaata meie treeningute ja ürituste ajakava ning registreeru
          </p>
          <div className="mt-6">
            <Link to="/services/activities">
              <Button variant="outline" size="lg">
                Avasta, mida siin korraldatakse!
            </Button>
          </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Vasak pool - Kalender ja üritused */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Vali kuupäev</CardTitle>
                <CardDescription>
                  Klõpsake kuupäeval, et vaadata planeeritud
                  üritusi
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedDate
                    ? selectedDate.toLocaleDateString("et-EE", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Vali kuupäev"}
                </CardTitle>
                <CardDescription>
                  {bookingsForSelectedDate.length > 0
                    ? `${bookingsForSelectedDate.length} broneering${bookingsForSelectedDate.length > 1 ? "ut" : ""} planeeritud`
                    : "Sel kuupäeval pole broneeringuid"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookingsForSelectedDate.length > 0 ? (
                    bookingsForSelectedDate.map(
                      (booking, index) => {
                        const isFull = booking.currentParticipants >= booking.capacity;
                        const spotsLeft = booking.capacity - booking.currentParticipants;
                        
                        return (
                          <div
                            key={index}
                            className={`p-4 border rounded-lg transition-colors ${
                              isFull 
                                ? 'border-red-300 bg-red-50' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="text-gray-800">
                                {booking.title}
                              </h4>
                              {isFull ? (
                                <Badge variant="destructive">
                                  Täis
                                </Badge>
                              ) : (
                                <Badge variant="secondary">
                                  {spotsLeft} {spotsLeft === 1 ? 'koht' : 'kohta'} vaba
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-1">
                              {booking.time}
                            </p>
                            <p className="text-sm text-gray-500 mb-1">
                              Juhendaja: {booking.instructor}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full transition-all ${isFull ? 'bg-red-500' : 'bg-green-500'} progress-bar`}
                                  style={{ "--progress": `${(booking.currentParticipants / booking.capacity) * 100}%` } as React.CSSProperties}
                                />
                              </div>
                              <span className="text-xs text-gray-500 min-w-fit">
                                {booking.currentParticipants}/{booking.capacity}
                              </span>
                            </div>
                            {isFull && (
                              <p className="text-xs text-red-600 mt-2">
                                See treening on täis. Võtke meiega ühendust ootejärjekorda lisamise kohta.
                              </p>
                            )}
                          </div>
                        );
                      }
                    )
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>
                        See kuupäev on broneerimiseks saadaval!
                      </p>
                      <p className="text-sm mt-2">
                        Täitke paremal olev vorm registreeringu jaoks
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Parem pool - Registreerimise vorm */}
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-2xl mb-6 text-gray-800">Registreerimise vorm</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm text-gray-700">Nimi *</Label>
                    <Input 
                      id="name" 
                      placeholder="Teie nimi" 
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm text-gray-700">E-post *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="teie@email.ee" 
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm text-gray-700">Telefon *</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="+372 5XXX XXXX" 
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="training" className="text-sm text-gray-700">Treening *</Label>
                    <Select
                      value={formData.training}
                      onValueChange={(value) => handleChange("training", value)}
                      required
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Vali treening" />
                      </SelectTrigger>
                      <SelectContent>
                        {bookingsForSelectedDate
                          .filter(booking => booking.currentParticipants < booking.capacity)
                          .map((booking) => {
                            const spotsLeft = booking.capacity - booking.currentParticipants;
                            return (
                              <SelectItem key={booking.title} value={booking.title}>
                                {booking.title} - {booking.time} ({spotsLeft} {spotsLeft === 1 ? 'koht' : 'kohta'} vaba)
                              </SelectItem>
                            );
                          })}
                        {bookingsForSelectedDate.filter(booking => booking.currentParticipants < booking.capacity).length === 0 && (
                          <SelectItem value="none" disabled>
                            Sel kuupäeval pole vabu kohti
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm text-gray-700">Sõnum</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Kas teil on küsimusi või erinõudeid?" 
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Saada registreering
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Kuidas registreeruda?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="text-gray-800 mb-1">
                        Vali treening
                      </h4>
                      <p className="text-sm text-gray-600">
                        Vaata kalendrist sobiv treening või üritus
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="text-gray-800 mb-1">
                        Täida vorm
                      </h4>
                      <p className="text-sm text-gray-600">
                        Täida registreerimisvorm oma andmetega
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="text-gray-800 mb-1">
                        Kinnitus
                      </h4>
                      <p className="text-sm text-gray-600">
                        Võtame teiega ühendust 24 tunni jooksul registreeringu kinnitamiseks
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50">
              <CardContent className="pt-6">
                <h4 className="text-gray-800 mb-2">Oluline info</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                    <span>Palun registreerige ennast vähemalt 2 tundi enne treeningu algust</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                    <span>Kohtade arv on piiratud, seega registreerige varakult</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                    <span>Kui ei saa osaleda, palun andge meile teada vähemalt 4 tundi ette</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Tunniplaan;
