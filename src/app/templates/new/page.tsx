"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  AlignLeft,
  ChevronDown,
  ChevronLeft,
  Clock,
  GripVertical,
  Italic,
  LayoutGrid,
  Link2,
  List,
  Plus,
  RotateCcw,
  RotateCw,
  Strikethrough,
  Table,
  Bold,
  Underline,
} from "lucide-react";

const PLACEHOLDERS = [
  "Full Name",
  "Email Address",
  "Company Name",
  "Job Title",
  "Date",
  "Phone Number",
  "Registration number",
  "VAT number",
  "Address",
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
    const text = editorRef.current?.textContent ?? "";
    setEmpty(text.trim().length === 0);
  }

  return (
    <div className="flex h-dvh flex-col bg-surface font-sans text-ink">
      {/* Top bar */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-line bg-white px-4">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="grid size-9 place-items-center rounded-ctl border border-line text-muted transition-colors hover:bg-surface-soft"
            aria-label="Back"
          >
            <ChevronLeft className="size-4" />
          </Link>
          <h1 className="text-lg font-bold">New Template</h1>
          <span className="rounded-ctl bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent">
            Version 1.0
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-ctl border border-line bg-white px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-surface-soft">
            Preview
          </button>
          <button className="rounded-ctl bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover">
            Save Changes
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 overflow-auto p-4 lg:grid-cols-[1fr_400px]">
        {/* Editor panel */}
        <section className="flex min-h-[520px] flex-col rounded-ctl border border-line bg-white p-6">
          {/* Language tabs */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 rounded-ctl border border-line bg-white px-3 py-1.5 text-sm font-medium text-ink">
              <span className="size-1.5 rounded-full bg-accent" />
              English
            </button>
            <button
              className="grid size-9 place-items-center rounded-ctl border border-line text-muted transition-colors hover:bg-surface-soft"
              aria-label="Add language"
            >
              <Plus className="size-4" />
            </button>
          </div>

          {/* Title */}
          <label className="mt-6 block text-sm font-medium text-ink">
            Clickwrap Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add title in English"
            className="mt-2 w-full rounded-ctl border border-line px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-accent"
          />

          {/* Editor */}
          <div className="mt-4 flex min-h-0 flex-1 flex-col overflow-hidden rounded-ctl border border-line">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 border-b border-line p-2">
              <ToolBtn onClick={() => exec("undo")} aria="Undo">
                <RotateCcw className="size-4" />
              </ToolBtn>
              <ToolBtn onClick={() => exec("redo")} aria="Redo">
                <RotateCw className="size-4" />
              </ToolBtn>
              <Divider />
              <Dropdown label="Inter" className="w-[92px]" />
              <Dropdown label="16" className="w-[64px]" />
              <Divider />
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
              <Divider />
              <button className="flex items-center gap-1 rounded-ctl px-1.5 py-1.5 text-muted transition-colors hover:bg-surface-soft">
                <span className="size-4 rounded bg-ink" />
                <ChevronDown className="size-3 text-faint" />
              </button>
              <Divider />
              <button
                onClick={() => exec("insertUnorderedList")}
                className="flex items-center gap-1 rounded-ctl px-1.5 py-1.5 text-muted transition-colors hover:bg-surface-soft"
              >
                <List className="size-4" />
                <ChevronDown className="size-3 text-faint" />
              </button>
              <button
                onClick={() => exec("justifyLeft")}
                className="flex items-center gap-1 rounded-ctl px-1.5 py-1.5 text-muted transition-colors hover:bg-surface-soft"
              >
                <AlignLeft className="size-4" />
                <ChevronDown className="size-3 text-faint" />
              </button>
              <Divider />
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

            {/* Content */}
            <div className="relative min-h-[260px] flex-1">
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
                className="h-full w-full overflow-auto px-4 py-3.5 text-sm leading-relaxed text-ink outline-none [&_a]:text-accent [&_a]:underline"
              />
              {empty && (
                <div className="pointer-events-none absolute left-4 top-3.5 flex items-center gap-2 text-sm text-faint">
                  Type or press
                  <kbd className="rounded-ctl border border-line bg-white px-2 py-0.5 text-xs text-muted shadow-sm">
                    /
                  </kbd>
                  for dynamic tags
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Right panel */}
        <aside className="flex min-h-[520px] flex-col rounded-ctl border border-line bg-white p-4">
          {/* Tabs */}
          <div className="grid grid-cols-2 gap-1 rounded-ctl bg-surface p-1">
            <TabButton
              active={tab === "placeholders"}
              onClick={() => setTab("placeholders")}
              icon={<LayoutGrid className="size-4" />}
            >
              Placeholders
            </TabButton>
            <TabButton
              active={tab === "versions"}
              onClick={() => setTab("versions")}
              icon={<Clock className="size-4" />}
            >
              Versions
            </TabButton>
          </div>

          {tab === "placeholders" ? (
            <div className="mt-5">
              <p className="text-sm font-medium text-muted">
                Placeholders <span className="text-faint">(drag &amp; drop)</span>
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {PLACEHOLDERS.map((p) => (
                  <Chip key={p} label={p} onInsert={insertToken} />
                ))}
              </div>
              <div className="my-4 border-t border-line" />
              <div className="grid grid-cols-2 gap-2">
                {CUSTOM.map((p) => (
                  <Chip key={p} label={p} onInsert={insertToken} />
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-5 flex flex-col gap-2">
              <VersionRow version="Version 1.0" note="Current draft" current />
            </div>
          )}
        </aside>
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
      className={`flex items-center justify-between gap-1 rounded-ctl border border-line px-2 py-1.5 text-sm text-ink transition-colors hover:bg-surface-soft ${className ?? ""}`}
    >
      {label}
      <ChevronDown className="size-3.5 text-faint" />
    </button>
  );
}

function Divider() {
  return <span className="mx-1 h-5 w-px bg-line" />;
}

function TabButton({
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
      className={`flex items-center justify-center gap-2 rounded-ctl py-2 text-sm font-medium transition-colors ${
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
  onInsert,
}: {
  label: string;
  onInsert: (label: string) => void;
}) {
  return (
    <button
      draggable
      onDragStart={(e) => e.dataTransfer.setData("text/plain", label)}
      onClick={() => onInsert(label)}
      className="flex items-center gap-2 rounded-ctl border border-line bg-white px-3 py-2.5 text-left text-sm text-ink-soft transition-colors hover:border-accent hover:bg-surface-soft"
    >
      <GripVertical className="size-4 shrink-0 text-accent" />
      <span className="truncate">{label}</span>
    </button>
  );
}

function VersionRow({
  version,
  note,
  current,
}: {
  version: string;
  note: string;
  current?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-ctl border border-line px-3 py-2.5">
      <div>
        <p className="text-sm font-medium text-ink">{version}</p>
        <p className="text-xs text-faint">{note}</p>
      </div>
      {current && (
        <span className="rounded-ctl bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent">
          Current
        </span>
      )}
    </div>
  );
}
