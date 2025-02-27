import { RedirectIfSignedIn } from "~/server/auth/utils";
import { SignInWithGithubButton, SignInWithGoogleButton } from "./signInButtons";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default async function SignInPage() {
  await RedirectIfSignedIn();
  
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <Card className="px-12">
        <CardHeader>
          <CardTitle className="text-lg text-center">Sign In</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col justify-center items-center gap-3">
          <SignInWithGithubButton />
          <SignInWithGoogleButton />
        </CardContent>
      </Card>
    </div>
  );
}