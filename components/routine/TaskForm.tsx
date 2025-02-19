"use client";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";

import { RoutineContext } from "@/contexts/RoutineContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  start: z.string().min(2).max(50),
  end: z.string().min(2).max(50),
  color: z.string().min(2).max(50),
});

export const TaskForm = () => {
  const { addTask } = useContext(RoutineContext);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      color: "#000000",
      start: "",
      end: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const taskWithId = {
      ...values,
      id: crypto.randomUUID(),
    };
    addTask(taskWithId);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Dormir, Faire du sport, etc."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Couleur</FormLabel>
                <FormControl>
                  <Input type="color" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-2 ">
          <FormField
            control={form.control}
            name="start"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Heure de début</FormLabel>
                <FormControl>
                  <Input type="time" step="300" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="end"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Heure de fin</FormLabel>
                <FormControl>
                  <Input type="time" step="300" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full" type="submit">
          Enregistrer
        </Button>
      </form>
    </Form>
  );
};
