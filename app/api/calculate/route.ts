
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { job_type, inputs } = body;
    if (!job_type || !inputs) {
        return NextResponse.json({error: 'Invalid input. Please provide job_type and inputs.'}, {status: 400});
    }

    let calculationResult;
    switch (job_type) {
        case 'water_damage':
            calculationResult = calculateWaterDamage(inputs);
            break;
        case 'mould_remediation':
            calculationResult = calculateMouldRemediation(inputs);
            break;
        case 'fire_smoke':
            calculationResult = calculateFireSmoke(inputs);
            break;
        case 'storm_damage':
            calculationResult = calculateStormDamage(inputs);
            break;
        case 'biohazard':
            calculationResult = calculateBiohazard(inputs);
            break;
        default:
            return NextResponse.json({error: 'Unknown job type.'}, {status: 400});
    }

    return NextResponse.json(calculationResult);
}

function calculateWaterDamage(inputs) {
    const rate = 18;
    const subtotal = rate * inputs.area;
    const subtotalExGst = Math.max(subtotal, 2750);
    const gstAmount = subtotalExGst * 0.1;
    const totalIncGst = subtotalExGst + gstAmount;
    return {
        job_type: 'water_damage',
        inputs_received: inputs,
        line_items: [
            { name: 'Extraction', rate_source: 'NRPG', quantity: inputs.area, unit_rate: rate, subtotal }
        ],
        subtotal_ex_gst: subtotalExGst,
        gst_amount: gstAmount,
        total_inc_gst: totalIncGst,
        minimum_applied: subtotalExGst === 2750,
        validation_band: { p25: 3024, median: 8671, p75: 9557 }
    };
}

function calculateMouldRemediation(inputs) {
    return { job_type: 'mould_remediation', ... };
}

function calculateFireSmoke(inputs) {
    return { job_type: 'fire_smoke', ... };
}

function calculateStormDamage(inputs) {
    return { job_type: 'storm_damage', ... };
}

function calculateBiohazard(inputs) {
    return { job_type: 'biohazard', ... };
}
