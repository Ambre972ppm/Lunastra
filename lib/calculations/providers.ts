import type { Birth } from '../domain/birth';
import type { Calculation } from '../domain/results';
export type NatalChart = { planets: { name: string; longitude: number }[]; ascendant: number | null; houses: number[] | null };
export type ChineseChart = { animal: string; element: string; pillars: { year: string; month: string; day: string; hour: string | null } };
export type LunarState = { phaseAngle: number; illumination: number; nextNewMoonUtc: string; nextFullMoonUtc: string };
export interface SkyProvider {
  natal(birth: Birth): Promise<Calculation<NatalChart>>;
  chinese(birth: Birth): Promise<Calculation<ChineseChart>>;
  lunar(instantUtc: string): Promise<Calculation<LunarState>>;
}
const unavailable = { status: 'unavailable', reason: 'provider_not_configured', message: 'Le moteur de calcul n’est pas encore connecté.' } as const;
// No fabricated values: unavailable is a first-class, renderable result.
export const unconfiguredSkyProvider: SkyProvider = {
  async natal() { return unavailable; }, async chinese() { return unavailable; }, async lunar() { return unavailable; },
};
