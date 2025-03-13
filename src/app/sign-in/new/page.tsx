/**
 * Handles a new user by prompting them to choose a user name for their account
 */

import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { api } from "~/trpc/server";
import { NewUsernameForm } from "./newUsernameForm";

export default async function NewUserPage() {

  // Verify that the user is new
  const isNewUser = await api.users.checkNewUser();
  if(!isNewUser) {
    redirect("/recipes");
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="text-lg">Please choose a username to continue</CardTitle>
          <CardDescription>Valid usernames can include letters and numbers, no symbols other than -</CardDescription>
        </CardHeader>
        <CardContent>
          <NewUsernameForm />
        </CardContent>
      </Card>
    </div>
  );
}