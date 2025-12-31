export const AU_GST_RATE = 0.1;

export interface GstBreakdown {
  totalAUD: number;
  exGstAUD: number;
  gstAUD: number;
  gstInclusive: boolean;
}

export function calculateGstBreakdown(totalAUD: number, gstInclusive: boolean): GstBreakdown {
  if (gstInclusive) {
    const exGstAUD = round2(totalAUD / (1 + AU_GST_RATE));
    const gstAUD = round2(totalAUD - exGstAUD);
    return { totalAUD: round2(totalAUD), exGstAUD, gstAUD, gstInclusive: true };
  }

  const gstAUD = round2(totalAUD * AU_GST_RATE);
  const inclusiveTotal = round2(totalAUD + gstAUD);
  return { totalAUD: inclusiveTotal, exGstAUD: round2(totalAUD), gstAUD, gstInclusive: false };
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

