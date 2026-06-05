export interface TemplateRow {
  id: string;
  date: string;
  name: string;
  version: string;
  tags: string[];
  /** Count shown as a "+N" overflow chip after the visible tags. */
  more?: number;
  published: boolean;
  templateId: string;
}

export const TEMPLATES: TemplateRow[] = [
  {
    id: "1",
    date: "16/04/25",
    name: "Terms of Service Agreement",
    version: "1.0",
    tags: ["mainaccount", "subaccount"],
    more: 2,
    published: true,
    templateId: "3c873…",
  },
  {
    id: "2",
    date: "16/04/25",
    name: "TelQ — Terms & Conditions",
    version: "2.0",
    tags: [],
    published: true,
    templateId: "a1b2c…",
  },
  {
    id: "3",
    date: "15/04/25",
    name: "EULA",
    version: "1.0",
    tags: ["registration_only", "subaccount"],
    more: 4,
    published: false,
    templateId: "b1c2d…",
  },
  {
    id: "4",
    date: "14/04/25",
    name: "Terms of Service Agreement",
    version: "3.0",
    tags: ["registration", "tag-test"],
    published: true,
    templateId: "c1d2e…",
  },
  {
    id: "5",
    date: "10/04/25",
    name: "Privacy Policy",
    version: "3.0",
    tags: [],
    published: false,
    templateId: "d1e2f…",
  },
  {
    id: "6",
    date: "09/03/25",
    name: "TelQ — Terms & Conditions",
    version: "1.0",
    tags: ["mainaccount"],
    published: true,
    templateId: "e1f2g…",
  },
  {
    id: "7",
    date: "09/03/25",
    name: "Terms of Service Agreement",
    version: "2.0",
    tags: ["mainaccount", "subaccount"],
    more: 2,
    published: false,
    templateId: "f1g2h…",
  },
  {
    id: "8",
    date: "07/03/25",
    name: "EULA",
    version: "5.0",
    tags: [],
    published: true,
    templateId: "g1h2i3…",
  },
  {
    id: "9",
    date: "01/03/25",
    name: "Privacy Policy",
    version: "4.0",
    tags: ["login_only", "account_update"],
    published: true,
    templateId: "h1i2j3…",
  },
  {
    id: "10",
    date: "29/02/25",
    name: "TelQ — Terms & Conditions",
    version: "1.0",
    tags: ["mainaccount"],
    published: false,
    templateId: "i1j2k3…",
  },
];

// --- Tag color system -------------------------------------------------------
export interface TagColor {
  bg: string;
  text: string;
}

// Direction 1 tag palette — one cohesive low-saturation set.
const TAG_COLORS: Record<string, TagColor> = {
  mainaccount: { bg: "#efeafe", text: "#5b39f0" }, // violet
  subaccount: { bg: "#e8f0fd", text: "#1d63d8" }, // blue
  registration_only: { bg: "#eef0f3", text: "#475569" }, // slate
  account_update: { bg: "#e1f4f1", text: "#0f766e" }, // teal
  registration: { bg: "#fbe9ef", text: "#bb1d6a" }, // rose
  "tag-test": { bg: "#e7f6ec", text: "#15803d" }, // green
  login_only: { bg: "#fbf1da", text: "#a85d09" }, // amber
};

const FALLBACK: TagColor[] = [
  { bg: "#e8f0fd", text: "#1d63d8" },
  { bg: "#e1f4f1", text: "#0f766e" },
  { bg: "#fbe9ef", text: "#bb1d6a" },
  { bg: "#fbf1da", text: "#a85d09" },
  { bg: "#e7f6ec", text: "#15803d" },
  { bg: "#eef0f3", text: "#475569" },
];

export function tagColor(name: string): TagColor {
  if (TAG_COLORS[name]) return TAG_COLORS[name];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return FALLBACK[hash % FALLBACK.length];
}
