"use client"

import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function NewUsernameForm() {

  const formParser = z.object({
    username: z.string().min(1, { message: "Please enter a username" })
  });
  const form = useForm<z.infer<typeof formParser>>({
    resolver: zodResolver(formParser),
    defaultValues: {
      username: ''
    }
  });

  const router = useRouter();
  const { mutate, isPending } = api.users.setUsername.useMutation({
    onSuccess: (result) => {
      if(result.type === "success") {
        router.push("/recipes");
        return;
      }
      form.setError("username", { type: "custom", message: result.message });
    },
    onError: () => {
      toast.error("There was an error, please try again later")
    } 
  });

  const onNewUsernameSubmit: SubmitHandler<z.infer<typeof formParser>> = (values) => {
    let symbolsCheck = true;
    values.username.split("").forEach((char) => {
      if(char.toLowerCase() === char.toUpperCase() && Number.isNaN(Number(char)) && char !== '-') {
        symbolsCheck = false
      }
    });
    if(!symbolsCheck) {
      form.setError("username", { type: "custom", message: "Username is not valid" });
      return
    }
    mutate({ username: values.username })
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onNewUsernameSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="pb-6">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? (
            <Loader2 className="text-blue-500 animate-spin" />
          ) : "Submit"}
        </Button>
      </form>
    </Form>
  );
}