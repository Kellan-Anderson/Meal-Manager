import { ProtectRoute } from "~/server/auth/utils";
import { LargeScreenNavbar, SmallScreenNavbar } from "./_components/navbar";

export default async function ProtectedRoutesLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  const { user } = await ProtectRoute();

  return (
    <>
      <div className="md:block hidden">
        <LargeScreenNavbar userPicture={user.image ?? undefined} username={user.name ?? undefined} />
      </div>
      <div className="md:hidden">
        <SmallScreenNavbar userPicture={user.image ?? undefined} username={user.name ?? undefined} />
      </div>
      <div className="pt-16">
        {children}
      </div>
    </>
  );
}