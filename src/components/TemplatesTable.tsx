"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, MoreVertical, Plus } from "lucide-react";
import { TEMPLATES, tagColor, type TemplateRow } from "@/lib/data";

const GRID =
  "grid grid-cols-[110px_minmax(220px,1.4fr)_90px_minmax(280px,1.2fr)_110px_140px_180px]";

export function TemplatesTable() {
  return (
    <div className="min-w-[1024px]">
      {/* Header */}
      <div className={`${GRID} border-b border-line-strong bg-white`}>
        <HeadCell first>Created date</HeadCell>
        <HeadCell>Template name</HeadCell>
        <HeadCell>Version</HeadCell>
        <HeadCell>Tags</HeadCell>
        <HeadCell>Published</HeadCell>
        <HeadCell>Template ID</HeadCell>
        <HeadCell last>Actions</HeadCell>
      </div>

      {TEMPLATES.map((row, i) => (
        <Row key={row.id} row={row} index={i} />
      ))}
    </div>
  );
}

// Align the first/last columns with the page padding (px-8 on desktop).
function edgePad(first?: boolean, last?: boolean) {
  if (first) return "pl-4 pr-4 sm:pl-8";
  if (last) return "pl-4 pr-4 sm:pr-8";
  return "px-4";
}

function HeadCell({
  children,
  first,
  last,
}: {
  children: React.ReactNode;
  first?: boolean;
  last?: boolean;
}) {
  return (
    <div
      className={`flex h-11 min-w-0 items-center text-[13px] font-medium text-ink-soft ${edgePad(
        first,
        last,
      )} ${last ? "" : "border-r border-grid"}`}
    >
      {children}
    </div>
  );
}

function Cell({
  children,
  first,
  last,
}: {
  children: React.ReactNode;
  first?: boolean;
  last?: boolean;
}) {
  return (
    <div
      className={`flex h-[52px] min-w-0 items-center overflow-hidden ${edgePad(
        first,
        last,
      )} ${last ? "" : "border-r border-grid"}`}
    >
      {children}
    </div>
  );
}

function Row({ row, index }: { row: TemplateRow; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: index * 0.022, ease: "easeOut" }}
      className={`${GRID} border-b border-line transition-colors hover:bg-surface`}
    >
      <Cell first>
        <span className="text-sm text-muted">{row.date}</span>
      </Cell>

      <Cell>
        <button className="truncate text-left text-sm font-medium text-ink underline decoration-dotted decoration-[#d3d3d7] underline-offset-4 hover:decoration-accent">
          {row.name}
        </button>
      </Cell>

      <Cell>
        <span className="text-sm text-ink-soft">{row.version}</span>
      </Cell>

      <Cell>
        <TagCell tags={row.tags} more={row.more} />
      </Cell>

      <Cell>
        <Toggle initial={row.published} />
      </Cell>

      <Cell>
        <TemplateId value={row.templateId} />
      </Cell>

      <Cell last>
        <div className="flex items-center gap-1.5">
          <button className="rounded-ctl border border-line-strong px-2.5 py-1.5 text-[13px] font-medium text-ink transition-colors hover:bg-surface">
            View events
          </button>
          <button
            className="grid size-8 place-items-center rounded-ctl text-faint transition-colors hover:bg-surface-soft"
            aria-label="More actions"
          >
            <MoreVertical className="size-4" />
          </button>
        </div>
      </Cell>
    </motion.div>
  );
}

function TagCell({ tags, more }: { tags: string[]; more?: number }) {
  if (tags.length === 0) {
    return (
      <button className="inline-flex h-[21px] w-fit items-center gap-1 rounded-ctl border border-dashed border-line-strong px-2 text-xs text-faint transition-colors hover:border-accent-softer hover:bg-accent-soft hover:text-accent">
        <Plus className="size-3" />
        Add tag
      </button>
    );
  }
  return (
    <div className="flex items-center gap-1.5 overflow-hidden">
      {tags.map((t) => {
        const c = tagColor(t);
        return (
          <span
            key={t}
            className="inline-flex h-[21px] shrink-0 items-center rounded-ctl px-[7px] text-xs font-medium"
            style={{ backgroundColor: c.bg, color: c.text }}
          >
            {t}
          </span>
        );
      })}
      {more ? (
        <span className="inline-flex h-[21px] shrink-0 items-center rounded-ctl bg-[#f0f0f2] px-[7px] text-xs font-medium text-ink-soft">
          +{more}
        </span>
      ) : null}
    </div>
  );
}

function Toggle({ initial }: { initial: boolean }) {
  const [on, setOn] = useState(initial);
  return (
    <button
      onClick={() => setOn((v) => !v)}
      className={`relative h-[18px] w-[30px] rounded-full transition-colors ${
        on ? "bg-accent" : "bg-[#dddde0]"
      }`}
      role="switch"
      aria-checked={on}
      aria-label="Published"
    >
      <span
        className={`absolute left-0.5 top-0.5 size-3.5 rounded-full bg-white shadow-sm transition-transform ${
          on ? "translate-x-3" : ""
        }`}
      />
    </button>
  );
}

function TemplateId({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard?.writeText(value).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[13px] text-muted underline decoration-dotted decoration-[#d3d3d7] underline-offset-4">
        {value}
      </span>
      <button
        onClick={copy}
        className="text-faint transition-colors hover:text-accent"
        aria-label="Copy template ID"
      >
        {copied ? (
          <Check className="size-3.5 text-[#15803d]" />
        ) : (
          <Copy className="size-3.5" />
        )}
      </button>
    </div>
  );
}
