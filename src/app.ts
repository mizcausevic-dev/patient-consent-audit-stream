import express from "express";

import {
  auditStream,
  consentLane,
  payload,
  revocationPosture,
  summary,
  verification
} from "./services/patientConsentService";
import {
  renderAuditStream,
  renderConsentLane,
  renderDocs,
  renderOverview,
  renderRevocationPosture,
  renderVerification
} from "./services/render";

const app = express();
const port = Number(process.env.PORT ?? 5450);

app.get("/", (_req, res) => res.type("html").send(renderOverview()));
app.get("/consent-lane", (_req, res) => res.type("html").send(renderConsentLane()));
app.get("/audit-stream", (_req, res) => res.type("html").send(renderAuditStream()));
app.get("/revocation-posture", (_req, res) => res.type("html").send(renderRevocationPosture()));
app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
app.get("/api/consent-lane", (_req, res) => res.json(consentLane()));
app.get("/api/audit-stream", (_req, res) => res.json(auditStream()));
app.get("/api/revocation-posture", (_req, res) => res.json(revocationPosture()));
app.get("/api/verification", (_req, res) => res.json(verification()));
app.get("/api/sample", (_req, res) => res.json(payload()));

if (require.main === module) {
  app.listen(port, "127.0.0.1", () => {
    console.log(`Patient Consent Audit Stream listening on http://127.0.0.1:${port}`);
  });
}

export default app;
