import { redirect } from "next/navigation";
import { auth } from ".";

const SIGN_IN_REDIRECT = "/sign-in";

type ProtectRouteProps = {
  redirectTo?: string
}

export async function ProtectRoute(props?: ProtectRouteProps) {
  const session = await auth();
  if(!session) {
    const params = new URLSearchParams();
    let redirectURL = SIGN_IN_REDIRECT;
    if(props?.redirectTo) {
      params.set("m", "no_auth");
      redirectURL = redirectURL + "?" + params.toString()
    }
    redirect(redirectURL);
  }
  return session;
}

export async function RedirectIfSignedIn(redirectOptions?: { redirectTo?: string }) {
  const DEFAULT_REDIRECT = "/recipes";
  const redirectTo = redirectOptions?.redirectTo;
  
  const session = await auth();
  if(session) {
    if(redirectTo) {
      redirect(redirectTo);
    }
    redirect(DEFAULT_REDIRECT);
  }
}