export type HealthStatus = "healthy" | "degraded" | "critical" | "disabled";
export type Severity = "low" | "medium" | "high" | "critical";
export type AlertStatus = "new" | "investigating" | "resolved";
export type ProjectStatus = "protected" | "monitoring" | "at-risk";

export interface LayerHealth {
  layerId: string;
  status: HealthStatus;
  uptime: string;
  latency: string;
  signalQuality: number;
}

export interface SecurityLayer {
  id: string;
  name: string;
  description: string;
  category: string;
  healthStatus: HealthStatus;
  enabled: boolean;
  severity: Severity;
  plan: "Starter" | "Growth" | "Enterprise";
  detects: string[];
  configurationPreview: string[];
  recentDetections: Array<{
    id: string;
    title: string;
    endpoint: string;
    timestamp: string;
    severity: Severity;
  }>;
}

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  environment: "Production" | "Staging" | "Preview";
  sdkConnected: boolean;
  eventsCount: number;
  activeLayersCount: number;
  riskScore: number;
  lastSeen: string;
  apiKeyPreview: string;
  primaryEndpoint: string;
}

export interface SecurityEvent {
  id: string;
  severity: Severity;
  type: string;
  projectId: string;
  projectName: string;
  layerId: string;
  layerName: string;
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  timestamp: string;
  description: string;
}

export interface Alert {
  id: string;
  title: string;
  severity: Severity;
  status: AlertStatus;
  sourceLayerId: string;
  sourceLayerName: string;
  projectId: string;
  projectName: string;
  timestamp: string;
  summary: string;
}

export interface AnalyticsPoint {
  label: string;
  value: number;
}

export interface ApiKeyRecord {
  id: string;
  name: string;
  maskedKey: string;
  projectId: string;
  projectName: string;
  createdDate: string;
  lastUsed: string;
  status: "active" | "rotating" | "revoked";
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  status: "active" | "pending";
}

export interface DashboardAnalytics {
  securityScore: number;
  totalEvents: number;
  criticalAlerts: number;
  activeLayers: number;
  healthyLayers: number;
  riskTrend: AnalyticsPoint[];
  eventsOverTime: AnalyticsPoint[];
  piiLeakTrend: AnalyticsPoint[];
  endpointRiskRanking: Array<{
    endpoint: string;
    risk: number;
    events: number;
  }>;
  layerPerformance: Array<{
    layerId: string;
    layerName: string;
    blocked: number;
    falsePositives: number;
    latency: string;
  }>;
  securityScoreBreakdown: Array<{
    label: string;
    score: number;
  }>;
}

export const projects: Project[] = [
  {
    id: "atlas-pay",
    name: "Atlas Pay",
    status: "protected",
    environment: "Production",
    sdkConnected: true,
    eventsCount: 8421,
    activeLayersCount: 8,
    riskScore: 24,
    lastSeen: "2 min ago",
    apiKeyPreview: "sl_live_atlas_••••8D2A",
    primaryEndpoint: "/v1/payments/charge",
  },
  {
    id: "vector-id",
    name: "Vector Identity",
    status: "monitoring",
    environment: "Staging",
    sdkConnected: true,
    eventsCount: 3198,
    activeLayersCount: 6,
    riskScore: 41,
    lastSeen: "8 min ago",
    apiKeyPreview: "sl_live_vector_••••4K7P",
    primaryEndpoint: "/v2/auth/session",
  },
  {
    id: "relay-graph",
    name: "Relay Graph",
    status: "at-risk",
    environment: "Production",
    sdkConnected: false,
    eventsCount: 1264,
    activeLayersCount: 4,
    riskScore: 68,
    lastSeen: "26 min ago",
    apiKeyPreview: "sl_live_relay_••••9T1M",
    primaryEndpoint: "/graphql",
  },
  {
    id: "northstar-core",
    name: "Northstar Core",
    status: "protected",
    environment: "Preview",
    sdkConnected: true,
    eventsCount: 918,
    activeLayersCount: 5,
    riskScore: 17,
    lastSeen: "1 hour ago",
    apiKeyPreview: "sl_live_north_••••2H9R",
    primaryEndpoint: "/internal/hooks/dispatch",
  },
];

