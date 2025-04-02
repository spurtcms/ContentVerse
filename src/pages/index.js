import Image from "next/image";
import { Bricolage_Grotesque } from "next/font/google";
import Blog_index_page from "./blogs";


// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

export const bricolagegrotesque = Bricolage_Grotesque({
  // variable: "Bricolage_Grotesque",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <Blog_index_page />
    </>
  );
}
