import { ProtectRoute } from "~/server/auth/utils";
import { SignOutButton } from "./_components/signOutButton";

export default async function RecipesPage() {

  const session = await ProtectRoute();
  console.log({ session })

  return (
    <>Recipes Page <SignOutButton/> </>
  );
}