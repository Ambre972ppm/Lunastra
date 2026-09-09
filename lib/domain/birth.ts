import { z } from 'zod';
export const civilDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(value => {
  const date = new Date(value + 'T12:00:00Z');
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}, 'Date inexistante');
export const birthSchema = z.object({
  date: civilDate,
  time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/).nullable(),
  timeAccuracy: z.enum(['exact', 'approximate', 'unknown']),
  placeLabel: z.string().trim().min(1).max(160),
  latitude: z.number().min(-90).max(90).nullable(),
  longitude: z.number().min(-180).max(180).nullable(),
  timeZone: z.string().refine(value => {
    try { new Intl.DateTimeFormat('fr', { timeZone: value }); return true; } catch { return false; }
  }).nullable(),
}).superRefine((value, ctx) => {
  if ((value.timeAccuracy === 'unknown') !== (value.time === null)) {
    ctx.addIssue({code: z.ZodIssueCode.custom, path: ['time'], message: 'Heure et précision incohérentes'});
  }
});
export type Birth = z.infer<typeof birthSchema>;
