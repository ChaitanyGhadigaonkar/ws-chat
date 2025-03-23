import { createContext, ReactNode, useCallback } from "react";
import { FetchUserDetailsOutput, User } from "../types/auth";
import { useQuery } from "@tanstack/react-query";
import API_INSTANCE from "../api/api";
import { Output } from "../types/base";

type AuthContextProps = {
  user?: User | null;
  fetchUserDetailsLoading: boolean;
};
const AuthContext = createContext<AuthContextProps>({
  user: null,
  fetchUserDetailsLoading: false,
});

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const fetchUserDetails = useCallback(async () => {
    try {
      const result = await API_INSTANCE.get("/auth/profile");
      return result.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }, []);

  const { data: userDetailsData, isLoading: fetchUserDetailsLoading } =
    useQuery<Output<FetchUserDetailsOutput>>({
      queryKey: ["userDetails"],
      queryFn: () => fetchUserDetails(),
      retry: false,
    });

  return (
    <AuthContext.Provider
      value={{ user: userDetailsData?.user, fetchUserDetailsLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
