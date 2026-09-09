import { z } from 'zod';
import type { Actor } from '../auth/port';
export const noteInput = z.object({ body: z.string().trim().min(1).max(10000), mood: z.string().max(50).nullable() }).strict();
export function noteRepository(db: D1Database) {
  return {
    list(actor: Actor) { return db.prepare('SELECT id, body, mood, updated_at FROM journal_entries WHERE user_id = ? ORDER BY updated_at DESC LIMIT 100').bind(actor.id).all(); },
    create(actor: Actor, input: unknown) { const note = noteInput.parse(input); const id = crypto.randomUUID();
      return db.prepare('INSERT INTO journal_entries (id, user_id, body, mood, updated_at) VALUES (?, ?, ?, ?, ?)').bind(id, actor.id, note.body, note.mood, new Date().toISOString()).run(); },
    update(actor: Actor, id: string, input: unknown) { const note = noteInput.parse(input);
      return db.prepare('UPDATE journal_entries SET body = ?, mood = ?, updated_at = ? WHERE id = ? AND user_id = ?').bind(note.body, note.mood, new Date().toISOString(), id, actor.id).run(); },
    remove(actor: Actor, id: string) { return db.prepare('DELETE FROM journal_entries WHERE id = ? AND user_id = ?').bind(id, actor.id).run(); },
  };
}
