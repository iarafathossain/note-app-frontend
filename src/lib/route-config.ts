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
};

export const userNavigationItems: NavigationItem[] = [
  {
    label: "My Notes",
    href: `${ROUTES.userDashboard}/notes`,
  },
  {
    label: "My Posts",
    href: `${ROUTES.userDashboard}/post`,
  },
];

export const adminNavigationItems: NavigationItem[] = [
  {
    label: "Manage Users",
    href: `${ROUTES.adminDashboard}/users`,
  },
  {
    label: "See posts",
    href: `${ROUTES.adminDashboard}/posts`,
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

export const getNavigationItems = (role: UserRole | null): NavigationItem[] => {
  if (role === "USER") return userNavigationItems;
  if (role === "ADMIN") return adminNavigationItems;
  return [];
};
