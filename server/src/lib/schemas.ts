import { z } from "zod";

// Coerce numbers when possible (incoming form values are often strings)
const toNumber = (schema: any) => z.preprocess((val) => {
  if (typeof val === "string" && val.trim() !== "") return Number(val);
  return val;
}, schema);

export const BookingSchema = z.object({
  roomId: toNumber(z.number().int().positive()).optional().default(1),
  date: z.string().min(1),
  title: z.string().optional(),
  time: z.string().optional(),
  instructor: z.string().optional(),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  startTime: z.string().min(1),
  duration: toNumber(z.number().int().positive()),
  numberOfPeople: toNumber(z.number().int().positive()),
  eventType: z.string(),
  notes: z.string().optional().nullable()
});

export const EventRegistrationSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  message: z.string().optional().nullable()
});

export const ContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(1)
});

export const ServiceSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().optional(),
  category: z.string().optional()
});


export type BookingDto = z.infer<typeof BookingSchema>;
export type EventRegistrationDto = z.infer<typeof EventRegistrationSchema>;
export type ContactDto = z.infer<typeof ContactSchema>;
export type ServiceDto = z.infer<typeof ServiceSchema>;

