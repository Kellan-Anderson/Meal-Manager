'use client'

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";

type NavbarProps = {
  username?: string,
  userPicture?: string
}

export function LargeScreenNavbar({ userPicture, username } : NavbarProps) {
  const avatarFallback = username?.split(" ").map(str => str[0]).join("") ?? "US";
  const dropdownMenuGreeting = username?.split(" ").shift();

  return (
    <div id="main-nav" className="h-12 border-b shadow-md flex items-center py-7 px-4 fixed top-0 left-0 w-full bg-background z-50">
      <NavLink linkName="Recipes" />
      <NavLink linkName="Pantry" />
      <NavLink linkName="Shopping List" />
      <div className="grow flex flex-row justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={userPicture} alt={username} />
              <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-4 mt-0.5">
            <DropdownMenuLabel>Hello {dropdownMenuGreeting}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-500 cursor-pointer"
              onClick={() => signOut({ redirectTo: "/" })}
            >
                Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

type NavLinkProps = {
  linkName: string
}

export function NavLink({ linkName } : NavLinkProps) {
  const pathname = usePathname();
  const link = linkName.split(" ").join("-").toLowerCase();
  const highlighted = pathname.split('/').pop() === link;

  return (
    <Button
      asChild
      variant="link"
      style={{ textDecorationLine: highlighted ? 'underline' : undefined }}
    >
      <Link href={link}>{linkName}</Link>
    </Button>
  );
}