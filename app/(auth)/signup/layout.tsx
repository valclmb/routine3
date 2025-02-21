"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePathname } from "next/navigation";
export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const title = pathname.includes("complete")
    ? "Validation du compte"
    : "Créer un compte";

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center text-2xl font-bold">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
