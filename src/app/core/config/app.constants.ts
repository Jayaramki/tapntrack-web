/**
 * Fixed UUID of the dev-seed default book ("Balaji Finance"), mirrored in the
 * backend seeder. Used as the book-context fallback for super_admin on screens
 * without an explicit book selector (the former `?? 1` default). Real books
 * created through the API get random UUIDs; this sentinel only ever points at
 * the seeded book.
 */
export const DEFAULT_BOOK_ID = '00000000-0000-0000-0000-000000000001';
