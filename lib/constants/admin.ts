import { AdminLink, StatCard } from "../types/api/admin";

export const stats: StatCard[] = [
  { label: 'Orders this month', value: '128', change: '+12%', positive: true, icon: '📦' },
  { label: 'Revenue', value: 'LKR 1.2M', change: '+8%', positive: true, icon: '💵' },
  { label: 'New customers', value: '34', change: '+5%', positive: true, icon: '👥' },
  { label: 'Total Bookings', value: '76', change: '-2', positive: false, icon: '👕' },
]

export const adminLinks: AdminLink[] = [
  { href: '/lankalagoon-admin/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/lankalagoon-admin/customers', label: 'Customers', icon: '📁' },
  { href: '/lankalagoon-admin/bookings', label: 'Bookings', icon: '📦' },
  { href: '/lankalagoon-admin/boat-tours', label: 'Boat Tours', icon: '👥' },
]