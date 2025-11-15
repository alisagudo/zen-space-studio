import { Calendar } from "../components/ui/Calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Textarea } from "../components/ui/Textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/Select";
import { useState } from "react";
import { Calendar as CalendarIcon, Clock, Users, Mail, Phone, User } from "lucide-react";
import { toast } from "sonner";

const bookings = [
  {
    date: new Date(2025, 10, 13),
    title: "Vinyasa Yoga",
    time: "7:00 AM - 8:30 AM",
    instructor: "Tuuli Tuul",
  },
  {
    date: new Date(2025, 10, 13),
    title: "Meditatsiooni Workshop",
    time: "10:00 AM - 12:00 PM",
    instructor: "Peeter Peet",
  },
  {
    date: new Date(2025, 10, 14),
    title: "Pilates",
    time: "6:00 PM - 7:00 PM",
    instructor: "Emma Erm",
  },
  {
    date: new Date(2025, 10, 15),
    title: "Hingamisrännak",
    time: "5:30 PM - 6:30 PM",
    instructor: "David Park",
  },
  {
    date: new Date(2025, 10, 16),
    title: "Teetseremoonia",
    time: "9:00 AM - 10:00 AM",
    instructor: "Saara Mets",
  },
  {
    date: new Date(2025, 10, 19),
    title: "Eraüritus",
    time: "7:00 AM - 11:00 PM",
    instructor: "Privaatne broneering",
  },
];

