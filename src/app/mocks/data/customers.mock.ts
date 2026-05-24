import { Customer } from '../../core/models/customer.model';

export const MOCK_CUSTOMERS: Customer[] = [
  // Book 1 — Chennai Branch
  { id: 1, book_id: 1, name: 'Murugan Selvam', father_name: 'Selvam Rajan', phone: '9841000001', address: '12, Anna Nagar, Chennai', profession: 'Tailor', is_active: true, created_at: '2025-01-05T00:00:00Z', updated_at: '2025-01-05T00:00:00Z' },
  { id: 2, book_id: 1, name: 'Lakshmi Devi', father_name: 'Krishnan Pillai', phone: '9841000002', address: '45, T. Nagar, Chennai', profession: 'Vegetable Vendor', is_active: true, created_at: '2025-01-06T00:00:00Z', updated_at: '2025-01-06T00:00:00Z' },
  { id: 3, book_id: 1, name: 'Ramesh Babu', father_name: 'Babu Sundaram', phone: '9841000003', address: '8, Kodambakkam, Chennai', profession: 'Auto Driver', is_active: true, created_at: '2025-01-10T00:00:00Z', updated_at: '2025-01-10T00:00:00Z' },
  { id: 4, book_id: 1, name: 'Priya Anand', father_name: 'Anand Venkat', phone: '9841000004', address: '22, Vadapalani, Chennai', profession: 'Shop Owner', is_active: true, created_at: '2025-01-12T00:00:00Z', updated_at: '2025-01-12T00:00:00Z' },
  { id: 5, book_id: 1, name: 'Karthik Raja', father_name: 'Raja Mohan', phone: '9841000005', address: '5, Ambattur, Chennai', profession: 'Mechanic', is_active: true, created_at: '2025-01-15T00:00:00Z', updated_at: '2025-01-15T00:00:00Z' },
  { id: 6, book_id: 1, name: 'Sumathi Pandian', father_name: 'Pandian Murugesan', phone: '9841000006', address: '67, Tambaram, Chennai', profession: 'Housewife', is_active: true, created_at: '2025-02-01T00:00:00Z', updated_at: '2025-02-01T00:00:00Z' },
  { id: 7, book_id: 1, name: 'Balan Krishnamurthy', father_name: 'Krishnamurthy Iyer', phone: '9841000007', address: '3, Perambur, Chennai', profession: 'Grocery Store', is_active: true, created_at: '2025-02-05T00:00:00Z', updated_at: '2025-02-05T00:00:00Z' },
  { id: 8, book_id: 1, name: 'Meena Sundaram', father_name: 'Sundaram Pillai', phone: '9841000008', address: '14, Royapuram, Chennai', profession: 'Fish Vendor', is_active: true, created_at: '2025-02-10T00:00:00Z', updated_at: '2025-02-10T00:00:00Z' },
  { id: 9, book_id: 1, name: 'Dinesh Perumal', father_name: 'Perumal Naicker', phone: '9841000009', address: '29, Villivakkam, Chennai', profession: 'Plumber', is_active: true, created_at: '2025-02-15T00:00:00Z', updated_at: '2025-02-15T00:00:00Z' },
  { id: 10, book_id: 1, name: 'Saranya Murugesan', father_name: 'Murugesan Gopal', phone: '9841000010', address: '51, Sholinganallur, Chennai', profession: 'Beauty Parlour', is_active: false, created_at: '2025-03-01T00:00:00Z', updated_at: '2025-04-01T00:00:00Z' },

  // Book 2 — Madurai Branch
  { id: 11, book_id: 2, name: 'Pandian Arumugam', father_name: 'Arumugam Chettiar', phone: '9842000001', address: '7, Tallakulam, Madurai', profession: 'Tea Shop', is_active: true, created_at: '2025-01-20T00:00:00Z', updated_at: '2025-01-20T00:00:00Z' },
  { id: 12, book_id: 2, name: 'Kavitha Subramani', father_name: 'Subramani Pillai', phone: '9842000002', address: '33, KK Nagar, Madurai', profession: 'Saree Shop', is_active: true, created_at: '2025-01-22T00:00:00Z', updated_at: '2025-01-22T00:00:00Z' },
  { id: 13, book_id: 2, name: 'Murugesan Thevar', father_name: 'Thevar Rajan', phone: '9842000003', address: '18, Anna Nagar, Madurai', profession: 'Farmer', is_active: true, created_at: '2025-01-25T00:00:00Z', updated_at: '2025-01-25T00:00:00Z' },
  { id: 14, book_id: 2, name: 'Rani Chinnasamy', father_name: 'Chinnasamy Gounder', phone: '9842000004', address: '6, Nagamalai, Madurai', profession: 'Flower Vendor', is_active: true, created_at: '2025-02-01T00:00:00Z', updated_at: '2025-02-01T00:00:00Z' },
  { id: 15, book_id: 2, name: 'Selvam Karuppan', father_name: 'Karuppan Velu', phone: '9842000005', address: '41, Pasumalai, Madurai', profession: 'Carpenter', is_active: true, created_at: '2025-02-05T00:00:00Z', updated_at: '2025-02-05T00:00:00Z' },
  { id: 16, book_id: 2, name: 'Valli Karthikeyan', father_name: 'Karthikeyan Nadar', phone: '9842000006', address: '9, Vandiyur, Madurai', profession: 'Tiffin Centre', is_active: true, created_at: '2025-02-08T00:00:00Z', updated_at: '2025-02-08T00:00:00Z' },
  { id: 17, book_id: 2, name: 'Arunachalam Pillai', father_name: 'Pillai Ramaswamy', phone: '9842000007', address: '22, Iyer Bungalow, Madurai', profession: 'Electrician', is_active: true, created_at: '2025-02-12T00:00:00Z', updated_at: '2025-02-12T00:00:00Z' },
  { id: 18, book_id: 2, name: 'Parvathi Suresh', father_name: 'Suresh Balakrishnan', phone: '9842000008', address: '55, Mattuthavani, Madurai', profession: 'Tuition Teacher', is_active: true, created_at: '2025-02-15T00:00:00Z', updated_at: '2025-02-15T00:00:00Z' },
  { id: 19, book_id: 2, name: 'Chinnasamy Nair', father_name: 'Nair Krishnan', phone: '9842000009', address: '3, Alanganallur Road, Madurai', profession: 'Milk Dairy', is_active: true, created_at: '2025-02-20T00:00:00Z', updated_at: '2025-02-20T00:00:00Z' },
  { id: 20, book_id: 2, name: 'Thilaga Rajendran', father_name: 'Rajendran Muthusamy', phone: '9842000010', address: '77, Alagarkoil Road, Madurai', profession: 'Cloth Store', is_active: true, created_at: '2025-03-01T00:00:00Z', updated_at: '2025-03-01T00:00:00Z' },
];
