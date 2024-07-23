import { auth } from "@/libs/auth";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
  //   const user = auth();

  //   if (user) {
  //     redirect("/");
  //   }

  return (
    <main>
      <section>{children}</section>
    </main>
  );
}
