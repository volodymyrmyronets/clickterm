"use client";

import { useState } from "react";
import { Calendar, ChevronDown, Info, Menu, Plus, Search, User } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { TemplatesTable } from "@/components/TemplatesTable";

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-white font-sans text-[#1A1A21]">
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
              className="grid size-9 shrink-0 place-items-center rounded-lg border border-[#ECECEF] text-[#6B7280] transition-colors hover:bg-[#F7F7F9] lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </button>
            <h1 className="truncate text-xl font-bold tracking-tight sm:text-2xl">
              Clickwrap Templates
            </h1>
            <Info className="hidden size-4 shrink-0 text-[#9CA3AF] sm:block" />
          </div>
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#F1EDFF] text-[#6C47FF]">
            <User className="size-4" />
          </span>
        </header>

        {/* Toolbar */}
        <div className="flex shrink-0 flex-wrap items-center gap-3 px-4 py-4 sm:px-8 sm:py-5">
          <div className="flex h-10 min-w-[180px] flex-1 items-center gap-2 rounded-xl border border-[#E5E7EB] px-3 text-sm text-[#9CA3AF] sm:w-72 sm:flex-none">
            <Search className="size-4 shrink-0" />
            <input
              placeholder="Search by tempates"
              className="w-full bg-transparent text-[#1A1A21] outline-none placeholder:text-[#9CA3AF]"
            />
          </div>

          <FilterButton icon={<Calendar className="size-4" />} label="Created date" />
          <FilterButton label="Status" />

          <button
            className="grid size-10 shrink-0 place-items-center rounded-xl border border-[#E5E7EB] text-[#6B7280] transition-colors hover:bg-[#F7F7F9]"
            aria-label="Add filter"
          >
            <Plus className="size-4" />
          </button>

          <button className="ml-auto flex h-10 shrink-0 items-center gap-2 rounded-xl bg-[#6C47FF] px-4 text-sm font-medium text-white transition-colors hover:bg-[#5B39E0]">
            <Plus className="size-4" />
            <span className="hidden sm:inline">New template</span>
            <span className="sm:hidden">New</span>
          </button>
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
    <button className="flex h-10 shrink-0 items-center gap-2 rounded-xl border border-[#E5E7EB] px-3 text-sm font-medium text-[#374151] transition-colors hover:bg-[#F7F7F9]">
      {icon && <span className="text-[#6B7280]">{icon}</span>}
      {label}
      <ChevronDown className="size-4 text-[#9CA3AF]" />
    </button>
  );
}
