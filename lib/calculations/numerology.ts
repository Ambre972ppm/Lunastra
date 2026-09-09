import { civilDate } from '../domain/birth';
export const NUMEROLOGY_METHOD = 'digit-sum-1-9-v1';
export function reduceDigits(value: string | number) {
  const digits = String(value).replace(/\D/g, '');
  if (!digits) throw new Error('Aucun chiffre à réduire');
  let total = [...digits].reduce((a, b) => a + Number(b), 0);
  const steps = [total];
  while (total > 9) { total = [...String(total)].reduce((a, b) => a + Number(b), 0); steps.push(total); }
  return { value: total, steps };
}
export function calculateNumerology(birthDate: string, periodDate: string) {
  civilDate.parse(birthDate); civilDate.parse(periodDate);
  const year = periodDate.slice(0, 4), month = Number(periodDate.slice(5, 7));
  const annual = reduceDigits(birthDate.slice(5) + year);
  return { method: NUMEROLOGY_METHOD, birthDate, periodDate,
    lifePath: reduceDigits(birthDate), personalYear: annual,
    personalMonth: reduceDigits(annual.value + month),
    convention: 'Réduction à 1–9, sans conservation des maîtres nombres.' };
}
