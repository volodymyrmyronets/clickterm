export interface TemplateRow {
  id: string;
  date: string;
  name: string;
  version: string;
  tags: string[];
  published: boolean;
  templateId: string;
}

export const TEMPLATES: TemplateRow[] = [
  {
    id: "1",
    date: "16/04/25",
    name: "Terms of Service Agreement",
    version: "1.0",
    tags: ["mainaccount", "subaccount", "registration_only", "account_update"],
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
    tags: ["registration_only", "subaccount", "mainaccount", "account_update", "registration", "tag-test"],
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
    tags: ["mainaccount", "subaccount", "registration_only", "account_update"],
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
  { id: "11", date: "25/02/25", name: "Cookie Policy", version: "1.0", tags: ["mainaccount", "subaccount", "registration_only"], published: true, templateId: "j1k2l…" },
  { id: "12", date: "21/02/25", name: "Data Processing Agreement", version: "2.0", tags: ["account_update"], published: true, templateId: "k1l2m…" },
  { id: "13", date: "18/02/25", name: "Acceptable Use Policy", version: "1.0", tags: [], published: false, templateId: "l1m2n…" },
  { id: "14", date: "14/02/25", name: "Terms of Service Agreement", version: "4.0", tags: ["registration", "tag-test", "mainaccount", "subaccount"], published: true, templateId: "m1n2o…" },
  { id: "15", date: "10/02/25", name: "Refund Policy", version: "1.0", tags: ["login_only"], published: true, templateId: "n1o2p…" },
  { id: "16", date: "06/02/25", name: "EULA", version: "3.0", tags: ["registration_only", "subaccount", "mainaccount", "account_update", "registration"], published: false, templateId: "o1p2q…" },
  { id: "17", date: "02/02/25", name: "Privacy Policy", version: "5.0", tags: ["account_update", "login_only"], published: true, templateId: "p1q2r…" },
  { id: "18", date: "28/01/25", name: "SLA Agreement", version: "1.0", tags: [], published: false, templateId: "q1r2s…" },
  { id: "19", date: "24/01/25", name: "TelQ — Terms & Conditions", version: "3.0", tags: ["mainaccount"], published: true, templateId: "r1s2t…" },
  { id: "20", date: "20/01/25", name: "Non-Disclosure Agreement", version: "2.0", tags: ["registration", "subaccount", "mainaccount"], published: true, templateId: "s1t2u…" },
  { id: "21", date: "16/01/25", name: "Terms of Service Agreement", version: "1.0", tags: ["mainaccount", "account_update", "subaccount", "registration_only", "registration", "tag-test"], published: false, templateId: "t1u2v…" },
  { id: "22", date: "12/01/25", name: "Cookie Policy", version: "2.0", tags: ["tag-test"], published: true, templateId: "u1v2w…" },
  { id: "23", date: "08/01/25", name: "EULA", version: "6.0", tags: [], published: true, templateId: "v1w2x…" },
  { id: "24", date: "04/01/25", name: "Privacy Policy", version: "1.0", tags: ["login_only"], published: false, templateId: "w1x2y…" },
  { id: "25", date: "31/12/24", name: "Data Processing Agreement", version: "3.0", tags: ["account_update", "registration_only", "mainaccount", "subaccount"], published: true, templateId: "x1y2z…" },
  { id: "26", date: "27/12/24", name: "Terms of Service Agreement", version: "2.0", tags: ["mainaccount", "subaccount", "registration_only", "account_update"], published: true, templateId: "y1z2a…" },
  { id: "27", date: "22/12/24", name: "Acceptable Use Policy", version: "1.0", tags: ["registration"], published: false, templateId: "z1a2b…" },
  { id: "28", date: "18/12/24", name: "TelQ — Terms & Conditions", version: "4.0", tags: [], published: true, templateId: "a2b3c…" },
  { id: "29", date: "14/12/24", name: "Refund Policy", version: "2.0", tags: ["login_only", "tag-test"], published: true, templateId: "b2c3d…" },
  { id: "30", date: "10/12/24", name: "EULA", version: "1.0", tags: ["subaccount"], published: false, templateId: "c2d3e…" },
  { id: "31", date: "06/12/24", name: "Privacy Policy", version: "2.0", tags: ["mainaccount", "registration", "subaccount"], published: true, templateId: "d2e3f…" },
  { id: "32", date: "02/12/24", name: "SLA Agreement", version: "2.0", tags: ["account_update"], published: true, templateId: "e2f3g…" },
  { id: "33", date: "28/11/24", name: "Non-Disclosure Agreement", version: "1.0", tags: [], published: false, templateId: "f2g3h…" },
  { id: "34", date: "24/11/24", name: "Terms of Service Agreement", version: "3.0", tags: ["mainaccount", "subaccount", "registration_only", "account_update", "registration"], published: true, templateId: "g2h3i…" },
  { id: "35", date: "20/11/24", name: "Cookie Policy", version: "1.0", tags: ["registration_only"], published: false, templateId: "h2i3j…" },
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
