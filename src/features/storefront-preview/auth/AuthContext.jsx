import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../api";

const AuthContext = createContext({ user: null });
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  // undefined while the session is being checked, null when signed out.
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    let current = true;
    api("GET", "/users/me")
      .then((me) => current && setUser(me))
      .catch(() => current && setUser(null));
    return () => {
      current = false;
    };
  }, []);

  const value = useMemo(
    () => ({
      user,
      signIn: async (credentials) => setUser(await api("POST", "/users/signin", credentials)),
      signUp: async (credentials) => setUser(await api("POST", "/users/signup", credentials)),
      signOut: async () => {
        await api("POST", "/users/signout");
        setUser(null);
      },
    }),
    [user],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
