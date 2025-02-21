"use client";
import { SignupContext } from "@/contexts/SignupContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { confirmSignUp } from "aws-amplify/auth";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

const completeStepSchema = z.object({
  username: z.string().email(),
  confirmationCode: z.string().length(6),
});

export const CompleteSignUpForm = () => {
  const { username } = useContext(SignupContext);
  const router = useRouter();

  useEffect(() => {
    if (!username && typeof window !== "undefined") {
      router.back();
    }
  }, [username, router]);

  console.log(username);

  const form = useForm({
    resolver: zodResolver(completeStepSchema),
    defaultValues: {
      username: username,
      confirmationCode: "",
    },
  });

  const onSubmit = (data: z.infer<typeof completeStepSchema>) => {
    confirmSignUp(data)
      .then((res) => {
        if (res.isSignUpComplete) {
          toast.success("Compte créé avec succès");
          router.push("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Form {...form}>
      <p className="text-center text-sm text-muted-foreground">
        Veuillez entrer le code de vérification envoyé à{" "}
        <span className="font-bold">{username}</span>
      </p>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex justify-center items-center "
      >
        <FormField
          control={form.control}
          name="confirmationCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code de vérification</FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  <Button type="submit" className="ml-2">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
