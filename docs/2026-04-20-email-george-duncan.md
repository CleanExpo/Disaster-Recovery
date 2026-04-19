# Email draft — George Steele + Duncan

**To:** gs@equippedcf.com.au; duncan@... (insert)
**From:** phill@... (insert)
**Subject:** Disaster Recovery × Equipped Commercial Finance — Phase 1 referral platform ready for review

---

Hi George, Hi Duncan,

Good to reconnect after our call last week. I've taken your starting-point link (https://equippedcf.com.au/get-a-quote) and built out the Disaster Recovery side of the partnership so you can see how we're planning to send referrals across.

## What's ready to see

The Disaster Recovery site has been updated end-to-end to replace the old Blue Fire Finance mentions with Equipped Commercial Finance. 95 pages updated, every link now points at equippedcf.com.au.

I've also added a new `/finance` section on Disaster Recovery that handles the referral handoff:

- **`/finance`** — a landing page that explains to the customer what Equipped does, what Disaster Recovery does not do (we're clear that we are not the lender, not a credit assistance provider, and we do not make credit decisions), and the disclosures required under reg 25 of the National Consumer Credit Protection Regulations 2010
- **`/finance/referral`** — a deliberately short referral form. We collect 13 fields maximum: name, mobile, email, postcode, whether the customer is an ABN holder or a household, the disaster category, a short free-text purpose, and the funding range. Optional ABN field appears only when the customer identifies as a business. We explicitly do **not** ask for income, expenses, liabilities, bank statements, credit history, or anything that would look like a credit application on our side. Those belong on your side, in your regulated environment.
- **`/finance/handoff`** — after submission, we mint a short-lived (15 minute) signed JWT with a one-time referral ID and pass the customer into an iframe pointed at equippedcf.com.au. We postMessage the token across with the origin strictly pinned to your domain, so your form can prefill and continue inside your branded environment.
- **`/finance/thank-you`** — the customer's confirmation page on our side. We don't show any credit details here; that's between them and Equipped.

Preview URL (live now on a Vercel build off the feature branch):

**https://disaster-recovery-e1hwowkdr-unite-group.vercel.app/finance**

The referral form is at `/finance/referral` on the same URL. The full flow (landing → form → handoff → thank-you) is live and usable right now.

## Our Phase 1 product positioning

To keep the partnership cleanly inside the referrer exemption, we've pinned the following on the Disaster Recovery side:

1. **DR is the referrer**, Equipped Commercial Finance (or its authorised lending partners) is the lender. This is disclosed on every page of the finance flow and inside the consent checkbox the customer must tick.
2. **Phase 1 is Australia only**, and leans commercial-primary — business owners, ABN holders, equipment finance, fit-out, commercial vehicles. Household consumer finance is surfaced as a Phase 2 feature because it sits inside the regulated consumer-credit regime and we'd like to finalise the ACL / AFCA architecture with you before we open that pathway.
3. **New Zealand is not in Phase 1.** CCCFA regulator transfer to FMA commences 1 July 2026, new IPP3A indirect-collection obligations start 1 May 2026. We'll add NZ once a separate NZ-authorised partner is in place.
4. **No loan proceeds flow through Disaster Recovery.** If a customer is approved and authorises the funds to be paid to the recovery contractor, that payment is lender-to-contractor under borrower authority — we just surface the job + invoice context.
5. **Immutable audit log on our side.** Every referral records the disclosure version and privacy notice version shown at submit time, the SHA-256 of the payload sent to you, and the consent timestamps. We do not store the full payload on our side — only the hash — so if there's ever a question about what we handed across, we can prove it without creating a new PII honeypot.

## What I need from you to move from preview to live

A few things we left as open questions, which I'd like to close in our next call:

1. **Credit Guide PDF** — this is the cleanest way to confirm your ACL / ACR status and AFCA membership. If you can forward your current Credit Guide I can lift the exact names and numbers into the disclosure copy on the DR side.
2. **Privacy Collection Statement** — the one you use today in your `/get-a-quote` form. I'll mirror the language on the DR side so the customer sees a consistent privacy story across both surfaces.
3. **Embed endpoint** — when you're ready to accept a `postMessage` prefill with a signed JWT, we'll flip a single env var on our side and the iframe swaps from your public `/get-a-quote` page to your embed. Happy to share the JWT contract and the `postMessage` envelope format when you are.
4. **Fee structure** — three options I'd like your take on:
   - flat fee per funded referral, capped per-month (simplest, cleanest under reg 25)
   - percentage of funded principal, paid out of Equipped's origination fee (aligned incentives, higher per deal)
   - hybrid: flat introduction fee + bonus on controlled-disbursement completion
5. **Your AFCA member number(s)** — I'll add them to the disclosure text on our side. If you operate commercial-only and don't carry an AFCA membership, that's fine for the Phase 1 commercial-primary scope — we'll leave consumer behind the feature flag until the consumer-path architecture is confirmed.
6. **Status webhook contract** — we've designed the DR side to accept state updates (received / contacted / application started / approved / declined / funded / withdrawn / complaint). When you're ready I'll stand up `/api/finance/status` and we agree on the signature + payload shape.

## What we are not doing

Just so it's on the record: we are not building a loan application on the Disaster Recovery side, we are not holding loan proceeds, we are not assessing affordability, we are not recommending products, we are not using the words "pre-approved", "guaranteed", or "instant loan" anywhere on the platform. The compliance review embedded in the build brief was specifically to keep Disaster Recovery firmly inside the referrer lane and keep all the regulated conduct on your side where it belongs.

## Next steps

1. Your team reviews the preview URL and the disclosure copy
2. I get the Credit Guide + Privacy Collection Statement + AFCA numbers from you
3. We agree fee structure + embed contract
4. We set a soft-launch date for the AU commercial referral pathway
5. We start planning Phase 2 (consumer pathway) and Phase 3 (NZ) once the AU commercial pilot has real numbers

Happy to walk you and Duncan through the preview on a call whenever suits this week or next.

Kind regards,

Phill

---

## Appendix — for your legal team if they ask

- Disaster Recovery is positioned as a **referrer** under regulation 25 of the National Consumer Credit Protection Regulations 2010 (Cth). The disclosure text on the platform names this explicitly.
- Customer consent is collected via two mandatory tick-boxes (share-with-Equipped + referrer-disclosure). Submission is blocked client-side and server-side if either is missing.
- Every referral row in our audit log stores `disclosureVersion`, `privacyNoticeVersion`, and the SHA-256 hash of the exact payload transmitted. This is designed to answer "what did the customer see, when, and what did we send you" without storing the PII body on our side.
- AU-only at launch. NZ consumer-credit pathway waits on CCCFA / FMA transition (1 July 2026 proposed) and Privacy Act IPP3A commencement (1 May 2026).
- This is not legal advice — before go-live I'd expect both sides to have their ACL / credit counsel sign off the exact disclosures, the referrer agreement, and the funds-flow architecture. Happy to introduce our side's legal contact if useful.
