export type Source = { title: string; url: string; accessedAt: string };
export type Calculation<T> =
  | { status: 'ready'; value: T; method: string; version: string; calculatedAt: string; sources: Source[]; warnings: string[] }
  | { status: 'unavailable'; reason: 'provider_not_configured' | 'missing_birth_time' | 'unresolved_place'; message: string };
export type Reading = {
  kind: 'symbolic_interpretation' | 'tradition' | 'practical_suggestion';
  title: string; body: string; sources: Source[]; editorialVersion: string;
};
