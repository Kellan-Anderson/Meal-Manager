import { ProtectRoute } from "~/server/auth/utils";
import { LargeScreenNavbar } from "./_components/navbar";

export default async function ProtectedRoutesLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  const { user } = await ProtectRoute();

  return (
    <>
      <LargeScreenNavbar userPicture={user.image ?? undefined} username={user.name ?? undefined} />
      <div className="pt-14">
        {children}
      </div>
    </>
  );
}