"use client";

import React, { useMemo, useState } from "react";

type JobType = "water_damage" | "mould_remediation" | "fire_smoke" | "storm_damage" | "biohazard";
type FieldType = "number" | "checkbox" | "select";

type JobField = {
  label: string;
  name: string;
  type: FieldType;
  options?: string[];
  required?: boolean;
};

type EstimateResult = {
  job_type: JobType;
  items: Array<{ name: string; quantity: number; unit_rate: number; subtotal: number }>;
  subtotal_ex_gst: number;
  gst_amount: number;
  total_inc_gst: number;
  minimum_applied: boolean;
};

const JOB_TYPES: Array<{ key: JobType; label: string; description: string }> = [
  { key: "water_damage", label: "Water & Flood Damage", description: "Flood restoration services" },
  { key: "mould_remediation", label: "Mould & Air Quality", description: "Mould remediation services" },
  { key: "fire_smoke", label: "Fire & Smoke Damage", description: "Fire damage restoration" },
  { key: "storm_damage", label: "Storm Damage", description: "Storm and roof damage" },
  { key: "biohazard", label: "Biohazard & Sewage", description: "Hazard cleanup" }
];

const JOB_INPUTS: Record<JobType, JobField[]> = {
  water_damage: [
    { label: "Affected area in m2", name: "area_m2", type: "number", required: true },
    { label: "Number of rooms", name: "affected_rooms", type: "number" },
    { label: "Drying days needed", name: "days_drying", type: "number" }
  ],
  mould_remediation: [
    { label: "Affected area in m2", name: "area_m2", type: "number", required: true },
    { label: "Containment required", name: "containment_required", type: "checkbox" }
  ],
  fire_smoke: [
    { label: "Affected area in m2", name: "area_m2", type: "number", required: true },
    { label: "Number of rooms", name: "affected_rooms", type: "number" },
    { label: "Has odour treatment", name: "has_odour_treatment", type: "checkbox" }
  ],
  storm_damage: [
    { label: "Affected area in m2", name: "area_m2", type: "number", required: true },
    { label: "Roof damage", name: "roof_damage", type: "checkbox" },
    { label: "Structural assessment needed", name: "structural_assessment", type: "checkbox" }
  ],
  biohazard: [
    { label: "Affected area in m2", name: "area_m2", type: "number", required: true },
    { label: "Hazard level", name: "hazard_level", type: "select", options: ["Low", "Medium", "High"] }
  ]
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 2
  }).format(value);
}

function JobTypeSelector({ onSelect }: { onSelect: (jobType: JobType) => void }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {JOB_TYPES.map(({ key, label, description }) => (
        <button
          key={key}
          type="button"
          className="rounded-md bg-blue-500 p-4 text-left text-white transition hover:bg-blue-600"
          onClick={() => onSelect(key)}
        >
          <div className="font-bold">{label}</div>
          <div className="mt-1 text-sm text-blue-100">{description}</div>
        </button>
      ))}
    </div>
  );
}

