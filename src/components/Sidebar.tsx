"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  CircleCheck,
  CircleHelp,
  CodeXml,
  Files,
  FilePlus2,
  PanelLeft,
  PieChart,
  Receipt,
  User,
  Users,
  X,
} from "lucide-react";

const MAIN = [
  { icon: FilePlus2, label: "Clickwrap Templates", active: true },
  { icon: Files, label: "Clickwrap Bundles" },
  { icon: CircleCheck, label: "Clickwrap Events" },
  { icon: Users, label: "End Users" },
  { icon: CodeXml, label: "Integrations" },
] as const;

const WORKSPACE = [
  { icon: Briefcase, label: "Team Management" },
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
      className="flex h-full shrink-0 flex-col border-r border-line bg-sidebar"
    >
      {/* Brand */}
      <div className="flex h-16 shrink-0 items-center justify-between px-4">
        {!showCollapsed && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/logos/Frame.svg" alt="ClickTerm" className="h-6 w-auto" />
        )}
        <button
          onClick={onClose ?? (() => setCollapsed((v) => !v))}
          className={`grid size-8 place-items-center rounded-ctl border border-line bg-white text-faint transition-colors hover:bg-surface-soft ${
            showCollapsed ? "mx-auto" : ""
          }`}
          aria-label={isDrawer ? "Close menu" : "Toggle sidebar"}
        >
          {isDrawer ? <X className="size-4" /> : <PanelLeft className="size-4" />}
        </button>
      </div>

      {/* Scrollable nav */}
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        {!showCollapsed && <SectionLabel>Main</SectionLabel>}
        <nav className="flex flex-col gap-1.5 px-3 pb-2">
          {MAIN.map((item) => (
            <NavItem key={item.label} {...item} collapsed={showCollapsed} />
          ))}
        </nav>

        {!showCollapsed && <SectionLabel>Workspace</SectionLabel>}
        <nav className="flex flex-col gap-1.5 px-3 pb-2">
          {WORKSPACE.map((item) => (
            <NavItem key={item.label} {...item} collapsed={showCollapsed} />
          ))}
        </nav>
      </div>

      {/* Footer */}
      {!showCollapsed && (
        <div className="flex shrink-0 flex-col gap-2.5 border-t border-line px-3 pb-3 pt-3">
          {/* Help */}
          <button className="flex items-center gap-2.5 rounded-ctl px-2.5 py-2 text-sm text-ink-soft transition-colors hover:bg-white">
            <CircleHelp className="size-[18px] text-muted" />
            <span>Help and first steps</span>
            <span className="ml-auto rounded-ctl border border-line bg-white px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-muted">
              1/6
            </span>
          </button>

          {/* Plan card */}
          <div className="rounded-ctl border border-accent-softer bg-accent-soft p-3">
            <span className="inline-flex items-center gap-1.5 rounded-ctl border border-accent-softer bg-white px-2 py-0.5 text-xs font-medium text-accent">
              <span className="size-1.5 rounded-full bg-accent" />
              Active now
            </span>
            <div className="mt-2.5 flex items-center justify-between gap-2">
              <span className="text-sm font-semibold text-ink">
                Free Plan — Tier 1
              </span>
              <button className="shrink-0 rounded-ctl bg-accent px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-accent-hover">
                Upgrade
              </button>
            </div>
          </div>

          {/* User */}
          <button className="flex items-center gap-2.5 rounded-ctl border border-line bg-white p-2.5 text-left shadow-sm transition-colors hover:bg-surface">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
              <User className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink">
                Oleg Makarov
              </p>
              <p className="truncate text-xs text-muted">
                oleg.makarov@clickterm.com
              </p>
            </div>
          </button>
        </div>
      )}
    </motion.aside>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-5 pb-1.5 pt-3 text-[11px] font-medium uppercase tracking-wide text-faint">
      {children}
    </div>
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
      className={`relative flex items-center gap-3 rounded-ctl px-3 py-2 text-sm transition-colors ${
        collapsed ? "justify-center" : ""
      } ${
        active
          ? "bg-white font-medium text-ink shadow-sm"
          : "text-ink-soft hover:bg-white"
      }`}
    >
      {active && (
        <span className="absolute -left-3 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-accent" />
      )}
      <Icon
        className={`size-[18px] shrink-0 ${active ? "text-accent" : "text-muted"}`}
      />
      {!collapsed && <span className="truncate">{label}</span>}
      {!collapsed && badge && (
        <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-ctl bg-accent px-1 text-xs font-medium text-white">
          {badge}
        </span>
      )}
    </button>
  );
}
