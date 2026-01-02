'use client';

import type { Contractor, IncidentLocation } from '../types';

interface EmergencyFormProps {
  incidentData: IncidentLocation | null;
  contractor: Contractor | null;
  onClose: () => void;
  onSubmit?: (data: EmergencySubmission) => void;
}

export interface EmergencySubmission {
  damageType: string;
  priorityLevel: 'standard' | 'urgent' | 'catastrophic';
  contractor: Contractor | null;
  incidentLocation: IncidentLocation | null;
}

// Emergency Work Form Component
export const EmergencyForm = ({ incidentData, contractor, onClose, onSubmit }: EmergencyFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({
        damageType: 'flood',
        priorityLevel: 'urgent',
        contractor,
        incidentLocation: incidentData,
      });
    }
  };

  return (
    <div className="fixed top-0 right-0 h-full w-[450px] bg-slate-950/60 backdrop-blur-3xl border-l border-white/10 p-8 z-[100] shadow-[-20px_0_80px_rgba(0,0,0,0.8)] animate-slide-in">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-black text-white italic tracking-tighter">EMERGENCY WORK FORM</h2>
        <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
          ✕
        </button>
      </div>

      <div className="space-y-6">
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-xs text-blue-400 uppercase font-bold tracking-widest mb-1">Assigned Responder</p>
          <p className="text-white font-mono">
            {contractor?.name || 'N/A'} — {contractor?.tier || 0}km Tier
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 uppercase font-bold">Damage Type</label>
            <select className="w-full bg-slate-900 border border-slate-700 p-3 rounded text-white focus:border-blue-500 outline-none">
              <option>Flood / Water Damage</option>
              <option>Fire / Smoke Recovery</option>
              <option>Structural Impact</option>
              <option>Storm Damage</option>
              <option>Mould Remediation</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-400 uppercase font-bold">Priority Level</label>
            <div className="flex gap-2 mt-2">
              {['Standard', 'Urgent', 'Catastrophic'].map((level) => (
                <button
                  key={level}
                  type="button"
                  className="flex-1 py-2 bg-slate-800 border border-slate-700 text-xs text-white hover:bg-red-600 transition-colors uppercase font-bold rounded"
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 uppercase font-bold">Property Address</label>
            <input
              type="text"
              placeholder="Enter property address"
              className="w-full bg-slate-900 border border-slate-700 p-3 rounded text-white focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 uppercase font-bold">Contact Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full bg-slate-900 border border-slate-700 p-3 rounded text-white focus:border-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-red-600 text-white font-black uppercase tracking-widest rounded shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:bg-red-500 transition-all mt-8"
          >
            Dispatch Recovery Team
          </button>
        </form>
      </div>
    </div>
  );
};
