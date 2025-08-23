import { adminNavItems } from "@/routes/adminNavItems";
import { driverNavItems } from "@/routes/driverNavItems";
import { Role, type TRole } from "@/types";

export const getNavItems = (role: TRole) => {
  switch (role) {
    case Role.SUPER_ADMIN:
    case Role.ADMIN:
      return adminNavItems;
    case Role.DRIVER:
    case Role.RIDER:
      return driverNavItems;
    default:
      return [];
  }
};
