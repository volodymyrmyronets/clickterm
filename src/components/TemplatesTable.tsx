"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, MoreVertical, Plus } from "lucide-react";
import { TEMPLATES, tagColor, type TemplateRow } from "@/lib/data";

const GRID =
  "grid grid-cols-[120px_minmax(240px,1.5fr)_100px_minmax(200px,1fr)_120px_150px_180px]";

export function TemplatesTable() {
  return (
    <div className="min-w-[1024px]">
      {/* Header */}
      <div
        className={`${GRID} border-y border-line bg-surface text-[11px] font-medium uppercase tracking-wide text-faint`}
      >
        <HeadCell>Created date</HeadCell>
        <HeadCell>Template name</HeadCell>
        <HeadCell>Version</HeadCell>
        <HeadCell>Tags</HeadCell>
        <HeadCell>Published</HeadCell>
        <HeadCell>Template ID</HeadCell>
        <HeadCell divider>Actions</HeadCell>
      </div>

      {TEMPLATES.map((row, i) => (
        <Row key={row.id} row={row} index={i} />
      ))}
    </div>
  );
}

function HeadCell({
  children,
  divider,
}: {
  children: React.ReactNode;
  divider?: boolean;
}) {
  return (
    <div
      className={`flex items-center px-4 py-3 ${divider ? "border-l border-line" : ""}`}
    >
      {children}
    </div>
  );
}

function Cell({
  children,
  divider,
}: {
  children: React.ReactNode;
  divider?: boolean;
}) {
  return (
    <div
      className={`flex items-center px-4 py-4 ${divider ? "border-l border-line" : ""}`}
    >
      {children}
    </div>
  );
}

function Row({ row, index }: { row: TemplateRow; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.025, ease: "easeOut" }}
      className={`${GRID} border-b border-line-soft transition-colors hover:bg-surface`}
    >
      <Cell>
        <span className="text-sm text-muted">{row.date}</span>
      </Cell>

      <Cell>
        <button className="text-left text-[15px] font-semibold text-ink underline decoration-dotted decoration-[#D1D5DB] underline-offset-4 hover:decoration-accent">
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

      <Cell divider>
        <div className="flex items-center gap-2">
          <button className="rounded-lg border border-line px-3 py-1.5 text-sm font-medium text-ink-soft transition-colors hover:bg-surface-soft">
            View events
          </button>
          <button
            className="grid size-8 place-items-center rounded-lg text-faint transition-colors hover:bg-surface-soft"
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
      <button className="flex w-fit items-center gap-1 text-sm text-faint hover:text-accent">
        <Plus className="size-3.5" />
        Add tag
      </button>
    );
  }
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {tags.map((t) => {
        const c = tagColor(t);
        return (
          <span
            key={t}
            className="rounded-md px-2 py-1 text-xs font-medium"
            style={{ backgroundColor: c.bg, color: c.text }}
          >
            {t}
          </span>
        );
      })}
      {more ? (
        <span className="rounded-md bg-line-soft px-2 py-1 text-xs font-medium text-muted">
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
      className={`relative h-6 w-11 rounded-full transition-colors ${
        on ? "bg-accent" : "bg-line"
      }`}
      role="switch"
      aria-checked={on}
      aria-label="Published"
    >
      <span
        className={`absolute top-0.5 size-5 rounded-full bg-white shadow-sm transition-all ${
          on ? "left-[22px]" : "left-0.5"
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
      <span className="text-sm text-muted underline decoration-dotted decoration-[#D1D5DB] underline-offset-4">
        {value}
      </span>
      <button
        onClick={copy}
        className="text-faint transition-colors hover:text-accent"
        aria-label="Copy template ID"
      >
        {copied ? (
          <Check className="size-3.5 text-[#22C55E]" />
        ) : (
          <Copy className="size-3.5" />
        )}
      </button>
    </div>
  );
}
