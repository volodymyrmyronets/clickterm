"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  ChevronDown,
  CircleCheck,
  CodeXml,
  Files,
  FilePlus2,
  MessagesSquare,
  PanelLeft,
  PieChart,
  Plus,
  Receipt,
  ScrollText,
  Send,
  Users,
  X,
} from "lucide-react";

const NAV = [
  { icon: FilePlus2, label: "Clickwrap Templates", active: true },
  { icon: Files, label: "Clickwrap Bundles" },
  { icon: CircleCheck, label: "Clickwrap Events", badge: "1" },
  { icon: Users, label: "End Users" },
  { icon: CodeXml, label: "Integrations" },
  { icon: ScrollText, label: "Audit Log" },
] as const;

const FOOTER_NAV = [
  { icon: Receipt, label: "Billing" },
  { icon: PieChart, label: "Plan & Usage" },
] as const;

/** `onClose` is passed when rendered inside the mobile drawer. */
export function Sidebar({ onClose }: { onClose?: () => void }) {
  const [collapsed, setCollapsed] = useState(false);
  const isDrawer = !!onClose;
  const showCollapsed = !isDrawer && collapsed;

  return (
    <motion.aside
      animate={{ width: showCollapsed ? 76 : 264 }}
      transition={{ type: "spring", stiffness: 400, damping: 38 }}
      className="flex h-full shrink-0 flex-col border-r border-line bg-white"
    >
      {/* Brand */}
      <div className="flex h-16 items-center justify-between px-4">
        {!showCollapsed && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/logos/Frame.svg" alt="ClickTerm" className="h-6 w-auto" />
        )}
        <button
          onClick={onClose ?? (() => setCollapsed((v) => !v))}
          className={`grid size-8 place-items-center rounded-lg border border-line text-faint transition-colors hover:bg-surface-soft ${
            showCollapsed ? "mx-auto" : ""
          }`}
          aria-label={isDrawer ? "Close menu" : "Toggle sidebar"}
        >
          {isDrawer ? <X className="size-4" /> : <PanelLeft className="size-4" />}
        </button>
      </div>

      {/* Primary nav */}
      <nav className="flex flex-col gap-1 px-3 py-2">
        {NAV.map((item) => (
          <NavItem key={item.label} {...item} collapsed={showCollapsed} />
        ))}
      </nav>

      {/* Teams */}
      {!showCollapsed && (
        <div className="mt-4 px-3">
          <div className="flex items-center justify-between px-3 py-1.5">
            <span className="text-[11px] font-medium uppercase tracking-wide text-faint">
              Your teams
            </span>
            <button
              className="grid size-5 place-items-center rounded text-faint hover:bg-surface-soft"
              aria-label="Add team"
            >
              <Plus className="size-3.5" />
            </button>
          </div>
          <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-ink hover:bg-surface-soft">
            <Send className="size-4 -rotate-12 text-accent" />
            <span>ClickTerm Team</span>
            <ChevronDown className="ml-auto size-4 text-faint" />
          </button>
          <button className="mt-1 flex w-full items-center gap-2 rounded-lg py-2 pl-9 pr-3 text-sm text-muted hover:bg-surface-soft">
            <Briefcase className="size-4" />
            <span>Team Management</span>
          </button>
        </div>
      )}

      <div className="flex-1" />

      {/* Footer nav */}
      <nav className="flex flex-col gap-1 px-3 py-2">
        {FOOTER_NAV.map((item) => (
          <NavItem key={item.label} {...item} collapsed={showCollapsed} />
        ))}
      </nav>

      {/* Invite card */}
      <AnimatePresence>
        {!showCollapsed && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="relative m-3 rounded-xl bg-surface-soft p-4"
          >
            <button
              className="absolute right-3 top-3 text-faint hover:text-muted"
              aria-label="Dismiss"
            >
              <X className="size-4" />
            </button>
            <span className="grid size-9 place-items-center rounded-lg bg-accent-softer text-accent">
              <MessagesSquare className="size-4" />
            </span>
            <p className="mt-3 text-sm font-semibold text-ink">
              Invite team members
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              Bring your team in to share and collaborate!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}

function NavItem({
  icon: Icon,
  label,
  active,
  badge,
  collapsed,
}: {
  icon: typeof FilePlus2;
  label: string;
  active?: boolean;
  badge?: string;
  collapsed?: boolean;
}) {
  return (
    <button
      title={collapsed ? label : undefined}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
        collapsed ? "justify-center" : ""
      } ${
        active
          ? "bg-accent-soft font-medium text-ink"
          : "text-ink-soft hover:bg-surface-soft"
      }`}
    >
      <Icon
        className={`size-[18px] shrink-0 ${active ? "text-accent" : "text-muted"}`}
      />
      {!collapsed && <span className="truncate">{label}</span>}
      {!collapsed && badge && (
        <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-md bg-accent-softer px-1 text-xs font-medium text-accent">
          {badge}
        </span>
      )}
    </button>
  );
}
