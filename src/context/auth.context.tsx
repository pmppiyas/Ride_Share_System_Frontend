/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";

interface AuthContextType {
  me: any;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
