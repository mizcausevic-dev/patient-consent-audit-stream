// SYNTHETIC TEST DATA — assertions run against the synthetic sample fixtures in
// src/data/sampleConsent.ts. No real Protected Health Information (PHI) is used.
import { describe, expect, test } from "vitest";

import {
  renderAuditStream,
  renderConsentLane,
  renderDocs,
  renderOverview,
  renderRevocationPosture,
  renderVerification
} from "./render";
import {
  auditEvents,
  consentRecords,
  revocationPackets
} from "../data/sampleConsent";

const renderers = [
  ["overview", renderOverview],
  ["consent-lane", renderConsentLane],
  ["audit-stream", renderAuditStream],
  ["revocation-posture", renderRevocationPosture],
  ["verification", renderVerification],
  ["docs", renderDocs]
] as const;

describe("render", () => {
  test.each(renderers)("%s produces a full HTML document with nav", (_label, fn) => {
    const html = fn();
    expect(html.startsWith("<!DOCTYPE html>")).toBe(true);
    expect(html).toContain("</html>");
    expect(html).toContain("Patient Consent Audit Stream");
    expect(html).toContain('href="/consent-lane"');
    expect(html).toContain('href="/docs"');
  });

  test("overview surfaces consent data, stat grid, and risk tags", () => {
    const html = renderOverview();
    expect(html).toContain(consentRecords[0].consentId);
    expect(html).toContain("Consents");
    expect(html).toContain("Blocked Audits");
    // riskClass() lowercases the data-driven risk into a tag class
    expect(html).toContain('class="tag critical"');
    expect(html).toContain('class="tag watch"');
  });

  test("consent lane lists every consent record with owner and next action", () => {
    const html = renderConsentLane();
    for (const record of consentRecords) {
      expect(html).toContain(record.consentId);
      expect(html).toContain(record.owner);
      expect(html).toContain(record.policyVersion);
    }
  });

  test("audit stream shows events, owners, and all readiness tag classes", () => {
    const html = renderAuditStream();
    for (const item of auditEvents) {
      expect(html).toContain(item.eventId);
      expect(html).toContain(item.owner);
    }
    // readinessClass() maps each readiness value to a tag class
    expect(html).toContain('class="tag red"');
    expect(html).toContain('class="tag green"');
    expect(html).toContain('class="tag yellow"');
  });

  test("revocation posture shows packets, completeness scores, and audiences", () => {
    const html = renderRevocationPosture();
    for (const packet of revocationPackets) {
      expect(html).toContain(packet.packetId);
      expect(html).toContain(String(packet.completenessScore));
      expect(html).toContain(packet.audience);
    }
  });

  test("verification renders every proof statement", () => {
    const html = renderVerification();
    expect(html).toContain("Verification");
    expect(html).toContain("patient-trust");
  });

  test("docs page enumerates the route surface", () => {
    const html = renderDocs();
    expect(html).toContain("/audit-stream");
    expect(html).toContain("/revocation-posture");
  });
});