export const securityLayers: SecurityLayer[] = [
  {
    id: "pii-detection-layer",
    name: "PII Detection Layer",
    description: "Inspects payloads and responses for exposed personally identifiable information.",
    category: "Data Protection",
    healthStatus: "healthy",
    enabled: true,
    severity: "critical",
    plan: "Enterprise",
    detects: ["Emails in response bodies", "Raw customer records", "National ID patterns"],
    configurationPreview: ["redactionMode: strict", "sampling: 100%", "notifyOnExposure: true"],
    recentDetections: [
      { id: "det-101", title: "Email leakage on export endpoint", endpoint: "/v1/customers/export", timestamp: "10m ago", severity: "high" },
      { id: "det-102", title: "Phone number burst in audit logs", endpoint: "/v1/audit/logs", timestamp: "38m ago", severity: "medium" },
    ],
  },
  {
    id: "auth-guard-layer",
    name: "Auth Guard Layer",
    description: "Detects missing auth checks, weak session handling, and permission drift.",
    category: "Identity",
    healthStatus: "healthy",
    enabled: true,
    severity: "critical",
    plan: "Growth",
    detects: ["Unauthenticated access paths", "Permission bypass patterns", "Expired token reuse"],
    configurationPreview: ["enforceScopes: true", "sessionReplayWindow: 60s", "trustedIssuers: 2"],
    recentDetections: [
      { id: "det-103", title: "Scope mismatch on admin route", endpoint: "/v2/admin/users", timestamp: "18m ago", severity: "critical" },
      { id: "det-104", title: "Session token reused from new origin", endpoint: "/v2/auth/session", timestamp: "1h ago", severity: "high" },
    ],
  },
  {
    id: "rate-limit-layer",
    name: "Rate Limit Layer",
    description: "Flags burst traffic, scraping behavior, and endpoint abuse before saturation.",
    category: "Traffic Control",
    healthStatus: "healthy",
    enabled: true,
    severity: "high",
    plan: "Starter",
    detects: ["Burst traffic", "Credential stuffing cadence", "IP rotation anomalies"],
    configurationPreview: ["window: 60s", "burstThreshold: 240", "blockDuration: 10m"],
    recentDetections: [
      { id: "det-105", title: "Burst traffic on login route", endpoint: "/v1/login", timestamp: "22m ago", severity: "high" },
      { id: "det-106", title: "Scraping cadence on search", endpoint: "/v1/search", timestamp: "2h ago", severity: "medium" },
    ],
  },
  {
    id: "payload-scanner-layer",
    name: "Payload Scanner Layer",
    description: "Screens request bodies for injection signatures and dangerous payload markers.",
    category: "Payload Security",
    healthStatus: "degraded",
    enabled: true,
    severity: "high",
    plan: "Growth",
    detects: ["SQL fragments", "Template injection tokens", "Binary payload anomalies"],
    configurationPreview: ["scanDepth: recursive", "blockOnCritical: true", "allowlistedPaths: 3"],
    recentDetections: [
      { id: "det-107", title: "Template injection token found", endpoint: "/v1/templates/render", timestamp: "12m ago", severity: "critical" },
      { id: "det-108", title: "Encoded query payload spike", endpoint: "/v1/import", timestamp: "3h ago", severity: "medium" },
    ],
  },
  {
    id: "token-leak-layer",
    name: "Token Leak Layer",
    description: "Watches for secrets, bearer tokens, and private keys crossing unsafe boundaries.",
    category: "Secrets",
    healthStatus: "healthy",
    enabled: true,
    severity: "critical",
    plan: "Enterprise",
    detects: ["Bearer tokens in logs", "Private keys in responses", "Webhook secret exposure"],
    configurationPreview: ["revokeOnDetection: false", "logScrubbing: enabled", "tokenFingerprinting: enabled"],
    recentDetections: [
      { id: "det-109", title: "Bearer token in debug payload", endpoint: "/internal/debug/trace", timestamp: "47m ago", severity: "critical" },
      { id: "det-110", title: "Secret echoed in webhook response", endpoint: "/webhooks/provider", timestamp: "4h ago", severity: "high" },
    ],
  },
  {
    id: "cors-misconfig-layer",
    name: "CORS Misconfig Layer",
    description: "Finds wildcard origins, credential leakage, and cross-origin misconfigurations.",
    category: "Edge Security",
    healthStatus: "critical",
    enabled: false,
    severity: "medium",
    plan: "Starter",
    detects: ["Wildcard origins", "Credentials with broad origins", "Unsafe preflight allowances"],
    configurationPreview: ["allowedOrigins: explicit", "credentials: review", "preflightCache: 5m"],
    recentDetections: [
      { id: "det-111", title: "Wildcard origin on preview API", endpoint: "/preview/graphql", timestamp: "1d ago", severity: "high" },
      { id: "det-112", title: "Credentialed cross-site request", endpoint: "/v1/session/refresh", timestamp: "2d ago", severity: "medium" },
    ],
  },
  {
    id: "header-security-layer",
    name: "Header Security Layer",
    description: "Validates security-critical headers and policy consistency across services.",
    category: "Transport",
    healthStatus: "healthy",
    enabled: true,
    severity: "medium",
    plan: "Starter",
    detects: ["Missing CSP", "Weak cache directives", "Conflicting HSTS settings"],
    configurationPreview: ["requiredHeaders: 7", "strictTransportSecurity: 1y", "cspMode: report-only"],
    recentDetections: [
      { id: "det-113", title: "CSP missing on docs domain", endpoint: "/docs", timestamp: "6h ago", severity: "medium" },
      { id: "det-114", title: "Weak caching on auth callback", endpoint: "/auth/callback", timestamp: "10h ago", severity: "low" },
    ],
  },
  {
    id: "endpoint-risk-layer",
    name: "Endpoint Risk Layer",
    description: "Ranks endpoints by attack pressure, weakness density, and exploitability signals.",
    category: "Risk Modeling",
    healthStatus: "healthy",
    enabled: true,
    severity: "high",
    plan: "Growth",
    detects: ["High-risk endpoint clusters", "Route drift", "Repeated exploit attempts"],
    configurationPreview: ["scoreWindow: 24h", "weightExploitSignals: high", "segmentByProject: true"],
    recentDetections: [
      { id: "det-115", title: "GraphQL mutation risk increased", endpoint: "/graphql", timestamp: "29m ago", severity: "high" },
      { id: "det-116", title: "Payment endpoint entering watchlist", endpoint: "/v1/payments/charge", timestamp: "2h ago", severity: "medium" },
    ],
  },
  {
    id: "data-masking-layer",
    name: "Data Masking Layer",
    description: "Masks sensitive fields before they leave application trust boundaries.",
    category: "Data Protection",
    healthStatus: "degraded",
    enabled: true,
    severity: "medium",
    plan: "Growth",
    detects: ["Unmasked account IDs", "PII in observability output", "Leak-prone export formats"],
    configurationPreview: ["maskingPolicy: finance-default", "responseMutations: enabled", "maskLogs: true"],
    recentDetections: [
      { id: "det-117", title: "Account ID exposed in audit response", endpoint: "/v1/audit/exports", timestamp: "52m ago", severity: "high" },
      { id: "det-118", title: "Masking bypass on internal trace", endpoint: "/internal/trace", timestamp: "5h ago", severity: "medium" },
    ],
  },
  {
    id: "anomaly-detection-layer",
    name: "Anomaly Detection Layer",
    description: "Learns request baselines and surfaces outliers in behavior, origin, and payload shape.",
    category: "Behavioral Security",
    healthStatus: "healthy",
    enabled: true,
    severity: "high",
    plan: "Enterprise",
    detects: ["Origin drift", "Payload entropy spikes", "Modelled request outliers"],
    configurationPreview: ["warmupWindow: 7d", "sensitivity: balanced", "geoSignals: enabled"],
    recentDetections: [
      { id: "det-119", title: "Unusual origin pattern in staging", endpoint: "/v2/auth/session", timestamp: "14m ago", severity: "medium" },
      { id: "det-120", title: "Payload entropy spike on uploads", endpoint: "/v1/import", timestamp: "7h ago", severity: "low" },
    ],
  },
];

