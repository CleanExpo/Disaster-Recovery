'use client';

export function PrivacyNotice() {
  return (
    <div className="rounded-xl border border-slate-600/50 bg-slate-800/40 p-4 text-xs text-slate-400 space-y-2">
      <p className="font-medium text-slate-300">Privacy — Collection Notice (APP 3 &amp; 5)</p>
      <p>
        By submitting this application, you consent to Disaster Recovery collecting your business
        and personal information to assess your application for the NRPG contractor network.
        Information collected includes your name, ABN, business details, insurance certificates,
        licensing documents, bank account details, and uploaded identity documents.
      </p>
      <p>
        This information will be used to verify eligibility, conduct background checks, and — if
        accepted — to administer your contractor account and match you with restoration claims.
        Documents are stored securely and disclosed only to authorised NRPG staff and, where
        required, to regulatory bodies.
      </p>
      <p>
        Handled in accordance with the{' '}
        <a
          href="/privacy-policy"
          className="text-slate-300 underline underline-offset-2 hover:text-white transition-colours"
        >
          Privacy Policy
        </a>{' '}
        (Australian Privacy Act 1988, APPs 1–13). To access or correct your information, or to make
        a privacy complaint, use the{' '}
        <a
          href="/contact"
          className="text-slate-300 underline underline-offset-2 hover:text-white transition-colours"
        >
          contact form
        </a>
        .
      </p>
    </div>
  );
}
