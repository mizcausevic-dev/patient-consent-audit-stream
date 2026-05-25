import { payload, summary } from "../src/services/patientConsentService";

console.log("patient-consent-audit-stream demo");
console.log(JSON.stringify(summary(), null, 2));
console.log(JSON.stringify(payload().events, null, 2));
