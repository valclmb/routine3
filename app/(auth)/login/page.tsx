import { LoginForm } from "@/components/auth/LoginForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Login() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center text-2xl font-bold">
        <CardTitle>Connexion</CardTitle>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
}
