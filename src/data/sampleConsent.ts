export type ConsentRecord = {
  consentId: string;
  program: string;
  patientCohort: string;
  policyVersion: string;
  channel: string;
  owner: string;
  lastEventDays: number;
  status: "green" | "yellow" | "red";
  risk: "low" | "watch" | "critical";
  nextAction: string;
  excerpt: string;
};

export type AuditEvent = {
  eventId: string;
  policyVersion: string;
  eventTitle: string;
  eventType: "capture" | "attestation" | "revocation" | "export";
  targetEvidence: string;
  owner: string;
  readiness: "green" | "yellow" | "red";
  impactArea: string;
  blocker: string;
};

export type RevocationPacket = {
  packetId: string;
  consentId: string;
  program: string;
  audience: string;
  completenessScore: number;
  status: "green" | "yellow" | "red";
  dueInDays: number;
  blocker: string;
  decisionNote: string;
};

export const consentRecords: ConsentRecord[] = [
  {
    consentId: "CONS-201",
    program: "Remote cardiac monitoring",
    patientCohort: "Cardiology",
    policyVersion: "PCM-4.2",
    channel: "Mobile app + care coordinator confirmation",
    owner: "Patient Access",
    lastEventDays: 1,
    status: "yellow",
    risk: "watch",
    nextAction: "Confirm downstream messaging tool acknowledged the newest policy version.",
    excerpt: "Updated consent version must propagate to patient messaging and monitoring workflows within 24 hours."
  },
  {
    consentId: "CONS-214",
    program: "Behavioral intake portal",
    patientCohort: "Behavioral Health",
    policyVersion: "BHP-2.8",
    channel: "Web intake + signed PDF export",
    owner: "Privacy Ops",
    lastEventDays: 3,
    status: "red",
    risk: "critical",
    nextAction: "Route missing revocation export to the intake vendor before stale consent state persists.",
    excerpt: "Revocation events must be exported to downstream intake and messaging tools within the same business day."
  },
  {
    consentId: "CONS-227",
    program: "Specialty pharmacy refill reminders",
    patientCohort: "Pharmacy",
    policyVersion: "SPR-3.1",
    channel: "SMS opt-in + nurse confirmation",
    owner: "Growth Compliance",
    lastEventDays: 5,
    status: "yellow",
    risk: "watch",
    nextAction: "Attach SMS vendor acknowledgement to the audit packet.",
    excerpt: "Outbound reminders require channel-specific consent proof and vendor acknowledgement."
  },
  {
    consentId: "CONS-233",
    program: "Women's health scheduling",
    patientCohort: "Care Navigation",
    policyVersion: "WHS-1.6",
    channel: "Call center capture + CRM sync",
    owner: "Care Navigation",
    lastEventDays: 2,
    status: "red",
    risk: "critical",
    nextAction: "Resolve call-center revocation lag before additional outbound reminders run.",
    excerpt: "Revocation state must suppress follow-up scheduling reminders across all outbound channels."
  },
  {
    consentId: "CONS-246",
    program: "Population outreach analytics",
    patientCohort: "Analytics",
    policyVersion: "POA-5.0",
    channel: "Portal opt-in + warehouse sync",
    owner: "Data Governance",
    lastEventDays: 7,
    status: "green",
    risk: "low",
    nextAction: "Final audit packaging only; downstream resets are already confirmed.",
    excerpt: "Analytics usage requires current consent version proof and reset confirmation when policy terms change."
  }
];

export const auditEvents: AuditEvent[] = [
  {
    eventId: "AUD-31",
    policyVersion: "BHP-2.8",
    eventTitle: "Revocation export chain",
    eventType: "revocation",
    targetEvidence: "Revocation timestamp plus downstream vendor suppression log",
    owner: "Privacy Ops",
    readiness: "red",
    impactArea: "Behavioral intake suppression",
    blocker: "Vendor export log is incomplete for the newest batch of revocations."
  },
  {
    eventId: "AUD-36",
    policyVersion: "PCM-4.2",
    eventTitle: "Policy version acknowledgement",
    eventType: "attestation",
    targetEvidence: "Coordinator acknowledgement plus patient-app version proof",
    owner: "Patient Access",
    readiness: "yellow",
    impactArea: "Cardiac monitoring messaging",
    blocker: "The app version is known, but acknowledgement proof is not yet bundled with the consent trail."
  },
  {
    eventId: "AUD-42",
    policyVersion: "WHS-1.6",
    eventTitle: "Call center suppression reset",
    eventType: "export",
    targetEvidence: "CRM suppression log and outbound-tool reset confirmation",
    owner: "Care Navigation",
    readiness: "red",
    impactArea: "Scheduling outreach suppression",
    blocker: "CRM reset happened, but outbound scheduler still shows stale consent state."
  },
  {
    eventId: "AUD-48",
    policyVersion: "POA-5.0",
    eventTitle: "Warehouse usage attestation",
    eventType: "capture",
    targetEvidence: "Portal capture event plus warehouse sync receipt",
    owner: "Data Governance",
    readiness: "green",
    impactArea: "Analytics usage approval",
    blocker: "No blocker; only packaging and auditor narrative remain."
  }
];

export const revocationPackets: RevocationPacket[] = [
  {
    packetId: "REV-12",
    consentId: "CONS-214",
    program: "Behavioral intake portal",
    audience: "Privacy auditor",
    completenessScore: 66,
    status: "red",
    dueInDays: 1,
    blocker: "Downstream vendor suppression evidence is still incomplete.",
    decisionNote: "Treat as immediate audit exposure until vendor export logs are recovered."
  },
  {
    packetId: "REV-18",
    consentId: "CONS-233",
    program: "Women's health scheduling",
    audience: "Operations lead",
    completenessScore: 71,
    status: "red",
    dueInDays: 2,
    blocker: "Outbound reminder system still shows stale consent state after revocation.",
    decisionNote: "Freeze nonessential outreach until suppression reset proof is confirmed."
  },
  {
    packetId: "REV-23",
    consentId: "CONS-201",
    program: "Remote cardiac monitoring",
    audience: "Compliance reviewer",
    completenessScore: 85,
    status: "yellow",
    dueInDays: 4,
    blocker: "Version acknowledgement proof needs one final bundle step.",
    decisionNote: "Packet is recoverable if the acknowledgement artifact lands today."
  }
];
