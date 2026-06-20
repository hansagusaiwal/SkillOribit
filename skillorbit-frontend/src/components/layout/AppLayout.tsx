import type { ReactNode } from "react";
import FloatingCopilot from "../copilot/FloatingCopilot";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

type AppLayoutProps = {
  children: ReactNode;
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
  searchPlaceholder?: string;
};

export default function AppLayout({
  children,
  title,
  subtitle,
  actionLabel,
  onAction,
  searchPlaceholder,
}: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-[#fcf8ff]">
      <Sidebar />

      <main className="ml-[260px] min-h-screen bg-[#fcf8ff]">
        <Topbar
          title={title}
          subtitle={subtitle}
          actionLabel={actionLabel}
          onAction={onAction}
          searchPlaceholder={searchPlaceholder}
        />

        <div className="px-5 py-5 pb-28">{children}</div>
      </main>

      <FloatingCopilot />
    </div>
  );
}