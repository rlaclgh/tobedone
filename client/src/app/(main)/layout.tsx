import React from "react";
import BottomNavigation from "../_components/bottom-navigation";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = (props: MainLayoutProps) => {
  const { children } = props;
  return (
    <>
      {children}
      <BottomNavigation />
    </>
  );
};

export default MainLayout;
