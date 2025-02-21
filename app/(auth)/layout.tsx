import { LoaderCircle } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-8 min-h-screen items-center justify-center">
      <h1 className="text-4xl font-bold flex items-center gap-2">
        <LoaderCircle className="h-9 w-9" strokeWidth={3.5} />
        Routine
      </h1>
      {children}
    </div>
  );
}
