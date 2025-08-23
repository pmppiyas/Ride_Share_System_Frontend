import React, { type JSX } from "react";

import type { TRole } from "@/types";
import { Navigate } from "react-router";
import { useAuth } from '@/hooks/useAuth';

export function checkAuth<P extends object>(
  Component: React.ComponentType<P>,
  requiredRoles: TRole[]
) {
  return function (props: P): JSX.Element {
    const { me, isLoading, isError } = useAuth();

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (isError) {
      return <Navigate to="/auth/login" replace />;
    }

    if (!me || !requiredRoles.includes(me.data.role)) {
      return <Navigate to="/" replace />;
    }



    return <Component {...props} />;
  };
}
