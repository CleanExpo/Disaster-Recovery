
    "use client";
    import React from 'react';

    const Page = () => (
        <div style={{
            backgroundColor: 'rgba(20, 24, 32, 0.95)', // Dark navy/slate
            color: 'white',
            padding: '20px',
            borderRadius: '10px',
            backdropFilter: 'blur(10px)' // Glassmorphic effect
        }}>
            <header>
                <h1>Cost Estimate</h1>
                <h2>Get a transparent, professional estimate based on NRPG industry rates</h2>
            </header>
            <div>
                <div className="job-types">
                    <div className="job-type">🚒 Emergency Repairs</div>
                    <div className="job-type">👷‍♂️ Construction</div>
                    <div className="job-type">🛠 Renovation</div>
                    <div className="job-type">🧹 Cleaning</div>
                    <div className="job-type">🛡 Protection</div>
                </div>
                <form method="post" action="/api/calculate">
                    <!-- Rest of the input fields expected by the API -->
                    <button type="submit" style={{
                        backgroundColor: 'orange',
                        borderRadius: '5px',
                        margin: '20px 0'
                    }}>
                        Get Estimate
                    </button>
                </form>
                <div className="results-table">
                    <!-- Results table with dark rows and orange accents -->
                </div>
                <p className="disclaimer">NRPG Disclaimer: The estimates are based on industry standards.</p>
                <div className="loading-spinner">Loading...</div>
                <div className="error-state">An error occurred. Please try again later.</div>
            </div>
        </div>
    );

    export default Page;
    