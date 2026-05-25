# Architecture

## Overview

`patient-consent-audit-stream` is a lightweight TypeScript + Express control surface for modeling the operating layer between consent capture, policy versions, revocation events, and audit-safe downstream proof.

## Surfaces

- `overview`
  - consent count
  - active policy versions
  - revocation pressure
  - blocked audit paths
- `consent-lane`
  - consent-by-consent owner routing
  - capture channel
  - downstream usage pressure
  - next action
- `audit-stream`
  - event sequencing from capture to revocation and export
  - readiness and blockers
- `revocation-posture`
  - packet completeness
  - downstream reset timing
  - audience-specific blockers
- `verification`
  - what the repo proves about consent and audit systems

## Data Model

- `ConsentRecord`
  - consent, program, policy version, channel, owner, status, risk, excerpt, next action
- `AuditEvent`
  - event, target evidence, event type, owner, readiness, blocker
- `RevocationPacket`
  - audience, completeness score, reset window, blocker, decision note

## Design Principle

Consent state should be inspectable by compliance, privacy, product, and executive stakeholders. The system should explain:
- which consent record matters right now
- what policy version governs it
- who owns the next move
- where revocation or audit risk is building