export const securityEvents: SecurityEvent[] = [
  {
    id: "evt-1",
    severity: "critical",
    type: "Token exposure",
    projectId: "atlas-pay",
    projectName: "Atlas Pay",
    layerId: "token-leak-layer",
    layerName: "Token Leak Layer",
    endpoint: "/internal/debug/trace",
    method: "POST",
    timestamp: "2026-04-24 15:41 IST",
    description: "Bearer token surfaced in debug payload mirror.",
  },
  {
    id: "evt-2",
    severity: "high",
    type: "Scope bypass",
    projectId: "vector-id",
    projectName: "Vector Identity",
    layerId: "auth-guard-layer",
    layerName: "Auth Guard Layer",
    endpoint: "/v2/admin/users",
    method: "GET",
    timestamp: "2026-04-24 15:28 IST",
    description: "Admin route returned data with downgraded scope token.",
  },
  {
    id: "evt-3",
    severity: "high",
    type: "Injection attempt",
    projectId: "relay-graph",
    projectName: "Relay Graph",
    layerId: "payload-scanner-layer",
    layerName: "Payload Scanner Layer",
    endpoint: "/graphql",
    method: "POST",
    timestamp: "2026-04-24 15:12 IST",
    description: "Templating tokens and encoded fragments detected in mutation body.",
  },
  {
    id: "evt-4",
    severity: "medium",
    type: "PII drift",
    projectId: "atlas-pay",
    projectName: "Atlas Pay",
    layerId: "pii-detection-layer",
    layerName: "PII Detection Layer",
    endpoint: "/v1/customers/export",
    method: "GET",
    timestamp: "2026-04-24 14:53 IST",
    description: "Email addresses appeared in export response beyond expected schema.",
  },
  {
    id: "evt-5",
    severity: "medium",
    type: "Rate anomaly",
    projectId: "vector-id",
    projectName: "Vector Identity",
    layerId: "rate-limit-layer",
    layerName: "Rate Limit Layer",
    endpoint: "/v1/login",
    method: "POST",
    timestamp: "2026-04-24 14:29 IST",
    description: "Burst login traffic crossed automated abuse threshold.",
  },
  {
    id: "evt-6",
    severity: "low",
    type: "Header drift",
    projectId: "northstar-core",
    projectName: "Northstar Core",
    layerId: "header-security-layer",
    layerName: "Header Security Layer",
    endpoint: "/docs",
    method: "GET",
    timestamp: "2026-04-24 13:55 IST",
    description: "CSP missing from static docs host after deployment.",
  },
  {
    id: "evt-7",
    severity: "high",
    type: "Endpoint risk increase",
    projectId: "relay-graph",
    projectName: "Relay Graph",
    layerId: "endpoint-risk-layer",
    layerName: "Endpoint Risk Layer",
    endpoint: "/graphql",
    method: "POST",
    timestamp: "2026-04-24 13:42 IST",
    description: "GraphQL mutation cluster entered high-risk band.",
  },
  {
    id: "evt-8",
    severity: "critical",
    type: "Credential reuse",
    projectId: "vector-id",
    projectName: "Vector Identity",
    layerId: "auth-guard-layer",
    layerName: "Auth Guard Layer",
    endpoint: "/v2/auth/session",
    method: "POST",
    timestamp: "2026-04-24 12:58 IST",
    description: "Expired token replayed from a new origin fingerprint.",
  },
];

