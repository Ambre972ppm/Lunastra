import { requireActor } from '@/lib/auth/port';
export async function GET(request: Request) {
  try { const actor = await requireActor(request); return Response.json({ id: actor.id }, {headers:{'Cache-Control':'no-store'}}); }
  catch (error) { if (error instanceof Response) return error; throw error; }
}
