import { Bell, Search, Settings } from "lucide-react";

type TopbarProps = {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
  searchPlaceholder?: string;
};

export default function Topbar({
  title,
  subtitle,
  actionLabel,
  onAction,
  searchPlaceholder,
}: TopbarProps) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-[#c7c4d7]/60 bg-[#fcf8ff] px-5">
      <div className="flex items-center gap-4">
        <div className="flex w-full max-w-md items-center gap-2 rounded-lg border border-[#c7c4d7]/70 bg-[#f6f2ff] px-3 py-2">
          <Search className="h-4 w-4 text-[#464554]" />
          <span className="text-xs text-[#464554]/70">
            {searchPlaceholder || "Search candidates, jobs, or intelligence reports..."}
          </span>
        </div>

        <div className="hidden flex-col sm:flex">
          <p className="text-sm font-semibold text-[#1f1d2b]">{title}</p>
          {subtitle && <span className="text-xs text-[#464554]/70">{subtitle}</span>}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="rounded-lg p-2 text-[#464554] transition hover:bg-[#efebff] hover:text-[#4648d4]">
          <Bell className="h-4 w-4" />
        </button>

        <button className="rounded-lg p-2 text-[#464554] transition hover:bg-[#efebff] hover:text-[#4648d4]">
          <Settings className="h-4 w-4" />
        </button>

        {actionLabel && (
          <button
            onClick={onAction}
            className="rounded-lg bg-[#4648d4] px-4 py-2 text-xs font-extrabold text-white shadow-sm transition hover:bg-[#3730a3]"
          >
            + {actionLabel}
          </button>
        )}
      </div>
    </header>
  );
}