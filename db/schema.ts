import { sqliteTable, text, integer, index, uniqueIndex } from 'drizzle-orm/sqlite-core';
export const users = sqliteTable('users', { id: text('id').primaryKey(), identitySubject: text('identity_subject').notNull().unique(), createdAt: text('created_at').notNull() });
export const profiles = sqliteTable('profiles', {
  userId: text('user_id').primaryKey().references(() => users.id, {onDelete:'cascade'}),
  displayName: text('display_name').notNull(), birthJson: text('birth_json').notNull(),
  birthName: text('birth_name'), preferencesJson: text('preferences_json').notNull(),
  currentTimeZone: text('current_time_zone').notNull(), currentHemisphere: text('current_hemisphere').notNull(),
  revision: integer('revision').notNull().default(1), updatedAt: text('updated_at').notNull(),
});
export const notes = sqliteTable('journal_entries', {
  id: text('id').primaryKey(), userId: text('user_id').notNull().references(() => users.id, {onDelete:'cascade'}),
  body: text('body').notNull(), mood: text('mood'), updatedAt: text('updated_at').notNull(),
}, t => [index('idx_notes_user_updated').on(t.userId,t.updatedAt)]);
export const favorites = sqliteTable('favorites', {
  id: text('id').primaryKey(), userId: text('user_id').notNull().references(() => users.id, {onDelete:'cascade'}),
  contentKey: text('content_key').notNull(), createdAt: text('created_at').notNull(),
}, t => [uniqueIndex('idx_favorites_user_content').on(t.userId,t.contentKey)]);
export const calculations = sqliteTable('calculations', {
  id: text('id').primaryKey(), userId: text('user_id').notNull().references(() => users.id, {onDelete:'cascade'}),
  cacheKey: text('cache_key').notNull(), profileRevision: integer('profile_revision').notNull(),
  methodVersion: text('method_version').notNull(), resultJson: text('result_json').notNull(), calculatedAt: text('calculated_at').notNull(),
}, t => [uniqueIndex('idx_calculations_user_key').on(t.userId,t.cacheKey)]);
