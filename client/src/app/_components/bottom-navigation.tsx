"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomNavigation = () => {
  const pathname = usePathname();
  return (
    <Tabs
      value={pathname}
      className="fixed bottom-0 left-auto max-w-[450px] w-full"
    >
      <TabsList className="w-full h-12">
        <TabsTrigger className="flex-1 h-full" value="/">
          <Link
            href="/"
            className="w-full h-full items-center justify-center flex"
          >
            HOME
          </Link>
        </TabsTrigger>
        <TabsTrigger className="flex-1 h-full" value="/setting">
          <Link
            href="/setting"
            className="w-full h-full items-center justify-center flex"
          >
            SETTING
          </Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default BottomNavigation;
