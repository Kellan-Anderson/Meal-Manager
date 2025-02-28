'use client'

import { Beef, ChefHat, ListTodo, LogOut, Menu, Settings } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "~/components/ui/sheet";

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

export function SmallScreenNavbar({ userPicture, username } : NavbarProps ) {
  const menuGreeting = username?.split(" ").shift();
  
  return (
    <Sheet>
      <div className="fixed top-0 left-0 w-full h-12 py-7 px-4 bg-background shadow-md flex items-center">
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
      </div>
      <SheetContent side="left" className="pt-10">
        <div className="flex flex-col justify-center items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={userPicture} alt={username} />
            <AvatarFallback>user</AvatarFallback>
          </Avatar>
          <SheetTitle>Hello {menuGreeting ?? "user"}</SheetTitle>
        </div>
        <div className="flex flex-col gap-2 pt-4">
          <Button asChild className="justify-start" variant="secondary">
            <Link href="/recipes">
              <ChefHat />
              Recipes
            </Link>
          </Button>
          <Button asChild className="justify-start" variant="secondary">
            <Link href="/pantry">
              <Beef />
              Pantry
            </Link>
          </Button>
          <Button asChild className="justify-start" variant="secondary">
            <Link href="/shopping-list">
              <ListTodo />
              Shopping List
            </Link>
          </Button>
          <Button asChild className="justify-start" variant="secondary">
            <Link href="/settings">
              <Settings />
              Settings
            </Link>
          </Button>
          <Button 
            className="justify-start" 
            variant="secondary" 
            onClick={() => signOut({ redirectTo: "/" })}
          >
            <LogOut />
            <p className="text-red-500">Sign out</p>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
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