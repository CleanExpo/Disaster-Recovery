'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Clock,
  FileText,
  MessageSquare,
  Send,
  Download,
  Shield,
  AlertCircle,
  User,
  Calendar,
  Edit3,
  Eye,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Mail,
  Phone,
  Lock,
  CheckSquare
} from 'lucide-react';
import { 
  JobEstimate, 
  EstimateApproval, 
  ApprovalStatus,
  DigitalSignature,
  LegalConsent 
} from '@/types/estimate-generation';

interface ClientApprovalWorkflowProps {
  estimate: JobEstimate;
  clientId: string;
  onApproval?: (approval: EstimateApproval) => void;
  onRejection?: (reason: string) => void;
  onRequestRevision?: (comments: string) => void;
}

interface SignatureData {
  data: string;
  timestamp: string;
}

const ClientApprovalWorkflow: React.FC<ClientApprovalWorkflowProps> = ({
  estimate,
  clientId,
  onApproval,
  onRejection,
  onRequestRevision
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [reviewComments, setReviewComments] = useState('');
  const [approvalDecision, setApprovalDecision] = useState<'approve' | 'reject' | 'revise' | null>(null);
  const [signature, setSignature] = useState<SignatureData | null>(null);
  const [consent, setConsent] = useState<LegalConsent>({
    termsAccepted: false,
    privacyAccepted: false,
    scopeAcknowledged: false,
    estimateDisclaimer: false,
    variationClause: false,
    consumerRights: false,
    timestamp: ''
  });
  const [isDrawing, setIsDrawing] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [sentCode, setSentCode] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const steps = [
    { id: 1, name: 'Review Estimate', icon: Eye },
    { id: 2, name: 'Provide Feedback', icon: MessageSquare },
    { id: 3, name: 'Legal Consent', icon: Shield },
    { id: 4, name: 'Digital Signature', icon: Edit3 },
    { id: 5, name: 'Confirmation', icon: CheckCircle }
  ];

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#1e40af';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
      }
    }
  }, [currentStep]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.stroke();
      }
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    setSignature(null);
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const signatureData = canvas.toDataURL();
      setSignature({
        data: signatureData,
        timestamp: new Date().toISOString()
      });
    }
  };

  const sendVerificationCode = () => {
    // Simulate sending verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('Verification code sent:', code);
    setSentCode(true);
    // In production, this would send an SMS or email
  };

  const handleFinalSubmit = () => {
    if (!signature || !allConsentsGiven()) {
      alert('Please complete all required fields');
      return;
    }

    const approval: EstimateApproval = {
      id: `approval-${Date.now()}`,
      type: 'client',
      status: approvalDecision === 'approve' ? 'approved' : 
             approvalDecision === 'reject' ? 'rejected' : 'conditional',
      approverName: 'Client Name', // Would come from actual client data
      approverEmail: 'client@example.com',
      approverRole: 'Property Owner',
      comments: reviewComments,
      signature: {
        signatureData: signature.data,
        signedAt: signature.timestamp,
        verificationCode: verificationCode,
        legally_binding: true,
        consent: {
          ...consent,
          timestamp: new Date().toISOString()
        }
      },
      approvedAt: new Date().toISOString(),
      documentVersion: estimate.version
    };

    if (approvalDecision === 'approve') {
      onApproval?.(approval);
    } else if (approvalDecision === 'reject') {
      onRejection?.(reviewComments);
    } else if (approvalDecision === 'revise') {
      onRequestRevision?.(reviewComments);
    }

    setCurrentStep(5);
  };

  const allConsentsGiven = () => {
    return Object.entries(consent)
      .filter(([key]) => key !== 'timestamp')
      .every(([_, value]) => value === true);
  };

  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };

  const getStepColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-600';
      case 'current': return 'bg-blue-600';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const status = getStepStatus(step.id);
            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getStepColor(status)} text-white`}>
                    {status === 'completed' ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      <Icon className="h-6 w-6" />
                    )}
                  </div>
                  <span className="mt-2 text-xs font-medium text-gray-900">{step.name}</span>
                </div>
                {idx < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 ${
                    step.id < currentStep ? 'bg-green-600' : 'bg-gray-300'
                  }`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Step 1: Review Estimate */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Review Your Estimate</h2>
            
            <div className="bg-blue-50 border border-blue-200 rounded p-4">
              <h3 className="font-semibold mb-2">Estimate #{estimate.estimateNumber}</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="ml-2 font-bold">${estimate.totals.total.toLocaleString('en-AU', { minimumFractionDigits: 2 })}</span>
                </div>
                <div>
                  <span className="text-gray-600">Valid Until:</span>
                  <span className="ml-2">{new Date(estimate.validUntil).toLocaleDateString('en-AU')}</span>
                </div>
                <div>
                  <span className="text-gray-600">Work Duration:</span>
                  <span className="ml-2">{estimate.scope.timeline.estimatedDuration} days</span>
                </div>
                <div>
                  <span className="text-gray-600">Phases:</span>
                  <span className="ml-2">{estimate.scope.phases.length} phases</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start p-4 bg-gray-50 rounded">
                <FileText className="h-5 w-5 mr-3 text-gray-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">Detailed Breakdown Available</h4>
                  <p className="text-sm text-gray-600">
                    View the complete estimate with line-by-line breakdown, scope of work, and price comparisons.
                  </p>
                  <button className="mt-2 text-blue-600 text-sm font-medium hover:underline">
                    View Full Estimate →
                  </button>
                </div>
              </div>

              <div className="flex items-start p-4 bg-yellow-50 rounded">
                <AlertCircle className="h-5 w-5 mr-3 text-yellow-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">Important Notice</h4>
                  <p className="text-sm text-gray-600">
                    This is an ESTIMATE only and not a fixed price quote. Final costs may vary based on actual conditions encountered during work.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Continue to Feedback
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Provide Feedback */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Provide Your Feedback</h2>
            
            <div>
              <p className="text-gray-600 mb-4">
                Please review the estimate and let us know your decision.
              </p>
              
              <div className="space-y-3">
                <label className="flex items-center p-4 border rounded cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="decision"
                    value="approve"
                    checked={approvalDecision === 'approve'}
                    onChange={(e) => setApprovalDecision(e.target.value as any)}
                    className="mr-3"
                  />
                  <ThumbsUp className="h-5 w-5 mr-3 text-green-600" />
                  <div>
                    <p className="font-semibold">Approve Estimate</p>
                    <p className="text-sm text-gray-600">I agree with the estimate and want to proceed</p>
                  </div>
                </label>

                <label className="flex items-center p-4 border rounded cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="decision"
                    value="revise"
                    checked={approvalDecision === 'revise'}
                    onChange={(e) => setApprovalDecision(e.target.value as any)}
                    className="mr-3"
                  />
                  <RefreshCw className="h-5 w-5 mr-3 text-yellow-600" />
                  <div>
                    <p className="font-semibold">Request Revision</p>
                    <p className="text-sm text-gray-600">I need some changes to the estimate</p>
                  </div>
                </label>

                <label className="flex items-center p-4 border rounded cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="decision"
                    value="reject"
                    checked={approvalDecision === 'reject'}
                    onChange={(e) => setApprovalDecision(e.target.value as any)}
                    className="mr-3"
                  />
                  <ThumbsDown className="h-5 w-5 mr-3 text-red-600" />
                  <div>
                    <p className="font-semibold">Decline Estimate</p>
                    <p className="text-sm text-gray-600">I do not wish to proceed with this estimate</p>
                  </div>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comments (Optional)
              </label>
              <textarea
                value={reviewComments}
                onChange={(e) => setReviewComments(e.target.value)}
                className="w-full h-32 px-3 py-2 border rounded resize-none"
                placeholder="Please provide any additional comments or specific changes needed..."
              />
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-6 py-3 border border-gray-300 rounded hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={() => approvalDecision && setCurrentStep(3)}
                disabled={!approvalDecision}
                className={`px-6 py-3 rounded ${
                  approvalDecision 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Legal Consent */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Legal Consent & Acknowledgments</h2>
            
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-sm text-gray-600">
                Please review and accept the following terms and conditions to proceed with your {approvalDecision} decision.
              </p>
            </div>

            <div className="space-y-4">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={consent.termsAccepted}
                  onChange={(e) => setConsent({...consent, termsAccepted: e.target.checked})}
                  className="mt-1 mr-3"
                />
                <div>
                  <p className="font-semibold">Terms and Conditions</p>
                  <p className="text-sm text-gray-600">
                    I have read and accept the terms and conditions of service
                  </p>
                </div>
              </label>

              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={consent.privacyAccepted}
                  onChange={(e) => setConsent({...consent, privacyAccepted: e.target.checked})}
                  className="mt-1 mr-3"
                />
                <div>
                  <p className="font-semibold">Privacy Policy</p>
                  <p className="text-sm text-gray-600">
                    I acknowledge the privacy policy and consent to data processing
                  </p>
                </div>
              </label>

              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={consent.scopeAcknowledged}
                  onChange={(e) => setConsent({...consent, scopeAcknowledged: e.target.checked})}
                  className="mt-1 mr-3"
                />
                <div>
                  <p className="font-semibold">Scope of Work</p>
                  <p className="text-sm text-gray-600">
                    I understand and accept the scope of work as outlined in the estimate
                  </p>
                </div>
              </label>

              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={consent.estimateDisclaimer}
                  onChange={(e) => setConsent({...consent, estimateDisclaimer: e.target.checked})}
                  className="mt-1 mr-3"
                />
                <div>
                  <p className="font-semibold">Estimate Disclaimer</p>
                  <p className="text-sm text-gray-600">
                    I understand this is an estimate only and actual costs may vary
                  </p>
                </div>
              </label>

              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={consent.variationClause}
                  onChange={(e) => setConsent({...consent, variationClause: e.target.checked})}
                  className="mt-1 mr-3"
                />
                <div>
                  <p className="font-semibold">Variation Clause</p>
                  <p className="text-sm text-gray-600">
                    I understand that variations may be required and will be communicated
                  </p>
                </div>
              </label>

              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={consent.consumerRights}
                  onChange={(e) => setConsent({...consent, consumerRights: e.target.checked})}
                  className="mt-1 mr-3"
                />
                <div>
                  <p className="font-semibold">Consumer Rights</p>
                  <p className="text-sm text-gray-600">
                    I acknowledge my rights under Australian Consumer Law
                  </p>
                </div>
              </label>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-6 py-3 border border-gray-300 rounded hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentStep(4)}
                disabled={!allConsentsGiven()}
                className={`px-6 py-3 rounded ${
                  allConsentsGiven()
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Continue to Signature
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Digital Signature */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Digital Signature</h2>
            
            <div className="bg-blue-50 border border-blue-200 rounded p-4">
              <div className="flex items-start">
                <Lock className="h-5 w-5 mr-3 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-blue-900">Secure Digital Signature</p>
                  <p className="text-sm text-blue-800">
                    Your signature is legally binding and will be securely stored with 256-bit encryption.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sign Below
              </label>
              <div className="border-2 border-gray-300 rounded">
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={200}
                  className="w-full cursor-crosshair"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                />
              </div>
              <div className="mt-2 flex justify-between">
                <button
                  onClick={clearSignature}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Clear Signature
                </button>
                <button
                  onClick={saveSignature}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Save Signature
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Verification
              </label>
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded"
                  placeholder="Enter verification code"
                  disabled={!sentCode}
                />
                <button
                  onClick={sendVerificationCode}
                  disabled={sentCode}
                  className={`px-4 py-2 rounded ${
                    sentCode 
                      ? 'bg-gray-300 text-gray-500' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {sentCode ? 'Code Sent' : 'Send Code'}
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                A verification code will be sent to your registered email/phone
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
              <p className="text-sm">
                By signing, I confirm that I am authorised to approve this estimate and that all information provided is accurate.
              </p>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep(3)}
                className="px-6 py-3 border border-gray-300 rounded hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={handleFinalSubmit}
                disabled={!signature || !verificationCode}
                className={`px-6 py-3 rounded ${
                  signature && verificationCode
                    ? 'bg-green-600 text-white hover:bg-green-700' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Submit {approvalDecision === 'approve' ? 'Approval' : approvalDecision === 'reject' ? 'Rejection' : 'Revision Request'}
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Confirmation */}
        {currentStep === 5 && (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              {approvalDecision === 'approve' ? (
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
              ) : approvalDecision === 'reject' ? (
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
                  <XCircle className="h-12 w-12 text-red-600" />
                </div>
              ) : (
                <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center">
                  <RefreshCw className="h-12 w-12 text-yellow-600" />
                </div>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-2">
                {approvalDecision === 'approve' ? 'Estimate Approved!' :
                 approvalDecision === 'reject' ? 'Estimate Declined' :
                 'Revision Requested'}
              </h2>
              <p className="text-gray-600">
                {approvalDecision === 'approve' 
                  ? 'Thank you for approving the estimate. We will begin work as scheduled.'
                  : approvalDecision === 'reject'
                  ? 'We understand your decision. Please let us know if you need any clarification.'
                  : 'We will review your feedback and provide a revised estimate shortly.'}
              </p>
            </div>

            <div className="bg-gray-50 rounded p-6">
              <h3 className="font-semibold mb-3">Next Steps</h3>
              {approvalDecision === 'approve' ? (
                <ul className="space-y-2 text-left">
                  <li className="flex items-start">
                    <CheckSquare className="h-5 w-5 mr-2 text-green-600 mt-0.5" />
                    <span>Work will commence on the scheduled date</span>
                  </li>
                  <li className="flex items-start">
                    <CheckSquare className="h-5 w-5 mr-2 text-green-600 mt-0.5" />
                    <span>You will receive daily progress updates</span>
                  </li>
                  <li className="flex items-start">
                    <CheckSquare className="h-5 w-5 mr-2 text-green-600 mt-0.5" />
                    <span>A project manager will contact you within 24 hours</span>
                  </li>
                </ul>
              ) : (
                <p className="text-gray-600">
                  A team member will contact you within 24 hours to discuss your feedback.
                </p>
              )}
            </div>

            <div className="flex justify-center space-x-3">
              <button className="px-6 py-3 bg-gray-600 text-white rounded hover:bg-gray-700 flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Download Confirmation
              </button>
              <button className="px-6 py-3 border border-gray-300 rounded hover:bg-gray-50">
                Return to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientApprovalWorkflow;