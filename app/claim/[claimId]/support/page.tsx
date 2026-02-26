'use client';

import { FEATURE_FLAGS } from '@/lib/feature-flags';
import { AntigravityNavbar } from '@/components/antigravity';
import { AntigravityFooter } from '@/components/antigravity';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  CLAIM_STAGES,
  KNOW_YOUR_RIGHTS,
  QUESTIONS_FOR_INSURER,
  DOCUMENT_CHECKLIST,
  INSURER_CONTACTS,
  STATE_CONSUMER_CONTACTS,
  VERIFIED_CONTACTS,
} from '@/lib/claim-support-pack';
import {
  Shield,
  Phone,
  FileText,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  ExternalLink,
  ClipboardList,
  Scale,
  Clock,
  AlertTriangle,
  HelpCircle,
  Printer,
} from 'lucide-react';

// ─── Claim Timeline Tracker ──────────────────────────────────

function ClaimTimeline() {
  const [expandedStage, setExpandedStage] = useState<number | null>(1);

  return (
    <section id="timeline" className="mb-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <Clock className="h-6 w-6 text-blue-600" />
        Your Claim Journey
      </h2>
      <div className="space-y-0">
        {CLAIM_STAGES.map((stage, index) => {
          const isActive = stage.status !== '';
          const isExpanded = expandedStage === stage.stage;
          const isLast = index === CLAIM_STAGES.length - 1;

          return (
            <div key={stage.stage} className="relative">
              {/* Connecting line */}
              {!isLast && (
                <div
                  className={`absolute left-5 top-12 w-0.5 h-full ${
                    isActive ? 'bg-blue-400' : 'bg-gray-200'
                  }`}
                />
              )}

              <button
                onClick={() => setExpandedStage(isExpanded ? null : stage.stage)}
                className="w-full text-left flex items-start gap-4 py-3 group"
              >
                {/* Stage number circle */}
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {stage.stage}
                </div>

                {/* Stage info */}
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-gray-900">
                      {stage.title}
                    </span>
                    {isActive && (
                      <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                        {stage.status}
                      </span>
                    )}
                  </div>
                </div>

                {/* Expand/collapse icon */}
                <div className="flex-shrink-0 text-gray-400 group-hover:text-gray-600">
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </div>
              </button>

              {/* Expanded content */}
              {isExpanded && (
                <div className="ml-14 mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {stage.description}
                  </p>
                  {stage.clientRight && (
                    <p className="mt-3 text-blue-700 text-sm font-medium flex items-start gap-2">
                      <Shield className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      {stage.clientRight}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── Questions to Ask Your Insurer ───────────────────────────

function QuestionsSection({ claimDate }: { claimDate: string }) {
  const [copied, setCopied] = useState(false);

  const allQuestionsText = QUESTIONS_FOR_INSURER.map(
    (q, i) => `${i + 1}. ${q.question.replace('[DATE]', claimDate)}`
  ).join('\n\n');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(allQuestionsText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = allQuestionsText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="questions" className="mb-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
        <HelpCircle className="h-6 w-6 text-green-600" />
        Questions to Ask Your Insurer
      </h2>
      <p className="text-gray-600 text-sm mb-4">
        Print this list and send it to your insurer in writing (email preferred
        — it creates a record).
      </p>

      {/* Action buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          {copied ? 'Copied!' : 'Copy All Questions'}
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
        >
          <Printer className="h-4 w-4" />
          Print
        </button>
      </div>

      <div className="space-y-4 print:space-y-6">
        {QUESTIONS_FOR_INSURER.map((q, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-lg p-4 bg-white"
          >
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-bold">
                {i + 1}
              </span>
              <div>
                <p className="text-gray-900 font-medium leading-relaxed">
                  &ldquo;{q.question.replace('[DATE]', claimDate)}&rdquo;
                </p>
                <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                  <strong>Why:</strong> {q.why}
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  Source: {q.source}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Know Your Rights ────────────────────────────────────────

function KnowYourRights() {
  const [expandedRight, setExpandedRight] = useState<number | null>(null);

  return (
    <section id="rights" className="mb-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
        <Scale className="h-6 w-6 text-amber-600" />
        Know Your Rights
      </h2>
      <p className="text-gray-600 text-sm mb-6">
        These are your protections under Australian law. This is general
        information, not legal or financial advice.
      </p>

      <div className="space-y-3">
        {KNOW_YOUR_RIGHTS.map((right, i) => {
          const isExpanded = expandedRight === i;
          return (
            <div
              key={i}
              className="border border-gray-200 rounded-lg bg-white overflow-hidden"
            >
              <button
                onClick={() => setExpandedRight(isExpanded ? null : i)}
                className="w-full text-left p-4 flex items-start gap-3 group"
              >
                <Shield className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="flex-grow">
                  <p className="font-medium text-gray-900">{right.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{right.source}</p>
                </div>
                <div className="flex-shrink-0 text-gray-400 group-hover:text-gray-600">
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </div>
              </button>
              {isExpanded && (
                <div className="px-4 pb-4 ml-8">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {right.detail}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── Expert Contacts Panel ───────────────────────────────────

function ExpertContacts({ state }: { state: string }) {
  const stateKey =
    (state?.toUpperCase() as keyof typeof VERIFIED_CONTACTS.legalAid.websites) ||
    'QLD';
  const stateConsumer =
    STATE_CONSUMER_CONTACTS.find((c) => c.state === state?.toUpperCase()) ||
    STATE_CONSUMER_CONTACTS[0];
  const legalAidUrl =
    VERIFIED_CONTACTS.legalAid.websites[stateKey] ||
    VERIFIED_CONTACTS.legalAid.websites.QLD;

  const contacts = [
    {
      ...VERIFIED_CONTACTS.afca,
      color: 'blue',
      bgClass: 'bg-blue-50 border-blue-200',
      textClass: 'text-blue-700',
    },
    {
      ...VERIFIED_CONTACTS.ils,
      color: 'green',
      bgClass: 'bg-green-50 border-green-200',
      textClass: 'text-green-700',
    },
    {
      ...VERIFIED_CONTACTS.ndh,
      color: 'amber',
      bgClass: 'bg-amber-50 border-amber-200',
      textClass: 'text-amber-700',
    },
    {
      ...VERIFIED_CONTACTS.ica,
      color: 'purple',
      bgClass: 'bg-purple-50 border-purple-200',
      textClass: 'text-purple-700',
    },
  ];

  return (
    <section id="contacts" className="mb-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
        <Phone className="h-6 w-6 text-blue-600" />
        Free Help &mdash; Expert Contacts
      </h2>
      <p className="text-gray-600 text-sm mb-6">
        These organisations provide FREE, INDEPENDENT assistance. Save these
        contacts before you need them.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contacts.map((contact) => (
          <div
            key={contact.name}
            className={`border rounded-lg p-4 ${contact.bgClass}`}
          >
            <h3 className={`font-semibold text-sm ${contact.textClass}`}>
              {contact.name}
            </h3>
            <p className="text-gray-600 text-xs mt-1">{contact.description}</p>
            <div className="mt-3 space-y-1">
              <p className="text-gray-900 text-sm font-medium">
                {contact.phone}
              </p>
              {'hours' in contact && contact.hours && (
                <p className="text-gray-500 text-xs">{contact.hours}</p>
              )}
              <a
                href={contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1 text-xs ${contact.textClass} hover:underline`}
              >
                {contact.website.replace('https://', '').replace('https://www.', '')}
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* State Consumer Affairs */}
      <div className="mt-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
        <h3 className="font-semibold text-sm text-gray-800">
          State Consumer Affairs ({stateKey})
        </h3>
        <p className="text-gray-600 text-xs mt-1">
          For disputes about the quality or conduct of restoration works
        </p>
        <p className="text-gray-900 text-sm mt-2">
          {stateConsumer.name} &mdash;{' '}
          <strong>{stateConsumer.phone}</strong> |{' '}
          <a
            href={`https://${stateConsumer.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {stateConsumer.website}
          </a>
        </p>
      </div>

      {/* Legal Aid */}
      <div className="mt-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
        <h3 className="font-semibold text-sm text-gray-800">
          Legal Aid ({stateKey})
        </h3>
        <p className="text-gray-600 text-xs mt-1">
          Free legal help for eligible Australians
        </p>
        <a
          href={legalAidUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline mt-2"
        >
          {legalAidUrl.replace('https://www.', '').replace('https://', '')}
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </section>
  );
}

// ─── Insurer Directory ───────────────────────────────────────

function InsurerDirectory() {
  return (
    <section id="insurers" className="mb-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
        <ClipboardList className="h-6 w-6 text-indigo-600" />
        Insurer Claims Lines
      </h2>
      <p className="text-gray-600 text-sm mb-4">
        Call the number on your policy first. If you cannot find it, use the
        claims line below.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left px-4 py-2 font-semibold text-gray-700">
                Insurer
              </th>
              <th className="text-left px-4 py-2 font-semibold text-gray-700">
                Claims Phone
              </th>
              <th className="text-left px-4 py-2 font-semibold text-gray-700 hidden sm:table-cell">
                Website
              </th>
            </tr>
          </thead>
          <tbody>
            {INSURER_CONTACTS.map((ins, i) => (
              <tr
                key={ins.name}
                className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="px-4 py-2 font-medium text-gray-900">
                  {ins.name}
                </td>
                <td className="px-4 py-2 text-gray-700">
                  <a
                    href={`tel:${ins.phone.replace(/\s/g, '')}`}
                    className="text-blue-600 hover:underline whitespace-nowrap"
                  >
                    {ins.phone}
                  </a>
                </td>
                <td className="px-4 py-2 hidden sm:table-cell">
                  <a
                    href={`https://${ins.claimsUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-xs"
                  >
                    {ins.claimsUrl}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ─── Document Checklist ──────────────────────────────────────

function DocumentChecklistSection() {
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const toggle = (i: number) => {
    setChecked((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  return (
    <section id="documents" className="mb-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
        <FileText className="h-6 w-6 text-red-600" />
        Document Checklist
      </h2>
      <p className="text-gray-600 text-sm mb-4">
        Gather these before your insurer&apos;s assessor arrives.
      </p>

      <div className="space-y-2">
        {DOCUMENT_CHECKLIST.map((doc, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className={`w-full text-left flex items-start gap-3 p-3 rounded-lg border transition-colors ${
              checked[i]
                ? 'bg-green-50 border-green-200'
                : 'bg-white border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div
              className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center ${
                checked[i]
                  ? 'bg-green-600 border-green-600'
                  : 'border-gray-300'
              }`}
            >
              {checked[i] && <Check className="h-3 w-3 text-white" />}
            </div>
            <div className="flex-grow">
              <span
                className={`text-sm ${
                  checked[i]
                    ? 'text-green-700 line-through'
                    : 'text-gray-900'
                }`}
              >
                {doc.item}
              </span>
              {doc.priority === 'high' && !checked[i] && (
                <span className="ml-2 text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
                  Priority
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

// ─── Billing Transparency ────────────────────────────────────

function BillingInfo() {
  return (
    <section className="mb-10">
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
        <h3 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          How Billing Works
        </h3>
        <p className="text-amber-700 text-sm leading-relaxed">
          Your contractor bills you directly &mdash; not your insurance company.
          This means work starts immediately with no insurer approval delays.
          Your contractor provides full documentation (photos, scope of works,
          reports) that you submit to your insurer for reimbursement. Payment
          plans are available through{' '}
          <a
            href="https://www.bluefirefinance.com.au"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline"
          >
            Blue Fire Finance
          </a>
          .
        </p>
      </div>
    </section>
  );
}

// ─── Main Page Component ─────────────────────────────────────

function ClaimSupportPageContent() {
  const params = useParams();
  const claimId = params.claimId as string;

  // Format today as a placeholder for the [DATE] in questions
  const claimDate = new Date().toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Default state — in production this would come from claim data
  const claimState = 'QLD';

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-10">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Your Claim Support Pack
            </h1>
            <p className="text-blue-200 text-lg">
              Important contacts, your rights, and what to expect next
            </p>
            <p className="text-blue-300 text-sm mt-3">
              Claim Reference: <strong className="text-white">{claimId}</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Navigation tabs (sticky) */}
      <div className="bg-white border-b sticky top-20 z-40 print:hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto flex gap-1 overflow-x-auto py-2">
            {[
              { id: 'timeline', label: 'Timeline', icon: Clock },
              { id: 'questions', label: 'Questions', icon: HelpCircle },
              { id: 'rights', label: 'Rights', icon: Scale },
              { id: 'contacts', label: 'Contacts', icon: Phone },
              { id: 'documents', label: 'Checklist', icon: FileText },
            ].map((tab) => (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors whitespace-nowrap"
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Emergency tip */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 print:hidden">
            <p className="text-red-800 text-sm font-medium">
              If you or anyone is in immediate danger, call{' '}
              <a
                href="tel:000"
                className="font-bold underline"
              >
                000
              </a>{' '}
              first.
            </p>
          </div>

          <ClaimTimeline />
          <QuestionsSection claimDate={claimDate} />
          <KnowYourRights />
          <ExpertContacts state={claimState} />
          <InsurerDirectory />
          <DocumentChecklistSection />
          <BillingInfo />

          {/* Disclaimer */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <p className="text-gray-400 text-xs leading-relaxed">
              This page contains general information only and does not constitute
              legal, financial, or insurance advice. For advice specific to your
              claim, please contact the organisations listed above &mdash; they
              are free and independent. All phone numbers and URLs verified
              February 2026. Next review due August 2026.
            </p>
          </div>

          {/* Back to track */}
          <div className="mt-6 text-center print:hidden">
            <Link
              href={`/track/${claimId}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Track Your Claim
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ClaimSupportPage() {
  if (!FEATURE_FLAGS.ANTIGRAVITY_UI) {
    return <ClaimSupportPageContent />;
  }

  return (
    <>
      <AntigravityNavbar />
      <ClaimSupportPageContent />
      <AntigravityFooter />
    </>
  );
}
