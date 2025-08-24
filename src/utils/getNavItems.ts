import { adminNavItems } from "@/routes/adminNavItems";
import { driverNavItems } from "@/routes/driverNavItems";
import { riderNavItems } from "@/routes/riderNavItems";
import { Role, type TRole } from "@/types";

export const getNavItems = (role: TRole) => {
  switch (role) {
    case Role.SUPER_ADMIN:
    case Role.ADMIN:
      return adminNavItems;
    case Role.DRIVER:
      return driverNavItems;
    case Role.RIDER:
      return riderNavItems;
    default:
      return [];
  }
};
