"use client";

import { Authenticator } from "@aws-amplify/ui-react";
import { signInWithRedirect } from "aws-amplify/auth";
export default function Login() {
  const handleSignIn = async () => {
    await signInWithRedirect({
      provider: "Google",
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Authenticator socialProviders={["google"]} />
      {/* <Button onClick={handleSignIn}>Se connecter avec Google </Button> */}
    </div>
  );
}
