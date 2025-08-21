
import { AuthContext } from '@/context/auth.context';
import Loading from '@/pages/shared/Loading';
import { useGetMeQuery } from '@/redux/features/auth/auth.api';
import { type ReactNode } from "react";

export function AuthProvider({ children }: { children: ReactNode }) {

  const { data: me, isLoading, isError, refetch } = useGetMeQuery(undefined);

  if (isLoading) {
    return (
      <Loading />
    )
  }
  return (
    <AuthContext.Provider value={{ me, isLoading, isError, refetch }}>
      {children}
    </AuthContext.Provider>
  );
}
