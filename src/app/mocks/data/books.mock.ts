import { Book } from '../../core/models/book.model';

export const MOCK_BOOKS: Book[] = [
  {
    id: '1',
    name: 'Chennai Branch',
    is_active: true,
    is_deleted: false,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Madurai Branch',
    is_active: true,
    is_deleted: false,
    created_at: '2025-01-15T00:00:00Z',
    updated_at: '2025-01-15T00:00:00Z',
  },
  {
    id: '3',
    name: 'Coimbatore Branch (Inactive)',
    is_active: false,
    is_deleted: false,
    created_at: '2025-03-01T00:00:00Z',
    updated_at: '2025-04-01T00:00:00Z',
  },
];
