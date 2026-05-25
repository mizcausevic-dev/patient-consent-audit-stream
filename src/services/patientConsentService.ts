import { auditEvents, consentRecords, revocationPackets } from "../data/sampleConsent";

export function summary() {
  return {
    consentCount: consentRecords.length,
    activePolicies: new Set(consentRecords.map((item) => item.policyVersion)).size,
    revocationRisk: consentRecords.filter((item) => item.risk !== "low").length,
    blockedAudits: revocationPackets.filter((item) => item.status !== "green").length,
    recommendation:
      "Clear revocation export and suppression-reset blockers first so stale consent state does not leak into downstream outreach."
  };
}

export function consentLane() {
  return consentRecords;
}

export function auditStream() {
  return auditEvents;
}

export function revocationPosture() {
  return revocationPackets;
}

export function policyCoverage() {
  const counts = new Map<string, number>();
  for (const item of consentRecords) {
    counts.set(item.program, (counts.get(item.program) ?? 0) + 1);
  }

  return Array.from(counts.entries()).map(([program, consentCount]) => ({
    program,
    consentCount
  }));
}

export function verification() {
  return [
    "The surface shows that consent risk is often a versioning and downstream reset defect, not just a capture problem.",
    "Audit events become operational only when owners, policy versions, and suppression blockers are mapped into the same stream.",
    "Revocation posture makes privacy and patient-trust risk visible before stale consent state propagates into outbound workflows."
  ];
}

export function payload() {
  return {
    dashboard: summary(),
    consents: consentLane(),
    events: auditStream(),
    revocations: revocationPosture(),
    policies: policyCoverage(),
    verification: verification()
  };
}
