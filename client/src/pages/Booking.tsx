import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Textarea } from "../components/ui/Textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/Select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card";
import { Calendar, Clock, Users, Mail, Phone, User } from "lucide-react";
import { toast } from "sonner";

export function Booking() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    duration: "",
    people: "",
    eventType: "",
    otherEventType: "",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toast.success("Broneeringu taotlus edukalt saadetud! Võtame teiega peagi ühendust.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      duration: "",
      people: "",
      eventType: "",
      otherEventType: "",
      notes: ""
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="booking" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 text-gray-800">
            Broneeri ruum
          </h2>
          <p className="text-xl text-gray-600">
            Täida vorm ja me võtame sinuga ühendust broneeringu kinnitamiseks
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Broneeringu üksikasjad</CardTitle>
                <CardDescription>
                  Palun täida kõik väljad, et alustada broneerimist
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nimi *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="name"
                        placeholder="Teie nimi"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-post *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="teie@email.ee"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+372 5XXX XXXX"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Kuupäev *</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="date"
                          type="date"
                          value={formData.date}
                          onChange={(e) => handleChange("date", e.target.value)}
                          required
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time">Kellaaeg *</Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="time"
                          type="time"
                          value={formData.time}
                          onChange={(e) => handleChange("time", e.target.value)}
                          required
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Kestus *</Label>
                    <Select value={formData.duration} onValueChange={(value) => handleChange("duration", value)} required>
                      <SelectTrigger id="duration">
                        <SelectValue placeholder="Vali kestus" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1hour">1 tund</SelectItem>
                        <SelectItem value="2hours">2 tundi</SelectItem>
                        <SelectItem value="3hours">3 tundi</SelectItem>
                        <SelectItem value="halfday">Pool päeva (4 tundi)</SelectItem>
                        <SelectItem value="fullday">Terve päev (8 tundi)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="people">Inimeste arv *</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="people"
                        type="number"
                        min="1"
                        max="15"
                        placeholder="Osalejate arv (max 15)"
                        value={formData.people}
                        onChange={(e) => handleChange("people", e.target.value)}
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="eventType">Ürituse tüüp *</Label>
                    <Select value={formData.eventType} onValueChange={(value) => handleChange("eventType", value)} required>
                      <SelectTrigger id="eventType">
                        <SelectValue placeholder="Vali ürituse tüüp" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yoga">Joogatund</SelectItem>
                        <SelectItem value="meditation">Meditatsioonitund</SelectItem>
                        <SelectItem value="pilates">Pilatese treening</SelectItem>
                        <SelectItem value="tea-ceremony">Teetseremoonia</SelectItem>
                        <SelectItem value="sound-journey">Helirännak</SelectItem>
                        <SelectItem value="breathwork">Hingamispraktika</SelectItem>
                        <SelectItem value="art-exhibition">Kunstinäitus</SelectItem>
                        <SelectItem value="private-event">Eraüritus</SelectItem>
                        <SelectItem value="seminar-training">Seminar või koolitus</SelectItem>
                        <SelectItem value="corporate">Ettevõtte heaolu</SelectItem>
                        <SelectItem value="other">Muu</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.eventType === "other" && (
                    <div className="space-y-2">
                      <Label htmlFor="otherEventType">Palun täpsustage *</Label>
                      <Input
                        id="otherEventType"
                        placeholder="Kirjeldage oma ürituse tüüpi"
                        value={formData.otherEventType}
                        onChange={(e) => handleChange("otherEventType", e.target.value)}
                        required
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="notes">Lisainfo</Label>
                    <Textarea
                      id="notes"
                      placeholder="Kirjelda oma üritust või lisa erinõudeid..."
                      value={formData.notes}
                      onChange={(e) => handleChange("notes", e.target.value)}
                      rows={4}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Saada broneeringu taotlus
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ruumi info</CardTitle>
                <CardDescription>&nbsp;</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <Label>Mahutavus</Label>
                    <div className="text-sm text-gray-600">Kuni 15 inimest mugavalt</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <Label>Paindlik broneerimine</Label>
                    <div className="text-sm text-gray-600">Saadaval tunnipõhised ja terve päeva rentimivõimalused</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <Label>Lahtiolekuajad</Label>
                    <div className="text-sm text-gray-600">E-P, 7:00 - 23:00</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Stuudio varustus</CardTitle>
                <CardDescription>&nbsp;</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                    <div className="text-sm text-gray-600">Joogamatid ja rekvisiidid</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                    <div className="text-sm text-gray-600">Heliüsüsteem ja bluetooth ühendus</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                    <div className="text-sm text-gray-600">Tee ja vesi</div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-50">
              <CardContent className="pt-6">
                <p className="text-sm text-gray-600">
                  <span className="text-gray-800">Märkus:</span> Pärast broneeringu taotluse saatmist 
                  võtame teiega ühendust 24 tunni jooksul, et kinnitada kättesaadavus ja arutada 
                  üksikasju.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
