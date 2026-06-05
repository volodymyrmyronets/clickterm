"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  AlignLeft,
  Bold,
  Braces,
  Briefcase,
  Building2,
  Calendar,
  ChevronDown,
  ChevronLeft,
  Clock,
  GripVertical,
  Hash,
  Italic,
  LayoutGrid,
  Link2,
  List,
  Mail,
  MapPin,
  Phone,
  Plus,
  Receipt,
  RotateCcw,
  RotateCw,
  Strikethrough,
  Table,
  Underline,
  User,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const PLACEHOLDERS: { label: string; icon: LucideIcon }[] = [
  { label: "Full Name", icon: User },
  { label: "Email Address", icon: Mail },
  { label: "Company Name", icon: Building2 },
  { label: "Job Title", icon: Briefcase },
  { label: "Date", icon: Calendar },
  { label: "Phone Number", icon: Phone },
  { label: "Registration number", icon: Hash },
  { label: "VAT number", icon: Receipt },
  { label: "Address", icon: MapPin },
];

const CUSTOM = ["Custom 1", "Custom 2", "Custom 3", "Custom 4", "Custom 5"];

export default function NewTemplate() {
  const [title, setTitle] = useState("");
  const [tab, setTab] = useState<"placeholders" | "versions">("placeholders");
  const [empty, setEmpty] = useState(true);
  const editorRef = useRef<HTMLDivElement>(null);

  function exec(cmd: string, value?: string) {
    editorRef.current?.focus();
    document.execCommand(cmd, false, value);
    syncEmpty();
  }

  function insertToken(label: string) {
    editorRef.current?.focus();
    document.execCommand("insertText", false, `{{${label}}}`);
    syncEmpty();
  }

  function syncEmpty() {
    setEmpty((editorRef.current?.textContent ?? "").trim().length === 0);
  }

  return (
    <div className="flex h-dvh flex-col bg-surface font-sans text-ink">
      {/* Top bar */}
      <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-3 border-b border-line bg-surface px-4 sm:px-5">
        <Link
          href="/"
          className="grid size-9 shrink-0 place-items-center rounded-ctl border border-line-strong bg-white text-ink-soft shadow-sm transition-colors hover:text-accent"
          aria-label="Back"
        >
          <ChevronLeft className="size-4" />
        </Link>
        <nav className="flex min-w-0 items-center gap-2 text-sm">
          <Link
            href="/"
            className="truncate font-medium text-ink-soft transition-colors hover:text-accent"
          >
            Clickwrap Templates
          </Link>
          <span className="text-faint">/</span>
          <span className="truncate font-semibold text-ink">New Template</span>
        </nav>
        <div className="flex-1" />
        <button className="rounded-ctl border border-line-strong bg-white px-3.5 py-2 text-sm font-medium text-ink shadow-sm transition-colors hover:bg-surface-soft">
          Preview
        </button>
        <button className="rounded-ctl bg-accent px-3.5 py-2 text-sm font-medium text-white shadow-[0_1px_2px_rgba(91,57,240,.25),0_0_0_1px_rgba(91,57,240,.12)] transition-colors hover:bg-accent-hover">
          Save Changes
        </button>
      </header>

      {/* Content */}
      <div className="min-h-0 flex-1 overflow-auto">
        <div className="mx-auto w-full max-w-[1340px] px-4 py-6 sm:px-10 sm:py-7">
          {/* Head */}
          <div>
            <h1 className="text-[28px] font-bold tracking-tight">New Template</h1>
            <p className="mt-1.5 text-[13.5px] font-medium text-muted">
              Version 1.0
            </p>
          </div>

          {/* Language tabs */}
          <div className="mt-5 flex items-center gap-1.5">
            <button className="flex h-[30px] items-center gap-2 rounded-ctl border border-accent-softer bg-accent-soft px-3 text-[13.5px] font-medium text-accent">
              <span className="size-1.5 rounded-full bg-accent" />
              English
            </button>
            <button className="flex h-[30px] items-center gap-1.5 rounded-ctl px-2.5 text-[13.5px] font-medium text-ink-soft transition-colors hover:bg-surface-soft">
              <Plus className="size-3.5" />
            </button>
          </div>

          {/* Grid */}
          <div className="mt-4 grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_400px]">
            {/* Editor column */}
            <div className="min-w-0">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add title in English"
                className="h-[42px] w-full rounded-ctl border border-line-strong bg-white px-3.5 text-sm text-ink shadow-sm outline-none transition-colors placeholder:text-faint focus:border-accent"
              />

              <div className="mt-4 overflow-hidden rounded-ctl border border-line-strong bg-white">
                {/* Toolbar */}
                <div className="flex flex-wrap items-center gap-0.5 border-b border-line bg-surface px-2.5 py-2">
                  <ToolBtn onClick={() => exec("undo")} aria="Undo">
                    <RotateCcw className="size-4" />
                  </ToolBtn>
                  <ToolBtn onClick={() => exec("redo")} aria="Redo">
                    <RotateCw className="size-4" />
                  </ToolBtn>
                  <Sep />
                  <Dropdown label="Inter" className="w-[92px]" />
                  <Dropdown label="16" className="w-[60px]" />
                  <Sep />
                  <ToolBtn onClick={() => exec("bold")} aria="Bold">
                    <Bold className="size-4" />
                  </ToolBtn>
                  <ToolBtn onClick={() => exec("underline")} aria="Underline">
                    <Underline className="size-4" />
                  </ToolBtn>
                  <ToolBtn onClick={() => exec("italic")} aria="Italic">
                    <Italic className="size-4" />
                  </ToolBtn>
                  <ToolBtn onClick={() => exec("strikeThrough")} aria="Strikethrough">
                    <Strikethrough className="size-4" />
                  </ToolBtn>
                  <Sep />
                  <button className="flex h-8 items-center gap-1 rounded-ctl px-1.5 text-ink-soft transition-colors hover:bg-surface-soft">
                    <span className="size-[15px] rounded-[2px] bg-ink" />
                    <ChevronDown className="size-3 text-faint" />
                  </button>
                  <Sep />
                  <button
                    onClick={() => exec("insertUnorderedList")}
                    className="flex h-8 items-center gap-1 rounded-ctl px-1.5 text-ink-soft transition-colors hover:bg-surface-soft"
                  >
                    <List className="size-4" />
                    <ChevronDown className="size-3 text-faint" />
                  </button>
                  <button
                    onClick={() => exec("justifyLeft")}
                    className="flex h-8 items-center gap-1 rounded-ctl px-1.5 text-ink-soft transition-colors hover:bg-surface-soft"
                  >
                    <AlignLeft className="size-4" />
                    <ChevronDown className="size-3 text-faint" />
                  </button>
                  <Sep />
                  <ToolBtn
                    onClick={() => {
                      const url = window.prompt("Link URL");
                      if (url) exec("createLink", url);
                    }}
                    aria="Insert link"
                  >
                    <Link2 className="size-4" />
                  </ToolBtn>
                  <ToolBtn onClick={() => {}} aria="Insert table">
                    <Table className="size-4" />
                  </ToolBtn>
                </div>

                {/* Body */}
                <div className="relative min-h-[320px]">
                  <div
                    ref={editorRef}
                    contentEditable
                    suppressContentEditableWarning
                    onInput={syncEmpty}
                    onDrop={(e) => {
                      const data = e.dataTransfer.getData("text/plain");
                      if (data) {
                        e.preventDefault();
                        insertToken(data);
                      }
                    }}
                    className="min-h-[320px] w-full px-5 py-4 text-sm leading-relaxed text-ink outline-none [&_a]:text-accent [&_a]:underline"
                  />
                  {empty && (
                    <div className="pointer-events-none absolute left-5 top-4 flex items-center gap-2 text-sm text-faint">
                      Type or press
                      <kbd className="rounded-ctl border border-line-strong bg-surface px-2 py-0.5 font-mono text-[13px] text-ink-soft">
                        /
                      </kbd>
                      for dynamic tags
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Placeholders panel */}
            <aside className="lg:sticky lg:top-[76px]">
              <div className="rounded-ctl border border-line-strong bg-white p-4 shadow-sm">
                {/* Tabs */}
                <div className="grid grid-cols-2 gap-1 rounded-ctl bg-surface p-1">
                  <TabBtn
                    active={tab === "placeholders"}
                    onClick={() => setTab("placeholders")}
                    icon={<LayoutGrid className="size-4" />}
                  >
                    Placeholders
                  </TabBtn>
                  <TabBtn
                    active={tab === "versions"}
                    onClick={() => setTab("versions")}
                    icon={<Clock className="size-4" />}
                  >
                    Versions
                  </TabBtn>
                </div>

                {tab === "placeholders" ? (
                  <div className="mt-4">
                    <p className="mb-3 text-[13px] text-ink-soft">
                      <b className="font-semibold text-ink">Placeholders</b>{" "}
                      <span className="text-faint">(drag &amp; drop)</span>
                    </p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {PLACEHOLDERS.map((p) => (
                        <Chip
                          key={p.label}
                          label={p.label}
                          icon={p.icon}
                          onInsert={insertToken}
                        />
                      ))}
                    </div>
                    <div className="my-3.5 border-t border-line" />
                    <div className="grid grid-cols-2 gap-1.5">
                      {CUSTOM.map((p) => (
                        <Chip
                          key={p}
                          label={p}
                          icon={Braces}
                          onInsert={insertToken}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="mt-4">
                    <div className="flex items-center justify-between rounded-ctl border border-line-strong px-3 py-2.5">
                      <div>
                        <p className="text-sm font-medium text-ink">Version 1.0</p>
                        <p className="text-xs text-faint">Current draft</p>
                      </div>
                      <span className="rounded-[2px] bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent">
                        Current
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToolBtn({
  children,
  onClick,
  aria,
}: {
  children: React.ReactNode;
  onClick: () => void;
  aria: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={aria}
      className="grid size-8 place-items-center rounded-ctl text-ink-soft transition-colors hover:bg-surface-soft"
    >
      {children}
    </button>
  );
}

function Dropdown({ label, className }: { label: string; className?: string }) {
  return (
    <button
      className={`flex h-8 items-center justify-between gap-1 rounded-ctl border border-line-strong bg-white px-2 text-[13px] text-ink transition-colors hover:bg-surface-soft ${
        className ?? ""
      }`}
    >
      {label}
      <ChevronDown className="size-3.5 text-faint" />
    </button>
  );
}

function Sep() {
  return <span className="mx-1 h-[18px] w-px bg-line-strong" />;
}

function TabBtn({
  children,
  active,
  onClick,
  icon,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 rounded-ctl py-1.5 text-sm font-medium transition-colors ${
        active ? "bg-white text-ink shadow-sm" : "text-muted hover:text-ink"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}

function Chip({
  label,
  icon: Icon,
  onInsert,
}: {
  label: string;
  icon: LucideIcon;
  onInsert: (label: string) => void;
}) {
  return (
    <button
      draggable
      onDragStart={(e) => e.dataTransfer.setData("text/plain", label)}
      onClick={() => onInsert(label)}
      className="group flex h-[38px] items-center gap-2 rounded-ctl border border-line-strong bg-white pl-1.5 pr-2.5 text-left text-sm text-ink-soft transition-colors hover:border-accent-softer hover:bg-accent-soft hover:text-accent"
    >
      <GripVertical className="size-3.5 shrink-0 text-[#cfcfd4] transition-colors group-hover:text-accent" />
      <span className="grid size-6 shrink-0 place-items-center rounded-ctl bg-accent-soft text-accent transition-colors group-hover:bg-white">
        <Icon className="size-3.5" />
      </span>
      <span className="truncate">{label}</span>
    </button>
  );
}
