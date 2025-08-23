import { Role } from "@/types";

export const getRolebasedLinks = (role: string) => {
  switch (role) {
    case Role.SUPER_ADMIN:
    case Role.ADMIN:
      return "/admin";
    case Role.DRIVER:
      return "/driver";
    case Role.RIDER:
    default:
      return "/rider";
  }
};
