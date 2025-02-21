"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Amplify } from "aws-amplify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import outputs from "../../amplify_outputs.json";

import { AuthContext } from "@/contexts/AuthContext";
import { signInWithRedirect } from "aws-amplify/auth";
import Image from "next/image";
import { useContext } from "react";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
Amplify.configure(outputs);

const formSchema = z.object({
  username: z.string().email(),
  password: z.string().min(8),
});
export const LoginForm = () => {
  const { handleSignIn } = useContext(AuthContext);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    handleSignIn(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="
      space-y-4"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Se connecter
        </Button>

        <div className="flex items-center gap-2">
          <span className="w-full h-[1px] bg-gray-300"></span>
          <span>OU</span>
          <span className="w-full h-[1px] bg-gray-300"></span>
        </div>
        <Button
          variant="outline"
          className="w-full"
          type="button"
          onClick={() => {
            signInWithRedirect({
              provider: "Google",
            });
          }}
        >
          <Image src="/google.png" alt="google logo" width={20} height={20} />
          Se connecter avec Google
        </Button>
      </form>
    </Form>
  );
};
