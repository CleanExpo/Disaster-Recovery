
"use client";
import React, { useState } from 'react';

const JobTypeSelector = ({ onSelect }) => {
  const jobTypes = [
    { type: 'Water & Flood Damage', description: 'Flood restoration services', icon: '💧' },
    { type: 'Mould & Air Quality', description: 'Mould remediation services', icon: '🌀' },
    { type: 'Fire & Smoke Damage', description: 'Fire damage restoration', icon: '🔥' },
    { type: 'Storm Damage', description: 'Storm and roof damage', icon: '🌩️' },
    { type: 'Biohazard & Sewage', description: 'Hazard cleanup', icon: '🧪' }
  ];
  
  return (
    <div className="grid grid-cols-2 gap-4">
      {jobTypes.map(({ type, description, icon }) => (
        <button key={type} className="bg-blue-500 text-white p-4 rounded-md" onClick={() => onSelect(type)}>
          <div className="text-xl">{icon}</div>
          <div className="mt-2 font-bold">{type}</div>
          <div className="text-sm">{description}</div>
        </button>
      ))}
    </div>
  );
};

const JobInputForm = ({ jobType, onCalculate }) => {
  const [inputs, setInputs] = useState({});
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputs({ ...inputs, [name]: type === 'checkbox' ? checked : value });
  };

  const jobInputs = {
    'Water & Flood Damage': [
      { label: 'Affected area in m²', name: 'area_m2', type: 'number' },
      { label: 'Number of rooms', name: 'affected_rooms', type: 'number' },
      { label: 'Drying days needed', name: 'days_drying', type: 'number' }
    ],
    'Mould & Air Quality': [
      { label: 'Affected area in m²', name: 'area_m2', type: 'number' },
      { label: 'Containment required', name: 'containment_required', type: 'checkbox' }
    ],
    'Fire & Smoke Damage': [
      { label: 'Affected area in m²', name: 'area_m2', type: 'number' },
      { label: 'Number of rooms', name: 'affected_rooms', type: 'number' },
      { label: 'Has odour treatment', name: 'has_odour_treatment', type: 'checkbox' }
    ],
    'Storm Damage': [
      { label: 'Affected area in m²', name: 'area_m2', type: 'number' },
      { label: 'Roof damage', name: 'roof_damage', type: 'checkbox' },
      { label: 'Structural assessment needed', name: 'structural_assessment', type: 'checkbox' }
    ],
    'Biohazard & Sewage': [
      { label: 'Affected area in m²', name: 'area_m2', type: 'number' },
      { label: 'Hazard level', name: 'hazard_level', type: 'select', options: ['Low', 'Medium', 'High'] }
    ]
  };

  return (
    <div className="mt-4">
      {jobInputs[jobType].map(({ label, name, type, options }) => (
        <div key={name} className="mb-4">
          <label className="block mb-2 font-bold">{label}</label>
          {type === 'select' ? (
            <select name={name} onChange={handleChange} className="w-full border p-2">
              {options.map(option => <option key={option}>{option}</option>)}
            </select>
          ) : (
            <input
              type={type}
              name={name}
              onChange={handleChange}
              className="w-full border p-2"
            />
          )}
        </div>
      ))}
      <button onClick={() => onCalculate(jobType, inputs)} className="bg-green-500 text-white p-4 rounded-md">Calculate</button>
    </div>
  );
};

const EstimatePage = () => {
  const [step, setStep] = useState(1);
  const [jobType, setJobType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleSelectJobType = (type) => {
    setJobType(type);
    setStep(2);
  };

  const handleCalculate = async (jobType, inputs) => {
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await fetch('/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ job_type: jobType, inputs })
      });
      if (!res.ok) throw new Error('Calculation failed');
      const data = await res.json();
      setResult(data);
      setStep(3);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Cost Estimate</h1>
      {step === 1 && <JobTypeSelector onSelect={handleSelectJobType} />}
      {step === 2 && <JobInputForm jobType={jobType} onCalculate={handleCalculate} />}
      {step === 3 && result && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Estimate Result</h2>
          <table className="w-full mb-4">
            <thead>
              <tr>
                <th className="border-b p-2">Name</th>
                <th className="border-b p-2">Quantity</th>
                <th className="border-b p-2">Unit Rate</th>
                <th className="border-b p-2">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {result.items.map(({ name, quantity, unit_rate, subtotal }) => (
                <tr key={name}>
                  <td className="border-b p-2">{name}</td>
                  <td className="border-b p-2">{quantity}</td>
                  <td className="border-b p-2">{unit_rate}</td>
                  <td className="border-b p-2">{subtotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mb-4">
            <strong>Subtotal (ex GST):</strong> {result.subtotal_ex_gst}
          </div>
          <div className="mb-4">
            <strong>GST:</strong> {result.gst}
          </div>
          <div className="mb-4">
            <strong>Total (inc GST):</strong> {result.total_inc_gst}
          </div>
          <div className="mb-4 italic text-sm">
            <strong>Disclaimer:</strong> This estimate is based on the NRPG professional rate schedule. Final costs may vary based on site inspection. Minimum charge $2,750 ex GST applies.
          </div>
        </div>
      )}
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-red-500 text-center">{error}</div>}
    </div>
  );
};

export default EstimatePage;
