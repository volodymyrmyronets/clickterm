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

const TAG_COLORS: Record<string, TagColor> = {
  mainaccount: { bg: "#F1EDFF", text: "#6C47FF" },
  registration_only: { bg: "#F3E8FF", text: "#9333EA" },
  subaccount: { bg: "#E6EFFE", text: "#2563EB" },
  account_update: { bg: "#CCFBF1", text: "#0D9488" },
  registration: { bg: "#FCE7F3", text: "#DB2777" },
  "tag-test": { bg: "#EEF0FB", text: "#5B5FCF" },
  login_only: { bg: "#FEF3C7", text: "#D97706" },
};

const FALLBACK: TagColor[] = [
  { bg: "#E6EFFE", text: "#2563EB" },
  { bg: "#CCFBF1", text: "#0D9488" },
  { bg: "#FCE7F3", text: "#DB2777" },
  { bg: "#FEF3C7", text: "#D97706" },
];

export function tagColor(name: string): TagColor {
  if (TAG_COLORS[name]) return TAG_COLORS[name];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return FALLBACK[hash % FALLBACK.length];
}
