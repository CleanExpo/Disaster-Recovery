'use client';


import { AntigravityNavbar } from '@/components/antigravity';
import { AntigravityFooter } from '@/components/antigravity';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, ArrowRight } from 'lucide-react';

function WorkflowDemoPageOriginal() {
  const [step, setStep] = useState(0);

  const steps = [
    "Client Submits Claim + Pays $2,750",
    "Payment Processed",
    "CRM Receives Claim", 
    "Find Local Contractor",
    "Contractor Accepts",
    "Contractor Calls Client (60min)",
    "Service Delivery",
    "Payment Released"
  ];

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Workflow Demo</h1>
        <p className="text-gray-700">Complete contractor acceptance process</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Workflow Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {steps.map((stepText, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  {index <= step ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                  )}
                </div>
                <div className={`flex-1 ${index <= step ? 'text-green-700' : 'text-gray-700'}`}>
                  {stepText}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <Button onClick={nextStep} disabled={step >= steps.length - 1}>
              Next Step <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          {step >= steps.length - 1 && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <p className="text-green-800 font-medium">
                ✅ Complete workflow demonstrated! Contractor has been paid.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
export default function WorkflowDemoPage() {
  return (
    <>
      <AntigravityNavbar />
      <WorkflowDemoPageOriginal />
      <AntigravityFooter />
    </>
  );
}
