import { SignupForm } from "@/components/auth/SignupForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { LoaderCircle } from "lucide-react";

export default function Signup() {
  return (
    <div className="flex flex-col gap-8 min-h-screen items-center justify-center">
      <h1 className="text-4xl font-bold flex items-center gap-2">
        <LoaderCircle className="h-9 w-9" strokeWidth={3.5} />
        Routine
      </h1>
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center text-2xl font-bold">
          <CardTitle>Créer un compte</CardTitle>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
      </Card>
    </div>
  );
}