export const alerts: Alert[] = [
  {
    id: "alt-1",
    title: "Critical secret exposure detected",
    severity: "critical",
    status: "new",
    sourceLayerId: "token-leak-layer",
    sourceLayerName: "Token Leak Layer",
    projectId: "atlas-pay",
    projectName: "Atlas Pay",
    timestamp: "7 min ago",
    summary: "A bearer token was observed in mirrored debug output.",
  },
  {
    id: "alt-2",
    title: "Admin scope validation failed",
    severity: "high",
    status: "investigating",
    sourceLayerId: "auth-guard-layer",
    sourceLayerName: "Auth Guard Layer",
    projectId: "vector-id",
    projectName: "Vector Identity",
    timestamp: "20 min ago",
    summary: "A route accepted a downgraded token with elevated access.",
  },
  {
    id: "alt-3",
    title: "Payload scanner operating in degraded mode",
    severity: "medium",
    status: "new",
    sourceLayerId: "payload-scanner-layer",
    sourceLayerName: "Payload Scanner Layer",
    projectId: "relay-graph",
    projectName: "Relay Graph",
    timestamp: "53 min ago",
    summary: "Signature queue latency exceeded the target service envelope.",
  },
  {
    id: "alt-4",
    title: "CORS layer disabled on preview service",
    severity: "medium",
    status: "resolved",
    sourceLayerId: "cors-misconfig-layer",
    sourceLayerName: "CORS Misconfig Layer",
    projectId: "northstar-core",
    projectName: "Northstar Core",
    timestamp: "3 h ago",
    summary: "Origin policy review completed after wildcard access surfaced in preview.",
  },
];

export const apiKeys: ApiKeyRecord[] = [
  {
    id: "key-1",
    name: "Atlas Production",
    maskedKey: "sl_live_atlas_••••8D2A",
    projectId: "atlas-pay",
    projectName: "Atlas Pay",
    createdDate: "2026-02-12",
    lastUsed: "2 min ago",
    status: "active",
  },
  {
    id: "key-2",
    name: "Vector Staging",
    maskedKey: "sl_live_vector_••••4K7P",
    projectId: "vector-id",
    projectName: "Vector Identity",
    createdDate: "2026-03-03",
    lastUsed: "8 min ago",
    status: "active",
  },
  {
    id: "key-3",
    name: "Relay Rotation Candidate",
    maskedKey: "sl_live_relay_••••9T1M",
    projectId: "relay-graph",
    projectName: "Relay Graph",
    createdDate: "2026-04-01",
    lastUsed: "1 day ago",
    status: "rotating",
  },
  {
    id: "key-4",
    name: "Northstar Legacy",
    maskedKey: "sl_live_north_••••2H9R",
    projectId: "northstar-core",
    projectName: "Northstar Core",
    createdDate: "2026-01-19",
    lastUsed: "12 days ago",
    status: "revoked",
  },
];

