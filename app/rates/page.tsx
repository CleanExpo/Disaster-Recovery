
'use client';
import React from 'react';

function NRPGRateSchedule() {
    const rates = {
        "Water Damage": [
            { "Service Item": "Callout/Assessment", "Unit": "$350 per job", "Rate": "" },
            { "Service Item": "Labour", "Unit": "$145 per hour", "Rate": "" },
            { "Service Item": "Water Extraction Cat1", "Unit": "$12 per m2", "Rate": "" },
            { "Service Item": "Dehumidifier", "Unit": "$95 per day", "Rate": "" },
            { "Service Item": "Air Mover", "Unit": "$55 per day", "Rate": "" },
            { "Service Item": "Structural Drying", "Unit": "$185 per day", "Rate": "" },
        ],
        "Mould Remediation": [
            { "Service Item": "Callout", "Unit": "$350 per job", "Rate": "" },
            { "Service Item": "Labour", "Unit": "$145/hr", "Rate": "" },
            { "Service Item": "Mould Treatment", "Unit": "$18/m2", "Rate": "" },
            { "Service Item": "Containment Setup", "Unit": "$450 per job", "Rate": "" },
            { "Service Item": "HEPA Vacuuming", "Unit": "$8/m2", "Rate": "" },
            { "Service Item": "Antimicrobial Treatment", "Unit": "$14/m2", "Rate": "" },
        ],
        "Fire & Smoke": [
            { "Service Item": "Callout", "Unit": "$350", "Rate": "" },
            { "Service Item": "Labour", "Unit": "$145/hr", "Rate": "" },
            { "Service Item": "Smoke Cleaning", "Unit": "$16/m2", "Rate": "" },
            { "Service Item": "Deodorisation", "Unit": "$12/m2", "Rate": "" },
            { "Service Item": "Ozone Treatment", "Unit": "$650 per job", "Rate": "" },
        ],
        "Storm Damage": [
            { "Service Item": "Callout", "Unit": "$350", "Rate": "" },
            { "Service Item": "Labour", "Unit": "$145/hr", "Rate": "" },
            { "Service Item": "Tarping", "Unit": "$22/m2", "Rate": "" },
            { "Service Item": "Debris Removal", "Unit": "$180/m3", "Rate": "" },
            { "Service Item": "Structural Assessment", "Unit": "$550 per job", "Rate": "" },
        ],
        "Biohazard": [
            { "Service Item": "Callout", "Unit": "$350", "Rate": "" },
            { "Service Item": "Labour", "Unit": "$145/hr", "Rate": "" },
            { "Service Item": "Biohazard Cleaning", "Unit": "$45/m2", "Rate": "" },
            { "Service Item": "Waste Disposal", "Unit": "$35/bag", "Rate": "" },
            { "Service Item": "Sanitisation", "Unit": "$28/m2", "Rate": "" },
        ]
    };

    return (
        <div style={{ padding: '20px', backgroundColor: 'rgba(0, 0, 0, 0.8)', color: '#fff', borderRadius: '8px' }}>
            <h1>NRPG Professional Rate Schedule</h1>
            <h2>National Recovery Platform Group — Transparent pricing for contractors and insurers</h2>
            {Object.entries(rates).map(([category, items]) => (
                <section key={category} style={{ margin: '20px 0', padding: '10px', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px' }}>
                    <h3>{category}</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ borderBottom: '1px solid #fff' }}>Service Item</th>
                                <th style={{ borderBottom: '1px solid #fff' }}>Unit</th>
                                <th style={{ borderBottom: '1px solid #fff' }}>Rate (AUD ex GST)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item => (
                                <tr key={item['Service Item']}>
                                    <td style={{ borderBottom: '1px solid #ccc', padding: '4px' }}>{item['Service Item']}</td>
                                    <td style={{ borderBottom: '1px solid #ccc', padding: '4px' }}>{item.Unit}</td>
                                    <td style={{ borderBottom: '1px solid #ccc', padding: '4px' }}>{item.Rate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            ))}
            <div style={{ marginTop: '20px', padding: '10px', borderRadius: '8px', backgroundColor: 'rgba(255, 140, 0, 0.5)' }}>
                These rates are used to calculate transparent cost estimates at disasterrecovery.com.au/cost-estimate
            </div>
            <footer style={{ marginTop: '20px' }}>
                <p>Minimum charge $2,750 ex GST applies to all professional callouts. All rates exclude GST. Rates set under the NRPG Professional Framework. Last reviewed March 2026.</p>
            </footer>
        </div>
    );
}

export default NRPGRateSchedule;
