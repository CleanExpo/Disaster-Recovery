import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Delete Account | RestoreAssist',
  description: 'Request deletion of your RestoreAssist account and associated data.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/restoreassist/delete-account',
  },
  robots: { index: false, follow: false },
};

interface Props {
  searchParams: Promise<{ submitted?: string; error?: string }>;
}

export default async function RestoreAssistDeleteAccount({ searchParams }: Props) {
  const params = await searchParams;
  const submitted = params.submitted === 'true';
  const errorMessage = params.error ? decodeURIComponent(params.error) : null;

  if (submitted) {
    return (
      <main className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-2">Request Received</h1>
        <p className="text-sm text-gray-500 mb-8">
          Unite-Group NEXUS Pty Ltd (ABN 95 691 477 844)
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 space-y-3">
          <p className="font-semibold text-green-800">
            Your account deletion request has been submitted.
          </p>
          <p className="text-sm text-green-700">
            A confirmation has been sent to your registered email address. Your request will be
            processed within 30 days.
          </p>
        </div>
        <p className="text-sm text-gray-500 mt-6">
          Questions?{' '}
          <a href="https://disasterrecovery.com.au/contact" className="underline">
            Contact the Privacy Officer
          </a>
          .
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-2">RestoreAssist — Account Deletion</h1>
      <p className="text-sm text-gray-500 mb-10">
        Unite-Group NEXUS Pty Ltd (ABN 95 691 477 844)
      </p>

      <section className="space-y-6">
        <p>
          Verified contractors may request deletion of their RestoreAssist account and all
          associated personal data at any time by completing the form below.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
          <strong>Before requesting deletion:</strong> Outstanding job orders must be completed
          or transferred. Deletion cannot proceed while active work orders are assigned to your
          account.
        </div>

        {errorMessage && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-800">
            <strong>Error:</strong> {errorMessage}
          </div>
        )}

        <div className="space-y-2">
          <h2 className="text-lg font-semibold">What will be deleted</h2>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>Your account profile (name, email, mobile, ABN)</li>
            <li>Login credentials and session data</li>
            <li>Device information and usage logs</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold">What is retained</h2>
          <p className="text-sm">
            Certain records are retained for up to 7 years to satisfy Australian tax and
            regulatory obligations, including completed job records, payment history, and
            documentation submitted as evidence during jobs. This is required under the{' '}
            <em>Income Tax Assessment Act 1997</em> and related Australian law.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Processing time</h2>
          <p className="text-sm">
            Deletion requests are processed within 30 days of receipt. You will receive a
            confirmation to your registered email address once complete.
          </p>
        </div>

        <form
          action="/api/restoreassist/delete-account"
          method="POST"
          className="space-y-4 pt-4 border-t border-gray-200"
        >
          <h2 className="text-lg font-semibold">Submit a deletion request</h2>

          <div className="space-y-1">
            <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
              Full name
            </label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              required
              autoComplete="name"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Registered email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              autoComplete="email"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="abn" className="block text-sm font-medium text-gray-700">
              ABN (as registered in the app)
            </label>
            <input
              type="text"
              id="abn"
              name="abn"
              required
              pattern="[\d\s]{11,14}"
              placeholder="XX XXX XXX XXX"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
              Reason for deletion (optional)
            </label>
            <select
              id="reason"
              name="reason"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a reason</option>
              <option value="no_longer_contracting">No longer contracting</option>
              <option value="switching_platform">Switching to another platform</option>
              <option value="privacy_concerns">Privacy concerns</option>
              <option value="account_error">Account created in error</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="confirm"
              name="confirm"
              required
              className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="confirm" className="text-sm text-gray-600">
              I understand that account deletion is permanent. Job records required for legal
              compliance will be retained for up to 7 years as described above.
            </label>
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Submit deletion request
          </button>
        </form>

        <p className="text-xs text-gray-500 pt-2">
          For general privacy enquiries, visit the{' '}
          <a
            href="https://disasterrecovery.com.au/restoreassist/privacy-policy"
            className="underline"
          >
            RestoreAssist Privacy Policy
          </a>{' '}
          or contact the Privacy Officer via{' '}
          <a href="https://disasterrecovery.com.au/contact" className="underline">
            disasterrecovery.com.au/contact
          </a>
          .
        </p>
      </section>
    </main>
  );
}
