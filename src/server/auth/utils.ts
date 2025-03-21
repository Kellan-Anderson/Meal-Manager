import { redirect } from "next/navigation";
import { auth } from ".";

const SIGN_IN_REDIRECT = "/sign-in";
const DEFAULT_REDIRECT = "/recipes";

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

  // Check to see if the user has set up a username
  if(!session.user.username) {
    redirect("/sign-in/new");
  }

  return session;
}

type redirectOptions = {
  redirectTo?: string,
  debug?: {
    logMessage?: string
  }
}

export async function RedirectIfSignedIn(redirectOptions?: redirectOptions) {
  const redirectTo = redirectOptions?.redirectTo;

  
  const session = await auth();
  if(session) {
    
    // Print debug message
    if(redirectOptions?.debug?.logMessage) {
      console.log({ debugLogMessage: redirectOptions.debug.logMessage })
    }

    // Redirect to an optional url
    if(redirectTo) {
      redirect(redirectTo);
    }
    redirect(DEFAULT_REDIRECT);
  }
}