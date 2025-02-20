"use client";

import outputs from "@/amplify_outputs.json";
import { Button } from "@/components/ui/button";
import { Amplify } from "aws-amplify";
import { signInWithRedirect } from "aws-amplify/auth";
Amplify.configure(outputs, {
  ssr: true,
});

export default function Login() {
  const handleSignIn = async () => {
    await signInWithRedirect({
      provider: "Google",
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      {/* <Authenticator socialProviders={["google"]} /> */}
      <Button onClick={handleSignIn}>Se connecter avec Google </Button>
    </div>
  );
}
