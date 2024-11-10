import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="w-full h-full m-0 flex justify-center align-middle fixed">
          {/* left */}
          <div className="hidden lg:block lg:min-h-screen lg:w-[calc(80%-450px)] ">
            {/* <ProjectDescription /> */}
          </div>
          {/* center */}
          <div className="overflow-x-hidden relative max-w-[450px] shadow min-h-full max-h-screen flex-1">
            {children}
          </div>

          {/* right */}
          <div className="hidden lg:block min-h-screen w-1/5"></div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
