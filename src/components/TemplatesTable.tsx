"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
import {
  Calendar,
  Check,
  CheckCheck,
  ChevronDown,
  Copy,
  FileText,
  Hash,
  Layers,
  MoreVertical,
  Plus,
  Tag,
} from "lucide-react";
import { TEMPLATES, tagColor, type TemplateRow } from "@/lib/data";

const GRID =
  "grid grid-cols-[175px_minmax(0,1.4fr)_125px_minmax(0,1.4fr)_140px_minmax(0,1.2fr)_190px]";

export function TemplatesTable() {
  return (
    <div className="w-full">
      {/* Header */}
      <div className={`${GRID} sticky top-0 z-10 border-y border-line-strong bg-white`}>
        <HeadCell first icon={<Calendar className="size-3.5" />} sortable>
          Created date
        </HeadCell>
        <HeadCell icon={<FileText className="size-3.5" />} sortable>
          Template name
        </HeadCell>
        <HeadCell icon={<Layers className="size-3.5" />} sortable>
          Version
        </HeadCell>
        <HeadCell icon={<Tag className="size-3.5" />}>Tags</HeadCell>
        <HeadCell icon={<CheckCheck className="size-3.5" />} sortable>
          Published
        </HeadCell>
        <HeadCell icon={<Hash className="size-3.5" />}>Template ID</HeadCell>
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
  icon,
  sortable,
  first,
  last,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  sortable?: boolean;
  first?: boolean;
  last?: boolean;
}) {
  return (
    <div
      className={`flex h-10 min-w-0 items-center gap-1.5 whitespace-nowrap text-[13px] font-medium text-ink-soft ${edgePad(
        first,
        last,
      )} ${last ? "" : "border-r border-grid"}`}
    >
      {icon && <span className="shrink-0 text-faint">{icon}</span>}
      <span className="truncate">{children}</span>
      {sortable && <ChevronDown className="size-3.5 shrink-0 text-faint" />}
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
      className={`flex h-[50px] min-w-0 items-center overflow-hidden ${edgePad(
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
        <span className="inline-flex h-6 items-center rounded-ctl border border-line-strong px-2 text-[13px] text-ink">
          {row.version}
        </span>
      </Cell>

      <Cell>
        <TagCell tags={row.tags} />
      </Cell>

      <Cell>
        <Toggle initial={row.published} />
      </Cell>

      <Cell>
        <TemplateId value={row.templateId} />
      </Cell>

      <Cell last>
        <div className="flex items-center gap-1.5">
          <button className="shrink-0 whitespace-nowrap rounded-ctl border border-line-strong px-2.5 py-1.5 text-[13px] font-medium text-ink transition-colors hover:bg-surface">
            View events
          </button>
          <button
            className="grid size-8 shrink-0 place-items-center rounded-ctl text-faint transition-colors hover:bg-surface-soft"
            aria-label="More actions"
          >
            <MoreVertical className="size-4" />
          </button>
        </div>
      </Cell>
    </motion.div>
  );
}

function TagCell({ tags }: { tags: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  // null = "measuring" (render all tags so widths can be read)
  const [shown, setShown] = useState<number | null>(null);

  useIsoLayoutEffect(() => {
    setShown(null);
  }, [tags]);

  useIsoLayoutEffect(() => {
    if (shown !== null) return;
    const el = ref.current;
    if (!el) return;
    const cw = el.clientWidth;
    const chips = Array.from(el.querySelectorAll<HTMLElement>("[data-tag]"));
    if (chips.length === 0) return;
    const last = chips[chips.length - 1];
    if (last.offsetLeft + last.offsetWidth <= cw) {
      setShown(tags.length); // everything fits
      return;
    }
    const reserve = 44; // room for the "+N" chip
    let fit = 0;
    for (let i = 0; i < chips.length; i++) {
      const c = chips[i];
      if (c.offsetLeft + c.offsetWidth > cw - reserve) break;
      fit = i + 1;
    }
    setShown(Math.max(1, fit));
  }, [shown, tags]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setShown(null));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  if (tags.length === 0) {
    return (
      <button className="inline-flex h-[21px] w-fit items-center gap-1 rounded-[2px] border border-dashed border-line-strong px-2 text-xs text-faint transition-colors hover:border-accent-softer hover:bg-accent-soft hover:text-accent">
        <Plus className="size-3" />
        Add tag
      </button>
    );
  }

  const measuring = shown === null;
  const visible = measuring ? tags : tags.slice(0, shown);
  const hidden = measuring ? [] : tags.slice(shown);

  return (
    <div ref={ref} className="flex items-center gap-1.5 overflow-hidden">
      {visible.map((t) => {
        const c = tagColor(t);
        return (
          <span
            key={t}
            data-tag
            className="inline-flex h-[21px] shrink-0 items-center rounded-[2px] px-[7px] text-xs font-medium"
            style={{ backgroundColor: c.bg, color: c.text }}
          >
            {t}
          </span>
        );
      })}
      {hidden.length > 0 && (
        <span
          title={hidden.join(", ")}
          className="inline-flex h-[21px] shrink-0 cursor-default items-center rounded-[2px] bg-[#f0f0f2] px-[7px] text-xs font-medium text-ink-soft"
        >
          +{hidden.length}
        </span>
      )}
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
    <div className="flex min-w-0 items-center gap-1.5">
      <span className="truncate text-[13px] text-muted underline decoration-dotted decoration-[#d3d3d7] underline-offset-4">
        {value}
      </span>
      <button
        onClick={copy}
        className="shrink-0 text-faint transition-colors hover:text-accent"
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