function JobInputForm({
  jobType,
  loading,
  onBack,
  onCalculate
}: {
  jobType: JobType;
  loading: boolean;
  onBack: () => void;
  onCalculate: (jobType: JobType, inputs: Record<string, string | boolean>) => void;
}) {
  const [inputs, setInputs] = useState<Record<string, string | boolean>>({});
  const fields = JOB_INPUTS[jobType];

  const canSubmit = useMemo(() => {
    return fields.every((field) => {
      if (!field.required || field.type !== "number") return true;
      const value = inputs[field.name];
      return typeof value === "string" && value.trim() !== "" && Number(value) > 0;
    });
  }, [fields, inputs]);

  const handleChange = (name: string, type: FieldType, value: string, checked: boolean) => {
    setInputs((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  return (
    <div className="mt-4">
      {fields.map(({ label, name, type, options, required }) => (
        <div key={name} className="mb-4">
          <label className="mb-2 block font-bold">
            {label}
            {required ? " *" : ""}
          </label>
          {type === "select" ? (
            <select
              name={name}
              value={String(inputs[name] || "Medium")}
              onChange={(event) => handleChange(name, type, event.target.value, false)}
              className="w-full rounded-md border p-2"
            >
              {(options || []).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : type === "checkbox" ? (
            <input
              type="checkbox"
              name={name}
              checked={Boolean(inputs[name])}
              onChange={(event) => handleChange(name, type, "", event.target.checked)}
              className="h-5 w-5"
            />
          ) : (
            <input
              type="number"
              name={name}
              min={0}
              value={String(inputs[name] || "")}
              onChange={(event) => handleChange(name, type, event.target.value, false)}
              className="w-full rounded-md border p-2"
            />
          )}
        </div>
      ))}

      <div className="flex gap-3">
        <button type="button" onClick={onBack} className="rounded-md border px-4 py-2">
          Back
        </button>
        <button
          type="button"
          onClick={() => onCalculate(jobType, inputs)}
          disabled={loading || !canSubmit}
          className="rounded-md bg-green-500 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Calculating..." : "Calculate"}
        </button>
      </div>
    </div>
  );
}

export default function EstimatePage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [jobType, setJobType] = useState<JobType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<EstimateResult | null>(null);

  const handleSelectJobType = (selectedJobType: JobType) => {
    setJobType(selectedJobType);
    setError("");
    setResult(null);
    setStep(2);
  };

  const handleCalculate = async (selectedJobType: JobType, inputs: Record<string, string | boolean>) => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job_type: selectedJobType, inputs })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Calculation failed");

      setResult(data as EstimateResult);
      setStep(3);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to calculate estimate right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl p-8">
      <h1 className="mb-4 text-3xl font-bold">Cost Estimate</h1>
      <p className="mb-6 text-sm text-gray-600">
        Indicative pricing only. Work begins immediately, and we bill you directly with full claims documentation for insurer reimbursement.
      </p>

      {step === 1 && <JobTypeSelector onSelect={handleSelectJobType} />}
      {step === 2 && jobType && (
        <JobInputForm
          jobType={jobType}
          loading={loading}
          onBack={() => setStep(1)}
          onCalculate={handleCalculate}
        />
      )}

      {step === 3 && result && (
        <div>
          <h2 className="mb-4 text-2xl font-bold">Estimate Result</h2>
          <table className="mb-4 w-full">
            <thead>
              <tr>
                <th className="border-b p-2 text-left">Name</th>
                <th className="border-b p-2 text-right">Quantity</th>
                <th className="border-b p-2 text-right">Unit Rate</th>
                <th className="border-b p-2 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {result.items.map(({ name, quantity, unit_rate, subtotal }) => (
                <tr key={name}>
                  <td className="border-b p-2">{name}</td>
                  <td className="border-b p-2 text-right">{quantity}</td>
                  <td className="border-b p-2 text-right">{formatCurrency(unit_rate)}</td>
                  <td className="border-b p-2 text-right">{formatCurrency(subtotal)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mb-2">
            <strong>Subtotal (ex GST):</strong> {formatCurrency(result.subtotal_ex_gst)}
          </div>
          <div className="mb-2">
            <strong>GST:</strong> {formatCurrency(result.gst_amount)}
          </div>
          <div className="mb-4">
            <strong>Total (inc GST):</strong> {formatCurrency(result.total_inc_gst)}
          </div>
          {result.minimum_applied && (
            <div className="mb-4 rounded-md bg-amber-50 p-3 text-sm text-amber-900">
              Minimum charge of {formatCurrency(2750)} ex GST has been applied.
            </div>
          )}
          <button type="button" onClick={() => setStep(1)} className="rounded-md border px-4 py-2">
            Start new estimate
          </button>
        </div>
      )}

      {loading && step !== 2 && <div className="text-center">Loading...</div>}
      {error && <div className="mt-4 text-center text-red-600">{error}</div>}
    </div>
  );
}
