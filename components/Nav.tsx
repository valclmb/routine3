"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthContext } from "@/contexts/AuthContext";
import { Authenticator } from "@aws-amplify/ui-react";
import { LoaderCircle, LogIn, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";

export const Nav = () => {
  const { user, handleSignOut } = useContext(AuthContext);

  return (
    <Authenticator.Provider>
      <nav className="flex items-center justify-between p-3 mb-10">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <LoaderCircle className="w-8 h-8 rotate-180" strokeWidth={3} />{" "}
          Routine
        </h1>
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-full" size="icon" variant="outline">
                <User />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                {user?.signInDetails?.loginId}
                <br />
                {user?.userId}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleSignOut}
                className="cursor-pointer"
              >
                <LogOut /> Se déconnecter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button variant="outline" asChild>
            <Link href="/login">
              <LogIn /> Se connecter
            </Link>
          </Button>
        )}
      </nav>
    </Authenticator.Provider>
  );
};