export function Booking() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2025, 10, 13));

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

  const bookingsForSelectedDate = selectedDate
    ? bookings.filter(
        (booking) =>
          booking.date.toDateString() ===
          selectedDate.toDateString(),
      )
    : [];

  // Arvutame lõppaja
  const calculateEndTime = () => {
    if (!formData.time || !formData.duration) {
      return "";
    }
    
    const [hours, minutes] = formData.time.split(":").map(Number);
    const durationH = parseInt(formData.duration);
    
    let endHours = hours + durationH;
    let endMinutes = minutes;
    
    return `${String(endHours).padStart(2, "0")}:${String(endMinutes).padStart(2, "0")}`;
  };

  // Funktsioon, mis arvutab, mitu broneeringut on päevas
  const getBookingsCountForDate = (date: Date) => {
    return bookings.filter(
      (booking) => booking.date.toDateString() === date.toDateString()
    ).length;
  };

  // Abifunktsioon aja parsimiseks (nt "7:00 AM - 8:30 AM" -> [7.0, 8.5])
  const parseTimeRange = (timeStr: string): [number, number] => {
    const parts = timeStr.split(" - ");
    const parseTime = (time: string): number => {
      const [hourMin, period] = time.split(" ");
      const [hourStr, minStr] = hourMin.split(":");
      let hour = parseInt(hourStr);
      const min = parseInt(minStr);
      
      if (period === "PM" && hour !== 12) {
        hour += 12;
      } else if (period === "AM" && hour === 12) {
        hour = 0;
      }
      
      return hour + min / 60;
    };
    
    return [parseTime(parts[0]), parseTime(parts[1])];
  };

  // Kontrollime, kas on vähemalt 1 tunni pikkune vaba aeg
  const hasAtLeastOneHourFree = (date: Date): boolean => {
    const dayBookings = bookings.filter(
      (booking) => booking.date.toDateString() === date.toDateString()
    );
    
    if (dayBookings.length === 0) return true; // Täiesti vaba päev
    
    const openTime = 7; // 7:00
    const closeTime = 23; // 23:00
    
    // Parsime kõik broneeringud ja sorteerime need algusaja järgi
    const timeRanges = dayBookings
      .map(b => parseTimeRange(b.time))
      .sort((a, b) => a[0] - b[0]);
    
    // Kontrollime vabu ajavahemikke
    
    // 1. Enne esimest broneeringut
    if (timeRanges[0][0] - openTime >= 1) {
      return true;
    }
    
    // 2. Broneeringute vahel
    for (let i = 0; i < timeRanges.length - 1; i++) {
      const gap = timeRanges[i + 1][0] - timeRanges[i][1];
      if (gap >= 1) {
        return true;
      }
    }
    
    // 3. Pärast viimast broneeringut
    if (closeTime - timeRanges[timeRanges.length - 1][1] >= 1) {
      return true;
    }
    
    return false;
  };

  // Päev on osaliselt hõivatud, kui on broneeringuid ja vähemalt 1h vaba
  const isDatePartiallyBooked = (date: Date) => {
    const count = getBookingsCountForDate(date);
    return count > 0 && hasAtLeastOneHourFree(date);
  };

  // Päev on täielikult hõivatud, kui on broneeringuid ega ole 1h vaba
  const isDateFullyBooked = (date: Date) => {
    const count = getBookingsCountForDate(date);
    return count > 0 && !hasAtLeastOneHourFree(date);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Kontrolli, kas valitud kuupäev on hõivatud
    if (formData.date) {
      const selectedFormDate = new Date(formData.date);
      const isBooked = bookings.some(booking => {
        const bookingDate = new Date(booking.date);
        return bookingDate.toDateString() === selectedFormDate.toDateString();
      });
      
      if (isBooked) {
        toast.error("See kuupäev on juba hõivatud! Palun valige teine kuupäev.");
        return;
      }
    }
    
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
    <section id="availability" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 text-gray-800">
            Ruumi saadavus ja broneerimine
          </h2>
          <p className="text-gray-600">
            Kontrollige ruumi kättesaadavust ja täitke broneerimise vorm
          </p>
          <div className="mt-6">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => {
                sessionStorage.setItem('zenSpaceTargetTab', 'space');
                window.location.hash = '#services';
              }}
            >
              Tutvu stuudio ruumi võimalustega
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Vasak pool - Kalender ja info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Kättesaadavuse kalender</CardTitle>
                <CardDescription>
                  <span className="inline-flex items-center gap-2">
                    <span className="inline-block w-3 h-3 bg-red-500 rounded-full"></span>
                    Täielikult hõivatud
                  </span>
                  <span className="inline-flex items-center gap-2 ml-4">
                    <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full"></span>
                    Osaliselt hõivatud
                  </span>
                  <span className="inline-flex items-center gap-2 ml-4">
                    <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                    Vaba
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="rounded-md border"
                  modifiers={{
                    fullyBooked: (date) => isDateFullyBooked(date),
                    partiallyBooked: (date) => isDatePartiallyBooked(date),
                    available: (date) =>
                      getBookingsCountForDate(date) === 0 && date >= new Date(),
                  }}
                  modifiersClassNames={{
                    fullyBooked:
                      "bg-red-100 text-red-900 hover:bg-red-200",
                    partiallyBooked:
                      "bg-yellow-100 text-yellow-900 hover:bg-yellow-200",
                    available:
                      "bg-green-100 text-green-900 hover:bg-green-200",
                  }}
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
                    ? isDateFullyBooked(selectedDate)
                      ? "Ruum hõivatud terveks päevaks"
                      : `${bookingsForSelectedDate.length} broneering${bookingsForSelectedDate.length > 1 ? "ut" : ""} sellel päeval`
                    : "Ruum on broneeringuteks saadaval"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookingsForSelectedDate.length > 0 ? (
                    <>
                      <div className="flex items-center gap-2 mb-4">
                        <div className={`w-4 h-4 rounded ${
                          isDateFullyBooked(selectedDate)
                            ? 'bg-red-500' 
                            : 'bg-yellow-500'
                        }`}></div>
                        <span className="text-sm text-gray-700">
                          {isDateFullyBooked(selectedDate)
                            ? 'Ruum on täielikult hõivatud' 
                            : 'Ruum on osaliselt hõivatud'}
                        </span>
                      </div>
                      {bookingsForSelectedDate.map(
                        (booking, index) => (
                          <div
                            key={index}
                            className={`p-4 border rounded-lg ${
                              isDateFullyBooked(selectedDate)
                                ? 'border-red-200 bg-red-50' 
                                : 'border-yellow-200 bg-yellow-50'
                            }`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="text-gray-800">
                                {booking.title}
                              </h4>
                              <Badge variant={isDateFullyBooked(selectedDate) ? "destructive" : "secondary"}>
                                Hõivatud
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">
                              {booking.time}
                            </p>
                            <p className="text-sm text-gray-500">
                              Juhendaja: {booking.instructor}
                            </p>
                          </div>
                        ),
                      )}
                      {!isDateFullyBooked(selectedDate) && (
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <p className="text-sm text-blue-800">
                            Päev on osaliselt hõivatud. Täitke broneerimise vorm, et broneerida vaba aeg.
                          </p>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-4 h-4 bg-green-500 rounded"></div>
                        <span className="text-sm text-gray-700">
                          Ruum on vaba
                        </span>
                      </div>
                      <div className="text-center py-8 border border-green-200 bg-green-50 rounded-lg">
                        <div className="text-green-700 mb-2">
                          <svg
                            className="w-12 h-12 mx-auto mb-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <p className="text-green-800 mb-2">
                          Ruum on sellel päeval vaba!
                        </p>
                        <p className="text-sm text-green-700">
                          Täitke paremal olev vorm selle aja broneerimiseks
                        </p>
                      </div>
                    </>
                  )}
                </div>
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

          {/* Parem pool - Broneerimise vorm */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Broneeringu vorm</CardTitle>
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
                        <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
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
                      <Label htmlFor="time">Alguskellaaeg *</Label>
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

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Kestus (tundides) *</Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="duration"
                          type="number"
                          min="1"
                          max="16"
                          placeholder="Kestus tundides"
                          value={formData.duration}
                          onChange={(e) => handleChange("duration", e.target.value)}
                          required
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  {calculateEndTime() && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <span className="font-semibold">Lõppaeg:</span> {calculateEndTime()}
                      </p>
                    </div>
                  )}

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
                        <SelectItem value="yoga-meditation">Jooga- ja meditatsioonitunnid</SelectItem>
                        <SelectItem value="pilates">Pilatese treeningud</SelectItem>
                        <SelectItem value="tea-ceremony">Teetseremooniad</SelectItem>
                        <SelectItem value="sound-journey">Helirännakud</SelectItem>
                        <SelectItem value="breathwork">Hingamispraktikad</SelectItem>
                        <SelectItem value="art-exhibition">Kunstinäitused</SelectItem>
                        <SelectItem value="private-event">Eraüritused</SelectItem>
                        <SelectItem value="seminar-training">Seminarid ja koolitused</SelectItem>
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
        </div>
      </div>
    </section>
  );
}