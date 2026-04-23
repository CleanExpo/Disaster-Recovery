# Voice AI (Sarah) — Privacy Counsel Sign-off Checklist

**NOT LEGAL ADVICE.** This checklist is a working document for internal use.
Privacy counsel must sign off on every item below before the voice channel
goes live to Australian callers.

Related tickets: DR-706 (epic), DR-713 (consent utterance + /privacy update),
DR-714 (transcript redaction pipeline).

Providers in scope: **ElevenLabs, Inc.** (US — voice AI, Flash v2.5) and
**Twilio Inc.** (US — telephony, recording).

---

## Sign-off items

- [ ] **1. APP 8.2(b) informed consent.** Is the opening utterance in
      `src/lib/voice/consent-utterance.ts` (version-pinned
      `CONSENT_UTTERANCE_VERSION`) sufficient to establish informed consent
      for cross-border disclosure to ElevenLabs and Twilio under APP 8.2(b)?
- [ ] **2. APP 1.7 ADM disclosure (commences 10 December 2026).** Does the
      utterance, combined with the /privacy voice-AI section, satisfy the
      forthcoming automated-decision-making transparency requirements — even
      though Sarah does not make ADM-triggering decisions today?
- [ ] **3. Retention reasonableness.** Are the default retention windows
      (audio 30 days, transcript 90 days, redacted audit log 7 years)
      defensible under APP 11.2 (destroy or de-identify when no longer
      needed) and consistent with our carrier and insurance obligations?
- [ ] **4. ElevenLabs DPA.** Is a signed data processing agreement in place
      with ElevenLabs covering sub-processors, security controls, breach
      notification, and the Australian Privacy Principles?
- [ ] **5. Twilio DPA.** Is a signed data processing agreement in place with
      Twilio covering call recording, transcription, sub-processors, and
      Australian Privacy Principles obligations?
- [ ] **6. Secondary-use carve-outs.** Have secondary uses (product
      analytics, model training, voice-clone training, quality tuning) been
      explicitly carved out or opted-out with both ElevenLabs and Twilio in
      writing?
- [ ] **7. Per-call consent record.** Is there a written, auditable record
      of consent for every call — capturing call SID, timestamp, utterance
      version, consent outcome (yes / decline / transfer), and the caller's
      phone number?
- [ ] **8. Privacy policy clarity.** Does `/privacy` clearly and prominently
      name both ElevenLabs and Twilio as overseas recipients, with the
      country of processing and the categories of information disclosed?
- [ ] **9. Human opt-out at every turn.** Is the &quot;human&quot; / &quot;operator&quot;
      handoff tested and working at every turn of the Sarah conversation —
      not just at the opening consent prompt?
- [ ] **10. APP 11 security-of-collection.** Does the redaction pipeline
      (DR-714) strip direct identifiers from transcripts and the audit log
      on the schedule defined in the /privacy policy, and is that pipeline
      sufficient to meet APP 11 obligations for the US-hosted data?

---

**Sign-off:**

| Name | Role | Date | Notes |
|------|------|------|-------|
|      |      |      |       |
