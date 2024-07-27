// page.js
import { FormProfile } from "@/components/formProfile";
import { prisma } from "@/utils/prisma";
import { auth } from "@/libs/auth";
import { UserProfileImage } from "@/components/userProfileImage";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const user = auth();
  if (!user) {
    redirect("/login");
  }

  const userProfile = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  return (
    <main className="grid grid-cols-4">
      <aside className="col-span-1 bg-slate-900 h-screen space-y-7 p-24">
        <UserProfileImage user={userProfile} />
      </aside>
      <div className="col-span-1 p-24">
        <div className="space-y-3">
          <h1 className="font-semibold text-5xl">Profile</h1>
          <p className="text-slate-400 ">Edit your profile</p>
        </div>
        <FormProfile user={userProfile} />
      </div>
    </main>
  );
}
