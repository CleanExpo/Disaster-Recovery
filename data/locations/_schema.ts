import { z } from 'zod';

const RiskEntrySchema = z.object({
  type: z.string(),
  severity: z.enum(['high', 'moderate', 'low']),
  description: z.string().min(20),
});

const SuburbEntrySchema = z.object({
  name: z.string(),
  slug: z.string(),
  population: z.number().optional(),
  riskNote: z.string().optional(),
});

const LocationDataSchema = z.object({
  slug: z.string(),
  city: z.string(),
  state: z.string(),
  stateFullName: z.string(),
  population: z.number(),
  dwellings: z.number().optional(),
  elevation: z.number(),
  coordinates: z.object({ lat: z.number(), lng: z.number() }),
  timezone: z.string(),

  climate: z.object({
    annualRainfallMm: z.number(),
    avgMaxTempC: z.number(),
    avgMinTempC: z.number(),
    avgHumidityPercent: z.number(),
    wetMonths: z.array(z.string()),
    dryMonths: z.array(z.string()),
    rainfallSeasonality: z.string().optional(),
    cycloneSeason: z.string().optional(),
    frostRisk: z.boolean(),
    coastalExposure: z.boolean(),
  }),

  risks: z.object({
    primary: z.array(RiskEntrySchema).min(2),
    secondary: z.array(RiskEntrySchema),
    bushfireAttackLevel: z.string().optional(),
    floodZone: z.string().optional(),
    cycloneCategory: z.string().optional(),
    stormSurgeRisk: z.boolean().optional(),
  }),

  historicalEvents: z.array(z.object({
    year: z.number(),
    event: z.string(),
    description: z.string(),
    insuranceCostAud: z.string().optional(),
  })).min(1),

  suburbs: z.array(SuburbEntrySchema).min(3),
  regions: z.array(z.string()).min(1),

  council: z.object({
    name: z.string(),
    emergencyUrl: z.string().optional(),
    sesUnit: z.string().optional(),
  }),

  insuranceProfile: z.object({
    topClaimType: z.string(),
    avgClaimValueAud: z.string().optional(),
    claimsPerCapita: z.string().optional(),
    icaRegion: z.string().optional(),
  }),

  serviceNotes: z.object({
    waterDamage: z.string().optional(),
    fireDamage: z.string().optional(),
    mouldRemediation: z.string().optional(),
    stormDamage: z.string().optional(),
    floodRecovery: z.string().optional(),
    emergencyRestoration: z.string().optional(),
  }),

  seasonalRisks: z.array(z.object({
    month: z.string(),
    risks: z.array(z.string()),
  })),

  sourceUrls: z.array(z.string()).optional(),
});

export { LocationDataSchema, RiskEntrySchema, SuburbEntrySchema };
export type LocationData = z.infer<typeof LocationDataSchema>;
export type RiskEntry = z.infer<typeof RiskEntrySchema>;
export type SuburbEntry = z.infer<typeof SuburbEntrySchema>;
