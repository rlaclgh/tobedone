import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}
const AuthLayout = (props: AuthLayoutProps) => {
  const { children } = props;
  return (
    <div className="w-full h-full p-4 pt-12 flex items-center flex-col">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-20">
        TobeDone
      </h2>

      {children}
    </div>
  );
};

export default AuthLayout;
