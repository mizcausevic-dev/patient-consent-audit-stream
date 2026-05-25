import { describe, expect, test } from "vitest";

import {
  auditStream,
  consentLane,
  payload,
  policyCoverage,
  revocationPosture,
  summary,
  verification
} from "./services/patientConsentService";

describe("patient-consent-audit-stream", () => {
  test("summary exposes consent pressure and audit blockers", () => {
    const stats = summary();
    expect(stats.consentCount).toBeGreaterThan(2);
    expect(stats.revocationRisk).toBeGreaterThan(0);
    expect(stats.blockedAudits).toBeGreaterThan(0);
  });

  test("audit stream and policy coverage stay operationally legible", () => {
    expect(auditStream().length).toBe(4);
    expect(policyCoverage().length).toBeGreaterThan(3);
    expect(revocationPosture().some((packet) => packet.completenessScore < 80)).toBe(true);
  });

  test("payload bundles the full consent operator surface", () => {
    expect(consentLane().length).toBe(5);
    expect(verification().length).toBe(3);
    expect(payload()).toHaveProperty("consents");
    expect(payload()).toHaveProperty("events");
    expect(payload()).toHaveProperty("revocations");
  });
});
