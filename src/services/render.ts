import {
  auditStream,
  consentLane,
  policyCoverage,
  revocationPosture,
  summary,
  verification
} from "./patientConsentService";

function layout(title: string, body: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <style>
    :root {
      --bg: #eef3f4;
      --paper: #fbfdfd;
      --ink: #15272b;
      --muted: #5c7177;
      --border: #cfe0e2;
      --accent: #0f766e;
      --accent-2: #2563eb;
      --yellow: #a16207;
      --red: #b91c1c;
      --green: #166534;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: linear-gradient(180deg, #e8f0f1 0%, #f7fbfb 100%);
      color: var(--ink);
      font-family: Georgia, "Times New Roman", serif;
    }
    .shell {
      max-width: 1380px;
      margin: 0 auto;
      padding: 28px;
    }
    .topbar, .card, .table-wrap {
      background: rgba(251, 253, 253, 0.95);
      border: 1px solid var(--border);
      border-radius: 18px;
      box-shadow: 0 16px 40px rgba(21, 39, 43, 0.08);
    }
    .topbar {
      padding: 18px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }
    .brand {
      display: flex;
      gap: 14px;
      align-items: center;
    }
    .badge {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: linear-gradient(135deg, var(--accent), var(--accent-2));
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font: 700 16px/1 Arial, sans-serif;
    }
    .eyebrow {
      font: 600 11px/1.4 Arial, sans-serif;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--accent);
      margin-bottom: 4px;
    }
    .brand h1 {
      margin: 0;
      font: 700 28px/1.1 Arial, sans-serif;
    }
    .brand p {
      margin: 3px 0 0;
      color: var(--muted);
      font: 14px/1.5 Arial, sans-serif;
    }
    nav a {
      text-decoration: none;
      color: var(--muted);
      font: 600 13px/1 Arial, sans-serif;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-left: 16px;
    }
    nav a.active, nav a:hover { color: var(--ink); }
    .hero {
      display: grid;
      grid-template-columns: 1.6fr 1fr;
      gap: 22px;
      margin-bottom: 22px;
    }
    .card { padding: 24px; }
    .hero h2 {
      margin: 8px 0 10px;
      font: 700 54px/0.98 Georgia, serif;
      letter-spacing: -0.03em;
    }
    .hero p,
    .section p {
      color: var(--muted);
      font: 18px/1.6 Arial, sans-serif;
      margin: 0 0 18px;
    }
    .stat-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 16px;
      margin-top: 16px;
    }
    .stat {
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 16px;
      background: rgba(255,255,255,0.56);
    }
    .stat label {
      display: block;
      color: var(--muted);
      font: 700 11px/1.4 Arial, sans-serif;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    .stat strong {
      display: block;
      font: 700 40px/1 Arial, sans-serif;
      margin-bottom: 8px;
    }
    .stat span {
      display: block;
      color: var(--muted);
      font: 13px/1.5 Arial, sans-serif;
    }
    .section-grid {
      display: grid;
      grid-template-columns: 1.3fr 1fr;
      gap: 22px;
      margin-bottom: 22px;
    }
    .right-panel h3, .section h3 {
      margin: 0 0 12px;
      font: 700 20px/1.2 Arial, sans-serif;
    }
    .list {
      display: grid;
      gap: 12px;
    }
    .item {
      border-top: 1px solid var(--border);
      padding-top: 12px;
    }
    .item:first-child {
      border-top: 0;
      padding-top: 0;
    }
    .item strong {
      display: block;
      font: 700 15px/1.4 Arial, sans-serif;
      margin-bottom: 4px;
    }
    .item p, .item span {
      color: var(--muted);
      font: 13px/1.6 Arial, sans-serif;
      margin: 0;
    }
    .table-wrap {
      padding: 14px 18px 18px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font: 14px/1.5 Arial, sans-serif;
    }
    th, td {
      text-align: left;
      padding: 14px 10px;
      border-bottom: 1px solid var(--border);
      vertical-align: top;
    }
    th {
      color: var(--muted);
      font: 700 11px/1.4 Arial, sans-serif;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }
    .tag {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 999px;
      font: 700 11px/1 Arial, sans-serif;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      background: #e5f3f1;
      color: var(--accent);
    }
    .tag.watch, .tag.yellow { background: #fdf1db; color: var(--yellow); }
    .tag.critical, .tag.red { background: #fee5e5; color: var(--red); }
    .tag.green { background: #e7f7ec; color: var(--green); }
    .footer-note {
      margin-top: 12px;
      color: var(--muted);
      font: 13px/1.6 Arial, sans-serif;
    }
    .card-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 18px;
    }
    @media (max-width: 980px) {
      .hero, .section-grid, .card-grid { grid-template-columns: 1fr; }
      .stat-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      nav { display: none; }
    }
  </style>
</head>
<body>
  <div class="shell">
    ${body}
  </div>
</body>
</html>`;
}

function topbar(active: string) {
  const links = [
    { href: "/", label: "Overview" },
    { href: "/consent-lane", label: "Consent Lane" },
    { href: "/audit-stream", label: "Audit Stream" },
    { href: "/revocation-posture", label: "Revocation Posture" },
    { href: "/verification", label: "Verification" },
    { href: "/docs", label: "Docs" }
  ];

  return `<div class="topbar">
    <div class="brand">
      <div class="badge">KG</div>
      <div>
        <div class="eyebrow">Patient Consent Audit Stream</div>
        <h1>Consent, revocation, and audit control plane</h1>
        <p>Consent capture, policy versions, revocation events, and downstream reset blockers in one operator surface.</p>
      </div>
    </div>
    <nav>${links
      .map((link) => `<a class="${active === link.href ? "active" : ""}" href="${link.href}">${link.label}</a>`)
      .join("")}</nav>
  </div>`;
}

function riskClass(value: string) {
  return value.toLowerCase();
}

function readinessClass(value: string) {
  if (value === "green") return "green";
  if (value === "yellow") return "yellow";
  return "red";
}

export function renderOverview() {
  const stats = summary();
  const consents = consentLane();
  const programs = policyCoverage();
  const events = auditStream();

  return layout(
    "Patient Consent Audit Stream",
    `${topbar("/")}
    <div class="hero">
      <div class="card">
        <div class="eyebrow">Digital Health / MedTech</div>
        <h2>Consent only counts when the policy version and downstream audit trail stay in sync.</h2>
        <p>This control plane makes consent pressure, policy drift, revocation blockers, and downstream reset risk visible before stale state turns into audit exposure or patient-trust damage.</p>
        <div class="stat-grid">
          <div class="stat"><label>Consents</label><strong>${stats.consentCount}</strong><span>Active consent records modeled through version and audit pressure.</span></div>
          <div class="stat"><label>Active Policies</label><strong>${stats.activePolicies}</strong><span>Current policy versions represented across programs.</span></div>
          <div class="stat"><label>Revocation Risk</label><strong>${stats.revocationRisk}</strong><span>Consent records that still carry watch or critical pressure.</span></div>
          <div class="stat"><label>Blocked Audits</label><strong>${stats.blockedAudits}</strong><span>Revocation packets that still have reset or completeness blockers.</span></div>
        </div>
      </div>
      <div class="card right-panel">
        <div class="eyebrow">Operating Recommendation</div>
        <h3>${stats.recommendation}</h3>
        <div class="list">
          ${consents
            .slice(0, 3)
            .map(
              (item) => `<div class="item"><strong>${item.program} · ${item.consentId}</strong><p>${item.policyVersion}</p><span>${item.lastEventDays} days since event · ${item.nextAction}</span></div>`
            )
            .join("")}
        </div>
      </div>
    </div>
    <div class="section-grid">
      <div class="table-wrap section">
        <div class="eyebrow">Consent Queue</div>
        <h3>Which consent records are most likely to create audit trouble next.</h3>
        <table>
          <thead><tr><th>Consent</th><th>Channel</th><th>Owner</th><th>Days Since Event</th><th>Risk</th></tr></thead>
          <tbody>
            ${consents
              .map(
                (item) => `<tr><td><strong>${item.program}</strong><br />${item.consentId}<br />${item.policyVersion}</td><td>${item.channel}</td><td>${item.owner}</td><td>${item.lastEventDays}</td><td><span class="tag ${riskClass(item.risk)}">${item.risk}</span></td></tr>`
              )
              .join("")}
          </tbody>
        </table>
      </div>
      <div class="card section">
        <div class="eyebrow">Program Coverage</div>
        <h3>Where consent pressure is concentrated.</h3>
        <div class="list">
          ${programs
            .map(
              (item) => `<div class="item"><strong>${item.program}</strong><span>${item.consentCount} modeled consent${item.consentCount === 1 ? "" : "s"} in this program.</span></div>`
            )
            .join("")}
        </div>
      </div>
    </div>
    <div class="card section">
      <div class="eyebrow">Audit Stream</div>
      <h3>Trust comes from proving what happened after consent changed, not from saying consent was captured.</h3>
      <div class="card-grid">
        ${events
          .map(
            (item) => `<div class="stat"><label>${item.eventType}</label><strong style="font-size: 24px;">${item.impactArea}</strong><span>${item.eventTitle} → ${item.targetEvidence}</span><div class="footer-note"><span class="tag ${readinessClass(item.readiness)}">${item.readiness}</span> · ${item.owner} · ${item.blocker}</div></div>`
          )
          .join("")}
      </div>
      <div class="footer-note">The buyer value is not generic compliance posture. It is knowing which consent version governs the workflow, whether revocations propagated, and where the audit trail still breaks.</div>
    </div>`
  );
}

export function renderConsentLane() {
  return layout(
    "Patient Consent Audit Stream — Consent Lane",
    `${topbar("/consent-lane")}
    <div class="card section">
      <div class="eyebrow">Consent Lane</div>
      <h2 style="margin: 6px 0 10px; font: 700 46px/1 Georgia, serif;">A consent queue should show version pressure and reset risk, not just who clicked agree.</h2>
      <p>Each row ties capture context to policy version, downstream usage pressure, and the next action needed to keep consent state audit-safe.</p>
    </div>
    <div class="table-wrap section" style="margin-top: 22px;">
      <table>
        <thead><tr><th>Consent</th><th>Excerpt</th><th>Owner</th><th>Next Action</th><th>Risk</th></tr></thead>
        <tbody>
          ${consentLane()
            .map(
              (item) => `<tr><td><strong>${item.program}</strong><br />${item.consentId}<br />${item.policyVersion}</td><td>${item.excerpt}</td><td>${item.owner}</td><td>${item.nextAction}</td><td><span class="tag ${riskClass(item.risk)}">${item.risk}</span></td></tr>`
            )
            .join("")}
        </tbody>
      </table>
    </div>`
  );
}

export function renderAuditStream() {
  return layout(
    "Patient Consent Audit Stream — Audit Stream",
    `${topbar("/audit-stream")}
    <div class="card section">
      <div class="eyebrow">Audit Stream</div>
      <h2 style="margin: 6px 0 10px; font: 700 46px/1 Georgia, serif;">The audit stream is where consent state becomes inspectable operational proof.</h2>
      <p>This lane maps events to policy versions, target evidence, owner lanes, readiness, and blockers that still prevent safe audit narration.</p>
    </div>
    <div class="section-grid" style="margin-top: 22px;">
      <div class="table-wrap section">
        <table>
          <thead><tr><th>Event</th><th>Target Evidence</th><th>Owner</th><th>Readiness</th></tr></thead>
          <tbody>
            ${auditStream()
              .map(
                (item) => `<tr><td><strong>${item.eventTitle}</strong><br />${item.policyVersion}<br />${item.impactArea}</td><td>${item.targetEvidence}</td><td>${item.owner}</td><td><span class="tag ${readinessClass(item.readiness)}">${item.readiness}</span></td></tr>`
              )
              .join("")}
        </tbody>
      </table>
      </div>
      <div class="card section">
        <div class="eyebrow">Dependency Blockers</div>
        <h3>Where consent auditability is likely to stall.</h3>
        <div class="list">
          ${auditStream()
            .map(
              (item) => `<div class="item"><strong>${item.eventId} · ${item.owner}</strong><p>${item.blocker}</p><span>${item.eventType} · ${item.impactArea}</span></div>`
            )
            .join("")}
        </div>
      </div>
    </div>`
  );
}

export function renderRevocationPosture() {
  return layout(
    "Patient Consent Audit Stream — Revocation Posture",
    `${topbar("/revocation-posture")}
    <div class="card section">
      <div class="eyebrow">Revocation Posture</div>
      <h2 style="margin: 6px 0 10px; font: 700 46px/1 Georgia, serif;">Revocation risk becomes visible when downstream reset proof and packet completeness are mapped together.</h2>
      <p>This lane surfaces which packets are ready, which still have blockers, and whether the issue is export timing, downstream suppression, or evidence packaging.</p>
    </div>
    <div class="card-grid" style="margin-top: 22px;">
      ${revocationPosture()
        .map(
          (packet) => `<div class="card section"><div class="eyebrow">${packet.packetId}</div><h3>${packet.program}</h3><div class="stat-grid" style="grid-template-columns: repeat(2, minmax(0, 1fr)); margin-top: 0;"><div class="stat"><label>Completeness</label><strong style="font-size: 30px;">${packet.completenessScore}%</strong><span>${packet.audience}</span></div><div class="stat"><label>Status</label><strong style="font-size: 30px;"><span class="tag ${readinessClass(packet.status)}">${packet.status}</span></strong><span>${packet.blocker}</span></div></div><div class="footer-note">${packet.dueInDays} days to deadline · ${packet.decisionNote}</div></div>`
        )
        .join("")}
    </div>`
  );
}

export function renderVerification() {
  return layout(
    "Patient Consent Audit Stream — Verification",
    `${topbar("/verification")}
    <div class="card section">
      <div class="eyebrow">Verification</div>
      <h2 style="margin: 6px 0 10px; font: 700 46px/1 Georgia, serif;">What this repo proves about consent, revocation, and audit systems.</h2>
      <div class="list">
        ${verification().map((item) => `<div class="item"><strong>${item}</strong></div>`).join("")}
      </div>
    </div>`
  );
}

export function renderDocs() {
  return layout(
    "Patient Consent Audit Stream — Docs",
    `${topbar("/docs")}
    <div class="card section">
      <div class="eyebrow">Docs</div>
      <h2 style="margin: 6px 0 10px; font: 700 46px/1 Georgia, serif;">A control plane for consent state, revocation routing, and audit-safe downstream proof.</h2>
      <p>This repo models the operating layer between consent capture and audit execution: policy versions, event routing, revocation blockers, downstream resets, and operator-safe handoffs.</p>
      <div class="footer-note">Routes: <code>/</code> · <code>/consent-lane</code> · <code>/audit-stream</code> · <code>/revocation-posture</code> · <code>/verification</code> · <code>/docs</code></div>
    </div>`
  );
}
