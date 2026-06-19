import { User } from '../../core/models/user.model';

const ALL_PERMISSIONS = [
  'manage-books',
  'manage-users',
  'manage-customers',
  'view-loans',
  'create-loans',
  'edit-loans',
  'delete-loans',
  'archive-loans',
  'record-collection',
  'view-pending-loans',
  'view-day-summary',
  'view-ledger',
  'manage-expenses',
  'view-reports',
  'manage-settings',
  'view-dashboard',
];

const BOOK_ADMIN_PERMISSIONS = ALL_PERMISSIONS.filter(p => p !== 'manage-books');

const FIELD_AGENT_PERMISSIONS = ['view-loans', 'record-collection', 'view-pending-loans'];

export interface MockUser extends User {
  password: string;
  security_question: string;
  security_answer: string;
  permissions: string[];
  is_deleted?: boolean;
}

export const MOCK_USERS: MockUser[] = [
  {
    id: '1',
    book_id: null,
    first_name: 'Super',
    last_name: 'Admin',
    username: 'superadmin',
    password: 'password',
    role: 'super_admin',
    phone: '9876543210',
    is_active: true,
    security_question: 'What is your pet name?',
    security_answer: 'tommy',
    permissions: ALL_PERMISSIONS,
  },
  {
    id: '2',
    book_id: '1',
    first_name: 'Rajan',
    last_name: 'Kumar',
    username: 'bookadmin',
    password: 'password',
    role: 'book_admin',
    phone: '9876543211',
    is_active: true,
    security_question: 'What is your mother maiden name?',
    security_answer: 'lakshmi',
    permissions: BOOK_ADMIN_PERMISSIONS,
  },
  {
    id: '3',
    book_id: '1',
    first_name: 'Vijay',
    last_name: 'Murugan',
    username: 'agent',
    password: 'password',
    role: 'field_agent',
    phone: '9876543212',
    is_active: true,
    security_question: 'What is your school name?',
    security_answer: 'vivekananda',
    permissions: FIELD_AGENT_PERMISSIONS,
  },
  {
    id: '4',
    book_id: '2',
    first_name: 'Senthil',
    last_name: 'Pandi',
    username: 'bookadmin2',
    password: 'password',
    role: 'book_admin',
    phone: '9876543213',
    is_active: true,
    security_question: 'What is your favourite color?',
    security_answer: 'blue',
    permissions: BOOK_ADMIN_PERMISSIONS,
  },
];

// Seeded demo users — all password Admin@123, tenant "balaji" (except the
// platform owner). The slug prefills the Workspace field on the flat login page.
export const LOGIN_PRESETS = [
  { username: 'superadmin',  password: 'Admin@123', slug: '',       hint: 'Super Admin — platform' },
  { username: 'tenantadmin', password: 'Admin@123', slug: 'balaji', hint: 'Tenant Admin — Balaji' },
  { username: 'bookadmin',   password: 'Admin@123', slug: 'balaji', hint: 'Book Admin — Balaji' },
  { username: 'agent',       password: 'Admin@123', slug: 'balaji', hint: 'Field Agent — Balaji' },
];
