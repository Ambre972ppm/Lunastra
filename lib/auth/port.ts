export type Actor = { id: string };
export interface IdentityProvider { currentActor(request: Request): Promise<Actor | null> }
// Fail closed until a public account provider is selected and integrated.
// Never trust a user ID supplied in JSON or arbitrary forwarded HTTP headers.
export const identityProvider: IdentityProvider = { async currentActor() { return null; } };
export async function requireActor(request: Request, provider: IdentityProvider = identityProvider) {
  const actor = await provider.currentActor(request);
  if (!actor) throw new Response(JSON.stringify({error:'authentication_required'}), { status: 401, headers: {'Content-Type':'application/json', 'Cache-Control':'no-store'} });
  return actor;
}
