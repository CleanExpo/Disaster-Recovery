'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../training.module.css';

export default function Day12Module() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<{[key: string]: string}>({});

  const markSectionComplete = (section: string) => {
    if (!completedSections.includes(section)) {
      setCompletedSections([...completedSections, section]);
    }
  };

  const handleQuizAnswer = (question: string, answer: string) => {
    setQuizAnswers({ ...quizAnswers, [question]: answer });
  };

  const calculateProgress = () => {
    const totalSections = 5;
    return Math.round((completedSections.length / totalSections) * 100);
  };

  return (
    <div className={styles.moduleContainer}>
      {/* Sidebar Navigation */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <Link href="/portal/training" className={styles.backLink}>
            ← Back to Training Hub
          </Link>
          <h2>Day 12: Business Ops</h2>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${calculateProgress()}%` }}
            />
          </div>
          <span className={styles.progressText}>{calculateProgress()}% Complete</span>
        </div>

        <nav className={styles.sidebarNav}>
          <button 
            className={`${styles.navItem} ${activeTab === 'overview' ? styles.active : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Module Overview
          </button>
          <button 
            className={`${styles.navItem} ${activeTab === 'business' ? styles.active : ''}`}
            onClick={() => setActiveTab('business')}
          >
            Business Fundamentals
          </button>
          <button 
            className={`${styles.navItem} ${activeTab === 'insurance' ? styles.active : ''}`}
            onClick={() => setActiveTab('insurance')}
          >
            Insurance Processes
          </button>
          <button 
            className={`${styles.navItem} ${activeTab === 'customer' ? styles.active : ''}`}
            onClick={() => setActiveTab('customer')}
          >
            Customer Service
          </button>
          <button 
            className={`${styles.navItem} ${activeTab === 'compliance' ? styles.active : ''}`}
            onClick={() => setActiveTab('compliance')}
          >
            Legal & Compliance
          </button>
          <button 
            className={`${styles.navItem} ${activeTab === 'technology' ? styles.active : ''}`}
            onClick={() => setActiveTab('technology')}
          >
            Technology & Systems
          </button>
          <button 
            className={`${styles.navItem} ${activeTab === 'assessment' ? styles.active : ''}`}
            onClick={() => setActiveTab('assessment')}
          >
            Assessment
          </button>
        </nav>

        <div className={styles.sidebarFooter}>
          <button className={styles.resourcesBtn}>
            📚 Download Resources
          </button>
          <button className={styles.certificateBtn}>
            🏆 View Certificate
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        {activeTab === 'overview' && (
          <div className={styles.contentSection}>
            <h1>Day 12: Business Operations & Administration</h1>
            
            <div className={styles.learningObjectives}>
              <h2>Learning Objectives</h2>
              <ul>
                <li>Understand the restoration industry business model</li>
                <li>Master insurance claim processes and documentation</li>
                <li>Develop professional customer service skills</li>
                <li>Learn estimating and scoping principles</li>
                <li>Understand legal and compliance requirements</li>
                <li>Utilise industry technology and software systems</li>
              </ul>
            </div>

            <div className={styles.moduleStats}>
              <div className={styles.statCard}>
                <span className={styles.statIcon}>⏱️</span>
                <div>
                  <h3>Duration</h3>
                  <p>8 hours</p>
                </div>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statIcon}>📖</span>
                <div>
                  <h3>Sections</h3>
                  <p>6 modules</p>
                </div>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statIcon}>🎯</span>
                <div>
                  <h3>Assessment</h3>
                  <p>Business scenarios</p>
                </div>
              </div>
            </div>

            <button 
              className={styles.startButton}
              onClick={() => {
                setActiveTab('business');
                markSectionComplete('overview');
              }}
            >
              Start Learning →
            </button>
          </div>
        )}

        {activeTab === 'business' && (
          <div className={styles.contentSection}>
            <h1>Business Fundamentals in Restoration</h1>

            <div className={styles.infoCard}>
              <h2>💼 Industry Business Model</h2>
              <p>The restoration industry operates on an insurance-funded model where contractors provide emergency services first and payment follows through the claims process.</p>
            </div>

            <div className={styles.businessModel}>
              <h2>Revenue Streams</h2>
              
              <div className={styles.revenueGrid}>
                <div className={styles.revenueCard}>
                  <h3>Insurance Work (80-90%)</h3>
                  <ul>
                    <li>Direct insurer partnerships</li>
                    <li>Preferred supplier agreements</li>
                    <li>Builder/assessor referrals</li>
                    <li>Broker relationships</li>
                    <li>Stable, predictable income</li>
                  </ul>
                </div>

                <div className={styles.revenueCard}>
                  <h3>Private/Cash Work (10-20%)</h3>
                  <ul>
                    <li>Uninsured losses</li>
                    <li>Below excess claims</li>
                    <li>Preventative maintenance</li>
                    <li>Commercial contracts</li>
                    <li>Emergency response fees</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.pricingStructure}>
              <h2>💰 Pricing & Estimating</h2>
              
              <div className={styles.pricingGrid}>
                <div>
                  <h3>Estimating Software</h3>
                  <ul>
                    <li><strong>Xactimate:</strong> Industry standard in Australia</li>
                    <li><strong>Pricing:</strong> Uses market rates database</li>
                    <li><strong>Line Items:</strong> Detailed scope breakdown</li>
                    <li><strong>Sketching:</strong> Floor plans and measurements</li>
                    <li><strong>Integration:</strong> Direct to insurer systems</li>
                  </ul>
                </div>

                <div>
                  <h3>Pricing Components</h3>
                  <ul>
                    <li><strong>Labour:</strong> Hourly rates by trade</li>
                    <li><strong>Materials:</strong> Cost plus markup (10-20%)</li>
                    <li><strong>Equipment:</strong> Daily/weekly hire rates</li>
                    <li><strong>Overheads:</strong> 10-15% of project</li>
                    <li><strong>Profit:</strong> 10-20% margin target</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.cashFlow}>
              <h2>📈 Cash Flow Management</h2>
              <div className={styles.cashFlowTimeline}>
                <div className={styles.timelineItem}>
                  <h3>Day 1-7: Emergency Response</h3>
                  <p>Immediate costs, no payment received</p>
                </div>
                <div className={styles.timelineItem}>
                  <h3>Week 2-4: Works Progress</h3>
                  <p>Major expenses, progress claims submitted</p>
                </div>
                <div className={styles.timelineItem}>
                  <h3>Day 30-45: First Payment</h3>
                  <p>Initial progress payment received</p>
                </div>
                <div className={styles.timelineItem}>
                  <h3>Day 60-90: Final Payment</h3>
                  <p>Balance paid after completion</p>
                </div>
              </div>
            </div>

            <div className={styles.kpiCard}>
              <h2>📊 Key Performance Indicators</h2>
              <div className={styles.kpiGrid}>
                <div>
                  <h3>Operational KPIs</h3>
                  <ul>
                    <li>First response time (<4 hours)</li>
                    <li>Job completion time</li>
                    <li>Customer satisfaction (>90%)</li>
                    <li>Safety incidents (zero target)</li>
                    <li>Quality callbacks (<2%)</li>
                  </ul>
                </div>
                <div>
                  <h3>Financial KPIs</h3>
                  <ul>
                    <li>Gross profit margin (>35%)</li>
                    <li>Days sales outstanding (<45)</li>
                    <li>Quote conversion rate (>60%)</li>
                    <li>Average job value</li>
                    <li>Revenue per technician</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.competitiveAdvantage}>
              <h2>🎯 Competitive Advantages</h2>
              <ul>
                <li><strong>24/7 Availability:</strong> Always ready to respond</li>
                <li><strong>Rapid Response:</strong> First on site wins the job</li>
                <li><strong>Insurance Relationships:</strong> Preferred supplier status</li>
                <li><strong>Technical Expertise:</strong> Specialised knowledge and equipment</li>
                <li><strong>Quality Systems:</strong> ISO certification, IICRC standards</li>
                <li><strong>National Coverage:</strong> Multi-site capability</li>
              </ul>
            </div>

            <button 
              className={styles.continueButton}
              onClick={() => {
                setActiveTab('insurance');
                markSectionComplete('business');
              }}
            >
              Continue to Insurance Processes →
            </button>
          </div>
        )}

        {activeTab === 'insurance' && (
          <div className={styles.contentSection}>
            <h1>Insurance Claims & Documentation</h1>

            <div className={styles.insuranceOverview}>
              <h2>🏢 Australian Insurance Landscape</h2>
              <div className={styles.insurerGrid}>
                <div className={styles.insurerCard}>
                  <h3>Major Insurers</h3>
                  <ul>
                    <li><strong>IAG Group:</strong> NRMA, CGU, SGIO, SGIC</li>
                    <li><strong>Suncorp:</strong> AAMI, GIO, Apia, Shannons</li>
                    <li><strong>Allianz:</strong> Commercial and domestic</li>
                    <li><strong>QBE:</strong> Large commercial focus</li>
                    <li><strong>Zurich:</strong> Commercial specialist</li>
                  </ul>
                </div>
                <div className={styles.insurerCard}>
                  <h3>Claim Handlers</h3>
                  <ul>
                    <li><strong>Crawford & Company:</strong> Loss adjusting</li>
                    <li><strong>Sedgwick:</strong> Claims management</li>
                    <li><strong>McLarens:</strong> Loss adjusting</li>
                    <li><strong>Cunningham Lindsey:</strong> Major loss</li>
                    <li><strong>Insurance Builders Network (IBN)</strong></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.claimProcess}>
              <h2>📋 Insurance Claim Workflow</h2>
              
              <div className={styles.workflowSteps}>
                <div className={styles.workflowStep}>
                  <div className={styles.stepNumber}>1</div>
                  <h3>FNOL (First Notice of Loss)</h3>
                  <ul>
                    <li>Claim number issued</li>
                    <li>Policy verification</li>
                    <li>Excess confirmation</li>
                    <li>Authority to proceed</li>
                  </ul>
                </div>

                <div className={styles.workflowStep}>
                  <div className={styles.stepNumber}>2</div>
                  <h3>Initial Assessment</h3>
                  <ul>
                    <li>Cause determination</li>
                    <li>Coverage verification</li>
                    <li>Photo documentation</li>
                    <li>Emergency mitigation</li>
                  </ul>
                </div>

                <div className={styles.workflowStep}>
                  <div className={styles.stepNumber}>3</div>
                  <h3>Scope Development</h3>
                  <ul>
                    <li>Detailed measurements</li>
                    <li>Xactimate estimate</li>
                    <li>Supporting photos</li>
                    <li>Moisture mapping</li>
                  </ul>
                </div>

                <div className={styles.workflowStep}>
                  <div className={styles.stepNumber}>4</div>
                  <h3>Approval Process</h3>
                  <ul>
                    <li>Scope submission</li>
                    <li>Assessor review</li>
                    <li>Negotiation if needed</li>
                    <li>Written approval</li>
                  </ul>
                </div>

                <div className={styles.workflowStep}>
                  <div className={styles.stepNumber}>5</div>
                  <h3>Works Completion</h3>
                  <ul>
                    <li>Progress reporting</li>
                    <li>Variation management</li>
                    <li>Quality checks</li>
                    <li>Customer sign-off</li>
                  </ul>
                </div>

                <div className={styles.workflowStep}>
                  <div className={styles.stepNumber}>6</div>
                  <h3>Final Documentation</h3>
                  <ul>
                    <li>Completion certificate</li>
                    <li>Final photos</li>
                    <li>Invoice submission</li>
                    <li>Warranty provision</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.documentationReqs}>
              <h2>📄 Essential Documentation</h2>
              
              <div className={styles.docGrid}>
                <div className={styles.docCategory}>
                  <h3>Initial Response</h3>
                  <ul>
                    <li>Job safety analysis</li>
                    <li>Customer authorisation</li>
                    <li>Initial photos (wide/mid/close)</li>
                    <li>Moisture readings log</li>
                    <li>Cause and origin report</li>
                  </ul>
                </div>

                <div className={styles.docCategory}>
                  <h3>During Works</h3>
                  <ul>
                    <li>Daily drying logs</li>
                    <li>Progress photos</li>
                    <li>Variation requests</li>
                    <li>Subcontractor invoices</li>
                    <li>Disposal certificates</li>
                  </ul>
                </div>

                <div className={styles.docCategory}>
                  <h3>Completion</h3>
                  <ul>
                    <li>Final moisture readings</li>
                    <li>Completion photos</li>
                    <li>Customer satisfaction form</li>
                    <li>Warranty certificate</li>
                    <li>Final invoice</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.commonIssues}>
              <h2>⚠️ Common Claim Issues</h2>
              <div className={styles.issuesList}>
                <div className={styles.issue}>
                  <h3>Coverage Disputes</h3>
                  <p>Gradual damage, maintenance issues, flood vs storm water</p>
                </div>
                <div className={styles.issue}>
                  <h3>Scope Creep</h3>
                  <p>Unapproved additional works, betterment, upgrades</p>
                </div>
                <div className={styles.issue}>
                  <h3>Documentation Gaps</h3>
                  <p>Missing photos, incomplete moisture logs, no approvals</p>
                </div>
                <div className={styles.issue}>
                  <h3>Time Delays</h3>
                  <p>Late notification, slow approvals, customer delays</p>
                </div>
              </div>
            </div>

            <div className={styles.bestPractices}>
              <h2>✅ Insurance Best Practices</h2>
              <ul>
                <li>Always confirm coverage before starting major works</li>
                <li>Document everything with photos and written records</li>
                <li>Get written approval for all variations</li>
                <li>Maintain regular communication with adjusters</li>
                <li>Submit progressive claims for cash flow</li>
                <li>Keep detailed time and materials records</li>
                <li>Never guarantee coverage to customers</li>
                <li>Understand policy exclusions and limits</li>
              </ul>
            </div>

            <button 
              className={styles.continueButton}
              onClick={() => {
                setActiveTab('customer');
                markSectionComplete('insurance');
              }}
            >
              Continue to Customer Service →
            </button>
          </div>
        )}

        {activeTab === 'customer' && (
          <div className={styles.contentSection}>
            <h1>Customer Service Excellence</h1>

            <div className={styles.customerContext}>
              <h2>😰 Understanding Customer Trauma</h2>
              <p>Customers experiencing property damage are often dealing with one of the most stressful events in their lives. Your response can make the difference between adding to their stress or providing relief.</p>
              
              <div className={styles.emotionalStages}>
                <div className={styles.stage}>
                  <h3>Shock & Denial</h3>
                  <p>"This can't be happening"</p>
                </div>
                <div className={styles.stage}>
                  <h3>Anger & Frustration</h3>
                  <p>"Why did this happen to me?"</p>
                </div>
                <div className={styles.stage}>
                  <h3>Anxiety & Fear</h3>
                  <p>"Will insurance cover this?"</p>
                </div>
                <div className={styles.stage}>
                  <h3>Acceptance & Recovery</h3>
                  <p>"Let's get this fixed"</p>
                </div>
              </div>
            </div>

            <div className={styles.communicationSkills}>
              <h2>💬 Professional Communication</h2>
              
              <div className={styles.commGrid}>
                <div className={styles.commCard}>
                  <h3>First Contact Excellence</h3>
                  <ul>
                    <li>Introduce yourself and company clearly</li>
                    <li>Express empathy: "I understand this is stressful"</li>
                    <li>Reassure: "We're here to help"</li>
                    <li>Explain the immediate next steps</li>
                    <li>Provide realistic timeframes</li>
                    <li>Leave clear contact information</li>
                  </ul>
                </div>

                <div className={styles.commCard}>
                  <h3>Active Listening</h3>
                  <ul>
                    <li>Let customers tell their story</li>
                    <li>Don't interrupt or rush</li>
                    <li>Ask clarifying questions</li>
                    <li>Acknowledge their concerns</li>
                    <li>Take notes visibly</li>
                    <li>Summarise understanding</li>
                  </ul>
                </div>

                <div className={styles.commCard}>
                  <h3>Setting Expectations</h3>
                  <ul>
                    <li>Be honest about timelines</li>
                    <li>Explain the process clearly</li>
                    <li>Discuss potential challenges</li>
                    <li>Clarify insurance coverage</li>
                    <li>Define success criteria</li>
                    <li>Document agreements</li>
                  </ul>
                </div>

                <div className={styles.commCard}>
                  <h3>Difficult Conversations</h3>
                  <ul>
                    <li>Stay calm and professional</li>
                    <li>Don't take it personally</li>
                    <li>Focus on solutions</li>
                    <li>Involve supervisors if needed</li>
                    <li>Document concerns</li>
                    <li>Follow up in writing</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.customerJourney}>
              <h2>🗺️ Customer Journey Touchpoints</h2>
              
              <div className={styles.touchpointList}>
                <div className={styles.touchpoint}>
                  <h3>1. Emergency Call</h3>
                  <p>Quick response, empathy, clear next steps</p>
                </div>
                <div className={styles.touchpoint}>
                  <h3>2. Initial Visit</h3>
                  <p>Professional appearance, thorough assessment, education</p>
                </div>
                <div className={styles.touchpoint}>
                  <h3>3. Scope Presentation</h3>
                  <p>Clear explanation, visual aids, Q&A opportunity</p>
                </div>
                <div className={styles.touchpoint}>
                  <h3>4. Work Commencement</h3>
                  <p>Site protection, schedule confirmation, safety briefing</p>
                </div>
                <div className={styles.touchpoint}>
                  <h3>5. Progress Updates</h3>
                  <p>Regular communication, photos, milestone celebrations</p>
                </div>
                <div className={styles.touchpoint}>
                  <h3>6. Completion</h3>
                  <p>Walk-through, sign-off, warranty explanation</p>
                </div>
                <div className={styles.touchpoint}>
                  <h3>7. Follow-up</h3>
                  <p>Satisfaction check, review request, referral opportunity</p>
                </div>
              </div>
            </div>

            <div className={styles.complaintsHandling}>
              <h2>🔧 Complaint Resolution</h2>
              
              <div className={styles.complaintProcess}>
                <div className={styles.complaintStep}>
                  <h3>Listen & Acknowledge</h3>
                  <p>Let them vent, show understanding</p>
                </div>
                <div className={styles.complaintStep}>
                  <h3>Apologise & Empathise</h3>
                  <p>"I'm sorry you've had this experience"</p>
                </div>
                <div className={styles.complaintStep}>
                  <h3>Investigate & Understand</h3>
                  <p>Get all facts, check documentation</p>
                </div>
                <div className={styles.complaintStep}>
                  <h3>Propose Solution</h3>
                  <p>Offer options, be flexible</p>
                </div>
                <div className={styles.complaintStep}>
                  <h3>Act & Follow Up</h3>
                  <p>Implement solution, confirm satisfaction</p>
                </div>
              </div>
            </div>

            <div className={styles.culturalAwareness}>
              <h2>🌏 Cultural Sensitivity</h2>
              <p>Australia's multicultural society requires awareness and respect:</p>
              <ul>
                <li>Language barriers - speak clearly, use interpreters if needed</li>
                <li>Religious considerations - prayer times, dietary restrictions</li>
                <li>Gender preferences - some cultures prefer same-gender technicians</li>
                <li>Shoes off customs - respect household rules</li>
                <li>Indigenous protocols - cultural sites, sacred objects</li>
                <li>Extended family involvement - multiple decision makers</li>
              </ul>
            </div>

            <button 
              className={styles.continueButton}
              onClick={() => {
                setActiveTab('compliance');
                markSectionComplete('customer');
              }}
            >
              Continue to Legal & Compliance →
            </button>
          </div>
        )}

        {activeTab === 'compliance' && (
          <div className={styles.contentSection}>
            <h1>Legal & Compliance Requirements</h1>

            <div className={styles.legalFramework}>
              <h2>⚖️ Australian Legal Framework</h2>
              
              <div className={styles.legislationGrid}>
                <div className={styles.legislationCard}>
                  <h3>Work Health & Safety Act 2011</h3>
                  <ul>
                    <li>PCBU duties and obligations</li>
                    <li>Worker consultation requirements</li>
                    <li>Incident reporting obligations</li>
                    <li>Safe work method statements</li>
                    <li>Personal liability of officers</li>
                  </ul>
                </div>

                <div className={styles.legislationCard}>
                  <h3>Building & Construction Legislation</h3>
                  <ul>
                    <li>National Construction Code (NCC)</li>
                    <li>State building acts and regulations</li>
                    <li>Licensing requirements (QBCC, NSW Fair Trading)</li>
                    <li>Home Building Contracts Acts</li>
                    <li>Security of Payment Acts</li>
                  </ul>
                </div>

                <div className={styles.legislationCard}>
                  <h3>Environmental Protection</h3>
                  <ul>
                    <li>EPA regulations by state</li>
                    <li>Asbestos removal licensing</li>
                    <li>Waste disposal requirements</li>
                    <li>Water discharge permits</li>
                    <li>Noise and dust controls</li>
                  </ul>
                </div>

                <div className={styles.legislationCard}>
                  <h3>Consumer Protection</h3>
                  <ul>
                    <li>Australian Consumer Law</li>
                    <li>Statutory warranties</li>
                    <li>Misleading conduct provisions</li>
                    <li>Unfair contract terms</li>
                    <li>Privacy Act obligations</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.licensingReqs}>
              <h2>📜 Licensing Requirements</h2>
              
              <div className={styles.licenseTable}>
                <table>
                  <thead>
                    <tr>
                      <th>State</th>
                      <th>Authority</th>
                      <th>Threshold</th>
                      <th>Key Requirements</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>QLD</td>
                      <td>QBCC</td>
                      <td>$3,300</td>
                      <td>Building licence, insurance, financial requirements</td>
                    </tr>
                    <tr>
                      <td>NSW</td>
                      <td>Fair Trading</td>
                      <td>$5,000</td>
                      <td>Contractor licence, home warranty insurance</td>
                    </tr>
                    <tr>
                      <td>VIC</td>
                      <td>VBA</td>
                      <td>$10,000</td>
                      <td>Registration, domestic builder insurance</td>
                    </tr>
                    <tr>
                      <td>SA</td>
                      <td>CBS</td>
                      <td>$12,000</td>
                      <td>Building licence, indemnity insurance</td>
                    </tr>
                    <tr>
                      <td>WA</td>
                      <td>Building Commission</td>
                      <td>$20,000</td>
                      <td>Registration, home indemnity insurance</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className={styles.contractualObligations}>
              <h2>📝 Contractual Requirements</h2>
              
              <div className={styles.contractGrid}>
                <div>
                  <h3>Written Contracts Required</h3>
                  <ul>
                    <li>Works over statutory threshold</li>
                    <li>Clear scope of works</li>
                    <li>Payment terms and schedule</li>
                    <li>Variations procedure</li>
                    <li>Warranty provisions</li>
                    <li>Dispute resolution clause</li>
                  </ul>
                </div>
                <div>
                  <h3>Statutory Warranties</h3>
                  <ul>
                    <li>Work done with due care and skill</li>
                    <li>Materials fit for purpose</li>
                    <li>Work complies with law</li>
                    <li>Completed within time agreed</li>
                    <li>Fit for purpose specified</li>
                    <li>6-7 year warranty period</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.insuranceRequirements}>
              <h2>🛡️ Insurance Requirements</h2>
              
              <div className={styles.insuranceTypes}>
                <div className={styles.insuranceCard}>
                  <h3>Public Liability</h3>
                  <p>Minimum $20 million coverage</p>
                  <p>Covers third party injury/damage</p>
                </div>
                <div className={styles.insuranceCard}>
                  <h3>Professional Indemnity</h3>
                  <p>Errors and omissions coverage</p>
                  <p>Run-off cover for 7 years</p>
                </div>
                <div className={styles.insuranceCard}>
                  <h3>Workers Compensation</h3>
                  <p>Mandatory for all employees</p>
                  <p>State-based schemes</p>
                </div>
                <div className={styles.insuranceCard}>
                  <h3>Contract Works</h3>
                  <p>Covers work in progress</p>
                  <p>Materials and equipment</p>
                </div>
              </div>
            </div>

            <div className={styles.complianceChecklist}>
              <h2>✅ Compliance Checklist</h2>
              <div className={styles.checklistColumns}>
                <div>
                  <h3>Before Starting Work</h3>
                  <ul>
                    <li>Licence validity check</li>
                    <li>Insurance certificates current</li>
                    <li>Written contract signed</li>
                    <li>Asbestos register check</li>
                    <li>SWMS prepared</li>
                    <li>Permits obtained</li>
                  </ul>
                </div>
                <div>
                  <h3>During Work</h3>
                  <ul>
                    <li>Site safety compliance</li>
                    <li>Waste disposal records</li>
                    <li>Variation approvals</li>
                    <li>Quality inspections</li>
                    <li>Progress photos</li>
                    <li>Incident reporting</li>
                  </ul>
                </div>
                <div>
                  <h3>After Completion</h3>
                  <ul>
                    <li>Final inspection certificate</li>
                    <li>Warranty documentation</li>
                    <li>Waste receipts</li>
                    <li>As-built records</li>
                    <li>Maintenance instructions</li>
                    <li>File retention (7 years)</li>
                  </ul>
                </div>
              </div>
            </div>

            <button 
              className={styles.continueButton}
              onClick={() => {
                setActiveTab('technology');
                markSectionComplete('compliance');
              }}
            >
              Continue to Technology →
            </button>
          </div>
        )}

        {activeTab === 'technology' && (
          <div className={styles.contentSection}>
            <h1>Technology & Systems</h1>

            <div className={styles.techOverview}>
              <h2>💻 Digital Transformation in Restoration</h2>
              <p>Modern restoration companies rely on integrated technology systems for efficiency, accuracy, and competitive advantage.</p>
            </div>

            <div className={styles.softwareSystems}>
              <h2>Essential Software Systems</h2>
              
              <div className={styles.systemGrid}>
                <div className={styles.systemCard}>
                  <h3>Job Management Systems</h3>
                  <ul>
                    <li><strong>DASH:</strong> Restoration-specific platform</li>
                    <li><strong>Encircle:</strong> Field documentation</li>
                    <li><strong>CoreLogic:</strong> Claims management</li>
                    <li>Features: Scheduling, dispatch, tracking</li>
                    <li>Mobile apps for field techs</li>
                    <li>Real-time status updates</li>
                  </ul>
                </div>

                <div className={styles.systemCard}>
                  <h3>Estimating Software</h3>
                  <ul>
                    <li><strong>Xactimate:</strong> Industry standard</li>
                    <li><strong>Symbility:</strong> Alternative platform</li>
                    <li>Pricing databases updated monthly</li>
                    <li>Sketch tools for floor plans</li>
                    <li>Integration with insurers</li>
                    <li>Mobile measurement tools</li>
                  </ul>
                </div>

                <div className={styles.systemCard}>
                  <h3>Documentation Apps</h3>
                  <ul>
                    <li><strong>CompanyCam:</strong> Photo management</li>
                    <li><strong>DocuSketch:</strong> Floor plans</li>
                    <li><strong>magicplan:</strong> AR measuring</li>
                    <li>Time-stamped photos</li>
                    <li>Voice-to-text notes</li>
                    <li>Cloud storage and backup</li>
                  </ul>
                </div>

                <div className={styles.systemCard}>
                  <h3>Moisture Tracking</h3>
                  <ul>
                    <li><strong>DryTrack:</strong> Digital moisture logs</li>
                    <li><strong>Encircle:</strong> Integrated readings</li>
                    <li>Bluetooth moisture meters</li>
                    <li>Automated psychrometric calculations</li>
                    <li>Drying progress graphs</li>
                    <li>IICRC compliant reporting</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.emergingTech}>
              <h2>🚀 Emerging Technologies</h2>
              
              <div className={styles.techInnovations}>
                <div className={styles.innovation}>
                  <h3>Drones & Aerial Imaging</h3>
                  <ul>
                    <li>Roof inspections without ladders</li>
                    <li>Large loss aerial documentation</li>
                    <li>Thermal imaging capabilities</li>
                    <li>3D mapping and modelling</li>
                  </ul>
                </div>

                <div className={styles.innovation}>
                  <h3>IoT Sensors</h3>
                  <ul>
                    <li>Remote moisture monitoring</li>
                    <li>Equipment tracking and alerts</li>
                    <li>Environmental conditions logging</li>
                    <li>Predictive maintenance alerts</li>
                  </ul>
                </div>

                <div className={styles.innovation}>
                  <h3>AI & Machine Learning</h3>
                  <ul>
                    <li>Damage assessment from photos</li>
                    <li>Automated estimating assistance</li>
                    <li>Predictive drying times</li>
                    <li>Customer service chatbots</li>
                  </ul>
                </div>

                <div className={styles.innovation}>
                  <h3>360° Documentation</h3>
                  <ul>
                    <li>Matterport 3D scanning</li>
                    <li>Virtual property tours</li>
                    <li>Before/after comparisons</li>
                    <li>Remote inspections capability</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.dataManagement}>
              <h2>📊 Data Management & Analytics</h2>
              
              <div className={styles.dataGrid}>
                <div>
                  <h3>Key Metrics to Track</h3>
                  <ul>
                    <li>Response times by postcode</li>
                    <li>Job profitability analysis</li>
                    <li>Technician productivity</li>
                    <li>Equipment utilisation rates</li>
                    <li>Customer satisfaction scores</li>
                    <li>Insurance approval rates</li>
                  </ul>
                </div>
                <div>
                  <h3>Reporting Requirements</h3>
                  <ul>
                    <li>Daily job status reports</li>
                    <li>Weekly KPI dashboards</li>
                    <li>Monthly financial analysis</li>
                    <li>Insurance performance metrics</li>
                    <li>Safety incident tracking</li>
                    <li>Quality assurance audits</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.cybersecurity}>
              <h2>🔒 Cybersecurity Considerations</h2>
              <ul>
                <li><strong>Data Protection:</strong> Customer PII must be secured</li>
                <li><strong>Cloud Backup:</strong> Regular automated backups essential</li>
                <li><strong>Access Controls:</strong> Role-based permissions</li>
                <li><strong>Mobile Device Management:</strong> Secure field devices</li>
                <li><strong>Incident Response Plan:</strong> Breach procedures documented</li>
                <li><strong>Training:</strong> Regular security awareness for staff</li>
              </ul>
            </div>

            <button 
              className={styles.continueButton}
              onClick={() => {
                setActiveTab('assessment');
                markSectionComplete('technology');
              }}
            >
              Continue to Assessment →
            </button>
          </div>
        )}

        {activeTab === 'assessment' && (
          <div className={styles.contentSection}>
            <h1>Day 12 Assessment</h1>

            <div className={styles.assessmentIntro}>
              <h2>📝 Business Operations Check</h2>
              <p>Test your understanding of business operations and administration in restoration.</p>
            </div>

            <div className={styles.quiz}>
              <div className={styles.questionCard}>
                <h3>Question 1: Payment Terms</h3>
                <p>What is the typical payment timeline for insurance restoration work?</p>
                <div className={styles.options}>
                  <label>
                    <input 
                      type="radio" 
                      name="q1" 
                      onChange={() => handleQuizAnswer('q1', 'a')}
                    />
                    Payment on completion
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q1" 
                      onChange={() => handleQuizAnswer('q1', 'b')}
                    />
                    7 days from invoice
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q1" 
                      onChange={() => handleQuizAnswer('q1', 'c')}
                    />
                    30-90 days from invoice
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q1" 
                      onChange={() => handleQuizAnswer('q1', 'd')}
                    />
                    Payment before starting
                  </label>
                </div>
              </div>

              <div className={styles.questionCard}>
                <h3>Question 2: Documentation</h3>
                <p>Which software is the industry standard for restoration estimating in Australia?</p>
                <div className={styles.options}>
                  <label>
                    <input 
                      type="radio" 
                      name="q2" 
                      onChange={() => handleQuizAnswer('q2', 'a')}
                    />
                    Excel spreadsheets
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q2" 
                      onChange={() => handleQuizAnswer('q2', 'b')}
                    />
                    Xactimate
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q2" 
                      onChange={() => handleQuizAnswer('q2', 'c')}
                    />
                    QuickBooks
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q2" 
                      onChange={() => handleQuizAnswer('q2', 'd')}
                    />
                    BuildSoft
                  </label>
                </div>
              </div>

              <div className={styles.questionCard}>
                <h3>Question 3: Customer Service</h3>
                <p>What is the most important first step when dealing with a distressed customer?</p>
                <div className={styles.options}>
                  <label>
                    <input 
                      type="radio" 
                      name="q3" 
                      onChange={() => handleQuizAnswer('q3', 'a')}
                    />
                    Explain insurance process
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q3" 
                      onChange={() => handleQuizAnswer('q3', 'b')}
                    />
                    Start work immediately
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q3" 
                      onChange={() => handleQuizAnswer('q3', 'c')}
                    />
                    Express empathy and reassurance
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q3" 
                      onChange={() => handleQuizAnswer('q3', 'd')}
                    />
                    Take photos
                  </label>
                </div>
              </div>

              <div className={styles.questionCard}>
                <h3>Question 4: Compliance</h3>
                <p>How long must restoration business records be retained in Australia?</p>
                <div className={styles.options}>
                  <label>
                    <input 
                      type="radio" 
                      name="q4" 
                      onChange={() => handleQuizAnswer('q4', 'a')}
                    />
                    1 year
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q4" 
                      onChange={() => handleQuizAnswer('q4', 'b')}
                    />
                    3 years
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q4" 
                      onChange={() => handleQuizAnswer('q4', 'c')}
                    />
                    5 years
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q4" 
                      onChange={() => handleQuizAnswer('q4', 'd')}
                    />
                    7 years
                  </label>
                </div>
              </div>
            </div>

            <div className={styles.keyTakeaways}>
              <h2>🎯 Key Takeaways</h2>
              <ul>
                <li>The restoration industry operates on an insurance-funded model with extended payment terms</li>
                <li>Cash flow management is critical with 30-90 day payment cycles</li>
                <li>Xactimate is the industry standard for estimating and must be mastered</li>
                <li>Customer service during trauma requires empathy and professionalism</li>
                <li>Documentation is essential for insurance claims and legal compliance</li>
                <li>Technology adoption provides competitive advantage</li>
                <li>Compliance with building, WHS, and environmental laws is mandatory</li>
                <li>Records must be retained for 7 years for warranty and legal purposes</li>
              </ul>
            </div>

            <div className={styles.completionCard}>
              <h2>🏆 Module Complete!</h2>
              <p>Congratulations on completing Day 12: Business Operations & Administration.</p>
              <div className={styles.completionActions}>
                <button 
                  className={styles.certificateButton}
                  onClick={() => markSectionComplete('assessment')}
                >
                  Mark Complete
                </button>
                <Link 
                  href="/portal/training/modules/day-13"
                  className={styles.nextModuleButton}
                >
                  Continue to Day 13 →
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}