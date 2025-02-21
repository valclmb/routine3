import { SignupContext } from "@/contexts/SignupContext";
import { SignInOutput } from "@aws-amplify/auth";
import { getCurrentUser, signIn, signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
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
  const { setUsername } = useContext(SignupContext);
  const router = useRouter();

  const getUser = () => {
    getCurrentUser()
      .then((res) => {
        console.log(res);
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
      .then((res: SignInOutput) => {
        if (res.nextStep.signInStep === "CONFIRM_SIGN_UP") {
          setUsername(data.username);

          router.push("/signup/complete");
          return;
        }

        toast.success("Connexion réussie");
        setIsAuthenticated(true);
        getUser();
        router.push("/");
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
