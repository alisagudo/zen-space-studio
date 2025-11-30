import React from "react"
import { Calendar } from "./ui/Calendar"
import { et } from "date-fns/locale"

type WrapperCalendarProps = React.ComponentProps<typeof Calendar> & {
  calendarMode?: "booking" | "timetable" | "basic"
}

export function WrapperCalendar({
  calendarMode = "basic",
  modifiers,
  modifiersClassNames,
  ...props
}: WrapperCalendarProps) {

  const bookingDefaults =
    calendarMode === "booking"
      ? {
          modifiers: {
            fullyBooked: () => false,
            partiallyBooked: () => false,
            available: () => false,
            ...modifiers,
          },
          modifiersClassNames: {
            fullyBooked: "rdp-day--fullyBooked",
            partiallyBooked: "rdp-day--partiallyBooked",
            available: "rdp-day--available",
            ...modifiersClassNames,
          },
        }
      : {}

  return (
    <Calendar
      locale={et}
      weekStartsOn={1}
      {...bookingDefaults}
      {...props}
    />
  )
}

export default WrapperCalendar;
