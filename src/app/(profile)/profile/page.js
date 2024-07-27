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
    <main className="grid grid-cols-1 md:grid-cols-4 min-h-screen">
      <aside className="col-span-1 bg-slate-900 p-6 md:p-12 lg:p-24 space-y-7">
        <UserProfileImage user={userProfile} />
      </aside>
      <div className="col-span-1 md:col-span-3 p-6 md:p-12 lg:p-24">
        <div className="space-y-3 mb-6">
          <h1 className="font-semibold text-3xl md:text-4xl lg:text-5xl">
            Profilea
          </h1>
          <p className="text-slate-400">Edit your profile</p>
        </div>
        <FormProfile user={userProfile} />
      </div>
    </main>
  );
}
