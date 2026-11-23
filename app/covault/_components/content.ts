// All copy and configuration for the /covault page lives here so the sections stay layout-only.

export const CONTACT_EMAIL = "goureshvernekar9@gmail.com";
export const WALKTHROUGH_HREF = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  "CoVault investor walkthrough"
)}`;

export const NAV = [
  { label: "Overview", href: "#overview" },
  { label: "Workflow", href: "#workflow" },
  { label: "Modules", href: "#modules" },
  { label: "Architecture", href: "#architecture" },
  { label: "Pitch", href: "#pitch" },
];

// Screen slots used by the hero slideshow and the module rows. The PNGs in public/covault/ are the
// mockups cropped to the browser window with transparent rounded corners, so `width`/`height`
// give the frame its natural ratio and `radius` (source px) matches the corners. A slot with
// `src: null` renders a labelled placeholder at the default 16:10 (or 9:19.5 for a mobile slot).
export type ScreenId = "home-feed" | "resource-vault" | "communities" | "messaging" | "events" | "admin-governance";

export type Screen = {
  label: string;
  kind: "desktop" | "mobile";
  src: string | null;
  width?: number;
  height?: number;
  radius?: number;
};

export const SCREENS: Record<ScreenId, Screen> = {
  "home-feed": { label: "Home Feed", kind: "desktop", src: "/covault/homefeed-browser.png", width: 1800, height: 1117, radius: 15 },
  "resource-vault": { label: "Resource Vault", kind: "desktop", src: "/covault/resource-vault-browser.png", width: 1800, height: 1028, radius: 11 },
  communities: { label: "Communities", kind: "desktop", src: "/covault/communities-browser.png", width: 1800, height: 1027, radius: 11 },
  messaging: { label: "Messaging", kind: "desktop", src: "/covault/messaging-browser.png", width: 1800, height: 1027, radius: 13 },
  events: { label: "Events", kind: "desktop", src: "/covault/events-browser.png", width: 1800, height: 1026, radius: 11 },
  "admin-governance": { label: "Admin Governance", kind: "desktop", src: "/covault/admin-browser.png", width: 1800, height: 1026, radius: 12 },
};

export const SPEC_GRID = [
  { key: "Scope & Isolation", value: "Multi-Tenant Institution_ID" },
  { key: "Access Control", value: "3-Tier RBAC (Student • Faculty • Admin)" },
  { key: "Deployment", value: "Cross-Platform (Web + Mobile Sync)" },
];

export const WORKFLOW = [
  {
    index: "01",
    title: "Context-First Launch & Onboarding",
    summary:
      "A session token is checked before anything renders. Sign-up accepts the institution’s email domain only, binds the account to its Institution_ID, and attaches the user to their subject groups in the same step.",
    chips: ["Session token validation", "Institutional email domain", "Automatic Institution_ID binding", "Subject-group attachment"],
    diagram: "states" as const,
  },
  {
    index: "02",
    title: "Resource Upload & Social Propagation",
    summary:
      "Each upload carries metadata tags and one of three visibility levels. The write is recorded in an immutable audit log, then fanned out to the uploader’s Profile, the Subject Group and the Home Feed in real time.",
    chips: ["Metadata tagging", "Private / Group / Institution", "Immutable audit logging", "Real-time feed distribution"],
    diagram: "propagation" as const,
  },
  {
    index: "03",
    title: "Academic Micro-Ecosystems",
    summary:
      "Communities for Classes, Subjects and Clubs, either open or approval-gated. Direct messages and group threads stay inside the institution boundary; there is no cross-campus inbox.",
    chips: ["Open communities", "Approval-gated communities", "Institution-locked DMs", "Group discussion threads"],
    diagram: "communities" as const,
  },
  {
    index: "04",
    title: "Event Discovery & Deep-Linked Alerts",
    summary:
      "Faculty and admins host campus events with one-tap registration. Push and WebSocket notifications deep-link to the exact screen rather than the app’s home.",
    chips: ["Faculty/Admin hosted", "1-tap registration", "Push + WebSocket", "Deep links to target screen"],
    diagram: "events" as const,
  },
];

// `tab` is the shorter label the hero switcher uses when the title is too long for a pill.
export const MODULES: {
  index: string;
  title: string;
  tab?: string;
  text: string;
  screen: ScreenId;
  specs: string[];
}[] = [
  {
    index: "01",
    title: "Home Feed",
    text: "Chronological, permission-filtered discovery stream across followed peers, joined groups and campus announcements.",
    screen: "home-feed",
    specs: ["Chronological order", "Permission-filtered per viewer", "Peers + groups + announcements"],
  },
  {
    index: "02",
    title: "Resource Vault",
    text: "Subject-filtered academic repository with Faculty Verification badges and time-limited signed URLs.",
    screen: "resource-vault",
    specs: ["Subject filters", "Faculty Verification badge", "Expiring signed URLs"],
  },
  {
    index: "03",
    title: "Communities",
    text: "Self-contained academic micro-ecosystems for courses, labs and student clubs with admin approval queues.",
    screen: "communities",
    specs: ["Courses, labs, clubs", "Open or approval-gated", "Admin approval queue"],
  },
  {
    index: "04",
    title: "Messaging",
    text: "Real-time 1:1 and group discussions sandboxed within the university boundary (institution_id).",
    screen: "messaging",
    specs: ["1:1 and group threads", "Real-time delivery", "Sandboxed by institution_id"],
  },
  {
    index: "05",
    title: "Campus Events",
    text: "End-to-end event hosting, registration tracking and automated reminder triggers.",
    screen: "events",
    specs: ["Hosting + registration", "Attendance tracking", "Automated reminders"],
  },
  {
    index: "06",
    title: "Role-Based Governance",
    tab: "Governance",
    text: "Adaptive UI that surfaces Student creation tools, Faculty verification powers and Admin audit panels progressively.",
    screen: "admin-governance",
    specs: ["Student: create + share", "Faculty: verify + pin", "Admin: audit + soft-delete"],
  },
];

export const PIPELINE = [
  { step: "Client Request", note: "HTTPS, tenant header" },
  { step: "JWT Signature & Expiry", note: "reject stale or forged tokens" },
  { step: "RBAC Policy Matrix", note: "role × action lookup" },
  { step: "Institution & Group Boundary Check", note: "institution_id, group membership" },
  { step: "Service Execution", note: "scoped query, signed URL" },
  { step: "Immutable Audit Log", note: "before / after snapshots" },
];

export const PILLARS = [
  {
    title: "Signed Temporary Storage URLs",
    text: "Raw object storage paths are never exposed; every download generates an expiring signed URL.",
    code: "GET /vault/:id → signed_url(expires_at)",
  },
  {
    title: "Zero-Leakage Indexed Search",
    text: "Queries sanitize inputs and enforce institution_id, role and group membership filters at the database layer.",
    code: "WHERE institution_id = :tenant AND group_id IN (:member_of)",
  },
  {
    title: "Soft-Delete & Immutable Audit Trail",
    text: "Admin actions and deletions (is_deleted = TRUE) record before_state and after_state snapshots for institutional compliance.",
    code: "audit(before_state, after_state, actor, ts)",
  },
  {
    title: "Horizontal Multi-Institution Sharding",
    text: "Every database entity is partitioned by institution_id, so a single-department pilot and a multi-university consortium run the same schema with graceful degradation per shard.",
    code: "shard = hash(institution_id) mod N",
  },
];

export const THESIS = [
  {
    index: "01",
    title: "Institutional Memory Compounding",
    text: "Faculty-verified notes, past papers and project archives stay indexed across graduating cohorts, so the vault is worth more every year the university stays.",
  },
  {
    index: "02",
    title: "AI Semantic Academic Indexing",
    tag: "Roadmap",
    text: "Automated syllabus and topic tagging plus context-aware Q&A trained strictly on an institution’s verified vault, with zero external data leakage.",
  },
  {
    index: "03",
    title: "Predictable B2B Campus SaaS Model",
    text: "Land-and-expand pricing: Department Pilots → University-Wide Seat Licenses → Multi-Campus Analytics.",
  },
  {
    index: "04",
    title: "Deans’ Engagement & Resource Analytics",
    text: "Privacy-safe telemetry on study-group velocity, top-cited faculty resources and event turnout, aggregated per institution.",
  },
];

// Written from the four roles CoVault serves. These are illustrative perspectives, not quotes
// from named customers; the section labels them as such. Replace with real quotes as pilots close.
export const PERSPECTIVES = [
  {
    id: "dean",
    initial: "D",
    role: "University Dean / Administrator",
    text: "I can answer an audit question in minutes: who uploaded this, who verified it, who downloaded it, and when. There are no public links to chase down, and every club and department runs under the same governance model.",
  },
  {
    id: "faculty",
    initial: "F",
    role: "Department Professor / Faculty",
    text: "I verify the official problem set once. It carries the badge in the Resource Vault, lands in the subject feed, and the stream of emails and WhatsApp forwards asking for it stops.",
  },
  {
    id: "student",
    initial: "S",
    role: "Computer Science Student Lead",
    text: "Past papers a professor has actually verified, the robotics club’s channel and registration for Thursday’s talk are a few taps apart in one app, instead of three apps and a Drive link somebody deleted.",
  },
  {
    id: "investor",
    initial: "I",
    role: "EdTech / SaaS Investor Perspective",
    text: "Tenancy is enforced at the data layer by institution_id, so each new university is a shard, not a fork. Usage is tied to weekly coursework, and the vault compounds with every cohort, which is the lock-in a campus SaaS needs.",
  },
];

export const FOOTER_GRID: { key: string; lines: { text: string; href?: string }[] }[] = [
  {
    key: "Founder",
    lines: [{ text: "Gouresh Vernekar", href: "/" }, { text: "gxvrnkr.com", href: "/" }],
  },
  {
    key: "Architecture",
    lines: [{ text: "Multi-Tenant Cloud" }, { text: "RBAC" }, { text: "Signed Storage" }],
  },
  {
    key: "Pitch & Demo",
    lines: [
      { text: "Interactive Prototype", href: "#workflow" },
      { text: "Technical Deck (on request)", href: WALKTHROUGH_HREF },
    ],
  },
  {
    key: "Navigation",
    lines: [
      { text: "Portfolio (gxvrnkr.com)", href: "/" },
      { text: "Overview", href: "#overview" },
      { text: "Workflow", href: "#workflow" },
      { text: "Architecture", href: "#architecture" },
    ],
  },
];
