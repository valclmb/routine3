"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import outputs from "../../amplify_outputs.json";

import { signUp } from "aws-amplify/auth";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
// Amplify.configure(outputs);

const formSchema = z.object({
  username: z.string().email(),
  password: z.string().min(8),
});
export const SignupForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const test = signUp(data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        toast.error(err.message);
      });
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
          Créer un compte
        </Button>
      </form>
    </Form>
  );
};
