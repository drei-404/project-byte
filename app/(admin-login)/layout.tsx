import Provider from "@/components/provider";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Provider>{children}</Provider>
    </>
  );
};

export default Layout;
