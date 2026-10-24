export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  userDashboard: "/user",
  adminDashboard: "/admin",
} as const;

export type UserRole = "USER" | "ADMIN";

export type NavigationItem = {
  label: string;
  href: string;
  roles?: UserRole[];
};

export const navigationItems: NavigationItem[] = [
  {
    label: "My Notes",
    href: `${ROUTES.userDashboard}/notes`,
    roles: ["USER", "ADMIN"],
  },
  {
    label: "Manage Users",
    href: `${ROUTES.adminDashboard}/users`,
    roles: ["ADMIN"],
  },
  {
    label: "All Notes",
    href: `${ROUTES.adminDashboard}/notes`,
    roles: ["ADMIN"],
  },
];

export const publicRoutes = [
  ROUTES.home,
  ROUTES.login,
  ROUTES.register,
] as const;

export const isPublicRoute = (pathname: string) =>
  publicRoutes.includes(pathname as (typeof publicRoutes)[number]);

export const isGuestOnlyRoute = (pathname: string) =>
  pathname === ROUTES.login || pathname === ROUTES.register;

export const isAdminRoute = (pathname: string) =>
  pathname.startsWith(ROUTES.adminDashboard);
export const isUserRoute = (pathname: string) =>
  pathname.startsWith(ROUTES.userDashboard);

export const canAccessNavigation = (
  item: NavigationItem,
  role: UserRole | null,
) => !item.roles || (role !== null && item.roles.includes(role));
