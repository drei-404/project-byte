import Provider from "@/components/provider";
import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import AdminBreadcrumb from "@/components/admin-breadcrumb";
import { Separator } from "@/components/ui/separator";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin");
  }

  if (session.user?.isSuspended) {
    redirect("/suspended");
  }

  return (
    <>
      <Provider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
                <AdminBreadcrumb />
              </div>
            </header>
            {children}
          </SidebarInset>
        </SidebarProvider>
      </Provider>
    </>
  );
};

export default Layout;
