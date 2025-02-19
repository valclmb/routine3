"use client";

import outputs from "@/amplify_outputs.json";
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";

Amplify.configure(outputs);

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Authenticator />
    </div>
  );
}
