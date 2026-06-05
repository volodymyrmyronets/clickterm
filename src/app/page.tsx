"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  ChevronDown,
  CirclePlus,
  FileUp,
  Info,
  ListFilter,
  Menu,
  Plus,
  Search,
  User,
} from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { TemplatesTable } from "@/components/TemplatesTable";

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-white font-sans text-ink">
      {/* Desktop sidebar */}
      <div className="hidden lg:contents">
        <Sidebar />
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${navOpen ? "" : "pointer-events-none"}`}
      >
        <div
          className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${
            navOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setNavOpen(false)}
        />
        <div
          className={`absolute inset-y-0 left-0 transition-transform duration-300 ${
            navOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar onClose={() => setNavOpen(false)} />
        </div>
      </div>

      {/* Main */}
      <main className="flex min-h-0 min-w-0 flex-1 flex-col">
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4 sm:px-8">
          <div className="flex min-w-0 items-center gap-2">
            <button
              onClick={() => setNavOpen(true)}
              className="grid size-9 shrink-0 place-items-center rounded-ctl border border-line-strong text-muted transition-colors hover:bg-surface-soft lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </button>
            <h1 className="truncate text-xl font-bold tracking-tight sm:text-2xl">
              Clickwrap Templates
            </h1>
            <Info className="hidden size-4 shrink-0 text-faint sm:block" />
          </div>
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
            <User className="size-4" />
          </span>
        </header>

        {/* Toolbar */}
        <div className="flex shrink-0 flex-wrap items-center gap-3 px-4 pb-7 pt-4 sm:px-8 sm:pb-8 sm:pt-5">
          <div className="flex h-10 min-w-[180px] flex-1 items-center gap-2 rounded-ctl border border-line-strong px-3 text-sm text-faint sm:w-72 sm:flex-none">
            <Search className="size-4 shrink-0" />
            <input
              placeholder="Search by templates"
              className="w-full bg-transparent text-ink outline-none placeholder:text-faint"
            />
          </div>

          <FilterButton icon={<ListFilter className="size-4" />} label="Status" />
          <FilterButton icon={<Calendar className="size-4" />} label="Created date" />

          <button className="flex h-10 shrink-0 items-center gap-2 rounded-ctl px-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-surface-soft">
            <CirclePlus className="size-[18px] text-muted" />
            Add filter
          </button>

          <div className="group relative ml-auto shrink-0">
            <Link
              href="/templates/new"
              className="flex h-10 items-center gap-2 rounded-ctl bg-accent px-4 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              <Plus className="size-4" />
              <span className="hidden sm:inline">New template</span>
              <span className="sm:hidden">New</span>
            </Link>

            {/* Hover dropdown */}
            <div className="invisible absolute right-0 top-full z-30 w-56 translate-y-1 pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div className="flex flex-col gap-0.5 rounded-ctl border border-line bg-white p-1.5 shadow-[0_1px_2px_rgba(16,18,27,.06),0_10px_28px_rgba(16,18,27,.12)]">
                <Link
                  href="/templates/new"
                  className="flex h-9 items-center gap-2.5 rounded-ctl bg-accent-soft px-2.5 text-sm font-medium text-accent"
                >
                  <Plus className="size-4" />
                  New template
                </Link>
                <button className="flex h-9 items-center gap-2.5 rounded-ctl px-2.5 text-sm font-medium text-ink transition-colors hover:bg-surface">
                  <FileUp className="size-4 text-faint" />
                  Import template
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Table (scrolls horizontally on small screens) */}
        <div className="min-h-0 flex-1 overflow-auto">
          <TemplatesTable />
        </div>
      </main>
    </div>
  );
}

function FilterButton({
  icon,
  label,
}: {
  icon?: React.ReactNode;
  label: string;
}) {
  return (
    <button className="flex h-10 shrink-0 items-center gap-2 rounded-ctl border border-line-strong px-3 text-sm font-medium text-ink-soft transition-colors hover:bg-surface-soft">
      {icon && <span className="text-muted">{icon}</span>}
      {label}
      <ChevronDown className="size-4 text-faint" />
    </button>
  );
}
