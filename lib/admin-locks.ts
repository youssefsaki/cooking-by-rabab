/** Admin pages locked until the owner asks to unlock them. */
export const LOCKED_ADMIN_PATHS = [
  '/admin/bookings',
  '/admin/promotions',
  '/admin/customers',
  '/admin/content',
  '/admin/seo',
  '/admin/media',
  '/admin/settings',
] as const;

export type LockedAdminPath = (typeof LOCKED_ADMIN_PATHS)[number];

export function isAdminPathLocked(pathname: string): boolean {
  return LOCKED_ADMIN_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
}
