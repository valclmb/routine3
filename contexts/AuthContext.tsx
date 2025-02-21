import { useAuth, UseAuthReturn } from "@/hooks/useAuth";
import { Authenticator } from "@aws-amplify/ui-react";
import { createContext } from "react";
export const AuthContext = createContext<UseAuthReturn>({
  user: null,
  handleSignOut: () => {},
  isAuthenticated: false,
  handleSignIn: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const authUtils = useAuth();
  console.log(authUtils);

  return (
    <AuthContext.Provider value={authUtils}>
      <Authenticator.Provider>{children}</Authenticator.Provider>
    </AuthContext.Provider>
  );
};
