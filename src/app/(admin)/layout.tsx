import DashboardNav from "@/components/navigation/navbar";
import Header from "@/components/ui/header";
import { SidebarNavItem } from "@/types/nav-types";

export default function AdminLayount({
  children,
}: {
  children: React.ReactNode;
}) {
  const dashboardConfig: {
    sidebarNav: SidebarNavItem[];
  } = {
    sidebarNav: [
      {
        title: "My Forms",
        href: "/view-forms",
        icon: "library",
      },
      {
        title: "Results",
        href: "/results",
        icon: "list",
      },
      {
        title: "Analytics",
        href: "/analytics",
        icon: "lineChart",
      },
      {
        title: "Charts",
        href: "/charts",
        icon: "pieChart",
      },
      {
        title: "Settings",
        href: "/settings",
        icon: "settings",
      },
    ],
  };
  return (
    <div>
      <Header />
      <div>
        <aside>
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
      </div>
      {children}
    </div>
  );
}
