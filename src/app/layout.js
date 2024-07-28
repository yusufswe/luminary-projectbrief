import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import "@/styles/globals.css";
import { Header } from "@/components/header";

export const metadata = {
  title: "Project Brief AI",
  description: "Project Brief AI",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={`${inter.className} bg-white px-4 md:px-6  min-h-dvh tracking-tight`}>
        <Header />
        {children}</body>
    </html>
  );
}