export const layerHealthStatuses: LayerHealth[] = securityLayers.map((layer, index) => ({
  layerId: layer.id,
  status: layer.healthStatus,
  uptime: ["99.98%", "99.93%", "98.72%", "100.00%"][index % 4]!,
  latency: ["24 ms", "33 ms", "81 ms", "19 ms"][index % 4]!,
  signalQuality: [97, 93, 78, 99][index % 4]!,
}));

export const analytics: DashboardAnalytics = {
  securityScore: 82,
  totalEvents: 13801,
  criticalAlerts: 3,
  activeLayers: securityLayers.filter((layer) => layer.enabled).length,
  healthyLayers: securityLayers.filter((layer) => layer.healthStatus === "healthy").length,
  riskTrend: [
    { label: "Mon", value: 42 },
    { label: "Tue", value: 48 },
    { label: "Wed", value: 44 },
    { label: "Thu", value: 39 },
    { label: "Fri", value: 34 },
    { label: "Sat", value: 29 },
    { label: "Sun", value: 32 },
  ],
  eventsOverTime: [
    { label: "00:00", value: 42 },
    { label: "04:00", value: 76 },
    { label: "08:00", value: 123 },
    { label: "12:00", value: 214 },
    { label: "16:00", value: 167 },
    { label: "20:00", value: 94 },
  ],
  piiLeakTrend: [
    { label: "W1", value: 7 },
    { label: "W2", value: 5 },
    { label: "W3", value: 4 },
    { label: "W4", value: 2 },
  ],
  endpointRiskRanking: [
    { endpoint: "/graphql", risk: 91, events: 312 },
    { endpoint: "/v1/payments/charge", risk: 82, events: 227 },
    { endpoint: "/v2/admin/users", risk: 79, events: 81 },
    { endpoint: "/v1/customers/export", risk: 72, events: 53 },
    { endpoint: "/internal/debug/trace", risk: 68, events: 29 },
  ],
  layerPerformance: [
    { layerId: "auth-guard-layer", layerName: "Auth Guard Layer", blocked: 221, falsePositives: 5, latency: "18 ms" },
    { layerId: "payload-scanner-layer", layerName: "Payload Scanner Layer", blocked: 147, falsePositives: 9, latency: "51 ms" },
    { layerId: "rate-limit-layer", layerName: "Rate Limit Layer", blocked: 406, falsePositives: 12, latency: "11 ms" },
    { layerId: "token-leak-layer", layerName: "Token Leak Layer", blocked: 63, falsePositives: 1, latency: "27 ms" },
  ],
  securityScoreBreakdown: [
    { label: "Traffic control", score: 88 },
    { label: "Identity checks", score: 79 },
    { label: "Data protection", score: 84 },
    { label: "Secrets hygiene", score: 73 },
  ],
};

export const teamMembers: TeamMember[] = [
  { id: "tm-1", name: "Aditi Rao", role: "Security Engineer", email: "aditi@breachsense.dev", status: "active" },
  { id: "tm-2", name: "Mika Chen", role: "Platform Lead", email: "mika@breachsense.dev", status: "active" },
  { id: "tm-3", name: "Jonas Reed", role: "SRE", email: "jonas@breachsense.dev", status: "pending" },
];

export const implementationChecklist = [
  "Install the SDK in your API service",
  "Provision a project-scoped API key",
  "Set SECURE_LAYER_API_KEY and SECURE_LAYER_PROJECT_ID",
  "Attach middleware before core route handlers",
  "Send a verification request and review the event stream",
];

export function getProjectById(projectId: string) {
  return projects.find((project) => project.id === projectId);
}

export function getLayerById(layerId: string) {
  return securityLayers.find((layer) => layer.id === layerId);
}

export function getEventsForProject(projectId: string) {
  return securityEvents.filter((event) => event.projectId === projectId);
}

export function getLayerHealth(layerId: string) {
  return layerHealthStatuses.find((entry) => entry.layerId === layerId);
}
