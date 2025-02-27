'use client'

import { signIn } from "next-auth/react";
import { Button } from "~/components/ui/button";
import Image from "next/image";

export function SignInWithGithubButton() {
  return (
    <Button onClick={() => signIn("github")} className="p-6 w-60 h-14">
      <Image src="/logos/github-mark-white.png" alt="Github logo" height={24} width={24} className="dark:hidden" />
      <Image src="/logos/github-mark.png" alt="Github logo" height={24} width={24} className="hidden dark:block" />
      <p className="text-base">Sign in with Github</p>
    </Button>
  );
}

export function SignInWithGoogleButton() {
  return (
    <Button onClick={() => signIn("google")} variant="outline" className="p-6 w-60 h-14">
      <Image src="https://authjs.dev/img/providers/google.svg" alt="Google logo" height={24} width={24} />
      <p className="text-base">Sign in with Google</p>
    </Button>
  );
}