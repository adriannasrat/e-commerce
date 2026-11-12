import { createContext, useContext, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";

const sessionKey = ["session"];

// A 401 means signed out. Other failures are retried by the query client and
// count as signed out only if they persist.
async function loadSession() {
  try {
    return await api("GET", "/users/me");
  } catch (error) {
    if (error.status === 401) return null;
    throw error;
  }
}

const AuthContext = createContext({ user: null });
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const queryClient = useQueryClient();
  const session = useQuery({
    queryKey: sessionKey,
    queryFn: loadSession,
    staleTime: Infinity,
  });
  // undefined while the session is being checked, null when signed out.
  const user = session.isPending ? undefined : session.isError ? null : session.data;

  const value = useMemo(() => {
    const setUser = (next) => queryClient.setQueryData(sessionKey, next);
    return {
      user,
      signIn: async (credentials) => setUser(await api("POST", "/users/signin", credentials)),
      signUp: async (credentials) => setUser(await api("POST", "/users/signup", credentials)),
      signOut: async () => {
        await api("POST", "/users/signout");
        // The next person on this device must never see the previous cart.
        queryClient.removeQueries({ queryKey: ["cart"] });
        setUser(null);
      },
    };
  }, [user, queryClient]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
