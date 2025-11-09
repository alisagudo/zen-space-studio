import { Calendar } from "../components/ui/Calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from '../components/ui/Button'
import { Badge } from "../components/ui/Badge";
import { useState } from "react";

const bookings = [
  { date: new Date(2025, 9, 16), title: "Vinyasa Yoga", time: "7:00 AM - 8:30 AM", instructor: "Tuuli Tuul" },
  { date: new Date(2025, 9, 16), title: "Meditatsiooni Workshop", time: "10:00 AM - 12:00 PM", instructor: "Peeter Peet" },
  { date: new Date(2025, 9, 17), title: "Pilates Core Strength", time: "6:00 PM - 7:00 PM", instructor: "Emma Wilson" },
  { date: new Date(2025, 9, 18), title: "Breathwork Circle", time: "5:30 PM - 6:30 PM", instructor: "David Park" },
  { date: new Date(2025, 9, 19), title: "Vinyasa Flow", time: "9:00 AM - 10:00 AM", instructor: "Sarah Chen" },
  { date: new Date(2025, 9, 20), title: "Corporate Wellness Event", time: "2:00 PM - 5:00 PM", instructor: "Private Event" },
];

export function CalendarSection() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(2025, 9, 16));

  const bookingsForSelectedDate = selectedDate
    ? bookings.filter(
        booking =>
          booking.date.toDateString() === selectedDate.toDateString()
      )
    : [];

  return (
    <section id="calendar" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 text-gray-800">
            Stuudio tunniplaan
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Vali kuupäev</CardTitle>
              <CardDescription>Klõpsake kuupäeval, et vaadata planeeritud üritusi</CardDescription>
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
                {selectedDate ? selectedDate.toLocaleDateString('et-EE', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                }) : 'Vali kuupäev'}
              </CardTitle>
              <CardDescription>
                {bookingsForSelectedDate.length > 0 
                  ? `${bookingsForSelectedDate.length} broneering${bookingsForSelectedDate.length > 1 ? 'ut' : ''} planeeritud`
                  : 'Sel kuupäeval pole broneeringuid'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookingsForSelectedDate.length > 0 ? (
                  bookingsForSelectedDate.map((booking, index) => (
                    <div
                      key={index}
                      className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-gray-800">{booking.title}</h4>
                        <Badge variant="secondary">Broneeritud</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{booking.time}</p>
                      <p className="text-sm text-gray-500">Juhendaja: {booking.instructor}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>See kuupäev on broneerimiseks saadaval!</p>
                    <p className="text-sm mt-2">Võtke meiega ühendust selle aja broneerimiseks</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Soovite broneerida aega? Võtke meiega ühendust kättesaadavuse ja hindade kontrollimiseks.
          </p>
        </div>
      </div>
    </section>
  );
}

export default CalendarSection;

