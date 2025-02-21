import { getCurrentUser, signIn, signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export type UseAuthReturn = {
  user: any;
  handleSignOut: () => void;
  isAuthenticated: boolean;
  handleSignIn: (data: any) => void;
};

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const getUser = () => {
    getCurrentUser()
      .then((res) => {
        setUser(res);
        setIsAuthenticated(true);
      })
      .catch(() => {
        setUser(null);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleSignOut = () => {
    signOut().then(() => {
      setUser(null);
      setIsAuthenticated(false);
      window.location.reload();
    });
  };

  const handleSignIn = (data: any) => {
    signIn(data)
      .then((res) => {
        toast.success("Connexion réussie");
        setIsAuthenticated(true);
        router.push("/");
        getUser();
      })
      .catch((err) => {
        toast("Une erreur est survenue", {
          icon: "🚨",
          description: err.message,
        });
      });
  };
  return { user, handleSignOut, isAuthenticated, handleSignIn };
};
