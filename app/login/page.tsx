"use client";

import { Authenticator } from "@aws-amplify/ui-react";

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Authenticator />
    </div>
  );
}
