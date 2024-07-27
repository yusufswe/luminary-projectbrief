import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import "@/styles/globals.css";
export default function RootLayout({ children }) {

  return (
    <main>

        {children}
      
    </main>
  );
}