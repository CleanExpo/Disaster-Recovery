'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../training.module.css';

export default function Day13Module() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [practicalProgress, setPracticalProgress] = useState({
    waterDamage: false,
    mouldAssessment: false,
    fireRestoration: false,
    documentation: false,
    customerInteraction: false
  });

  const markSectionComplete = (section: string) => {
    if (!completedSections.includes(section)) {
      setCompletedSections([...completedSections, section]);
    }
  };

  const markPracticalComplete = (task: string) => {
    setPracticalProgress({ ...practicalProgress, [task]: true });
  };

  const calculateProgress = () => {
    const totalSections = 6;
    return Math.round((completedSections.length / totalSections) * 100);
  };

  const calculatePracticalProgress = () => {
    const completed = Object.values(practicalProgress).filter(v => v).length;
    return Math.round((completed / 5) * 100);
  };

  return (
    <div className={styles.moduleContainer}>
      {/* Sidebar Navigation */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <Link href="/portal/training" className={styles.backLink}>
            ← Back to Training Hub
          </Link>
          <h2>Day 13: Practical</h2>
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
            className={`${styles.navItem} ${activeTab === 'scenarios' ? styles.active : ''}`}
            onClick={() => setActiveTab('scenarios')}
          >
            Real-World Scenarios
          </button>
          <button 
            className={`${styles.navItem} ${activeTab === 'simulations' ? styles.active : ''}`}
            onClick={() => setActiveTab('simulations')}
          >
            Practical Simulations
          </button>
          <button 
            className={`${styles.navItem} ${activeTab === 'troubleshooting' ? styles.active : ''}`}
            onClick={() => setActiveTab('troubleshooting')}
          >
            Troubleshooting Guide
          </button>
          <button 
            className={`${styles.navItem} ${activeTab === 'documentation' ? styles.active : ''}`}
            onClick={() => setActiveTab('documentation')}
          >
            Documentation Practice
          </button>
          <button 
            className={`${styles.navItem} ${activeTab === 'integration' ? styles.active : ''}`}
            onClick={() => setActiveTab('integration')}
          >
            Skills Integration
          </button>
          <button 
            className={`${styles.navItem} ${activeTab === 'review' ? styles.active : ''}`}
            onClick={() => setActiveTab('review')}
          >
            Final Review
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
            <h1>Day 13: Practical Application & Field Training</h1>
            
            <div className={styles.learningObjectives}>
              <h2>Learning Objectives</h2>
              <ul>
                <li>Apply all learned techniques in realistic scenarios</li>
                <li>Practice end-to-end job management</li>
                <li>Demonstrate proper documentation procedures</li>
                <li>Handle complex multi-hazard situations</li>
                <li>Integrate safety, technical, and customer service skills</li>
                <li>Prepare for real-world field deployment</li>
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
                <span className={styles.statIcon}>🎯</span>
                <div>
                  <h3>Exercises</h3>
                  <p>5 practical</p>
                </div>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statIcon}>✅</span>
                <div>
                  <h3>Completion</h3>
                  <p>{calculatePracticalProgress()}%</p>
                </div>
              </div>
            </div>

            <div className={styles.practicalOverview}>
              <h2>🛠️ Today's Practical Exercises</h2>
              <div className={styles.exerciseList}>
                <div className={styles.exerciseItem}>
                  <span>{practicalProgress.waterDamage ? '✅' : '⭕'}</span>
                  <p>Complete water damage assessment and setup</p>
                </div>
                <div className={styles.exerciseItem}>
                  <span>{practicalProgress.mouldAssessment ? '✅' : '⭕'}</span>
                  <p>Perform mould inspection and containment</p>
                </div>
                <div className={styles.exerciseItem}>
                  <span>{practicalProgress.fireRestoration ? '✅' : '⭕'}</span>
                  <p>Execute fire damage restoration plan</p>
                </div>
                <div className={styles.exerciseItem}>
                  <span>{practicalProgress.documentation ? '✅' : '⭕'}</span>
                  <p>Create complete job documentation</p>
                </div>
                <div className={styles.exerciseItem}>
                  <span>{practicalProgress.customerInteraction ? '✅' : '⭕'}</span>
                  <p>Handle customer interaction scenarios</p>
                </div>
              </div>
            </div>

            <button 
              className={styles.startButton}
              onClick={() => {
                setActiveTab('scenarios');
                markSectionComplete('overview');
              }}
            >
              Start Practical Training →
            </button>
          </div>
        )}

        {activeTab === 'scenarios' && (
          <div className={styles.contentSection}>
            <h1>Real-World Scenario Training</h1>

            <div className={styles.megaScenario}>
              <h2>🏠 Master Scenario: Multi-Unit Residential Complex</h2>
              
              <div className={styles.scenarioSetup}>
                <h3>Background:</h3>
                <p>You've been called to a 12-unit apartment complex in Brisbane. A washing machine hose burst in Unit 8 (second floor) while the tenant was at work for 6 hours. Water has affected:</p>
                <ul>
                  <li>Unit 8: Complete flooding, carpet and walls saturated</li>
                  <li>Unit 7: Water through shared wall, mould visible in bedroom</li>
                  <li>Unit 4 (below): Ceiling collapsed in living room, contents damaged</li>
                  <li>Common hallway: Carpet saturated, walls affected</li>
                  <li>Building manager is panicked, multiple tenants are angry</li>
                </ul>
              </div>

              <div className={styles.taskBreakdown}>
                <h3>Your Mission (Complete in Order):</h3>
                
                <div className={styles.taskCard}>
                  <h4>Task 1: Initial Response (30 minutes)</h4>
                  <div className={styles.taskSteps}>
                    <label>
                      <input type="checkbox" />
                      Conduct safety assessment of all areas
                    </label>
                    <label>
                      <input type="checkbox" />
                      Document with photos (minimum 20 photos)
                    </label>
                    <label>
                      <input type="checkbox" />
                      Interview tenants and building manager
                    </label>
                    <label>
                      <input type="checkbox" />
                      Identify source and ensure stopped
                    </label>
                    <label>
                      <input type="checkbox" />
                      Contact insurance company for all units
                    </label>
                    <label>
                      <input type="checkbox" />
                      Establish work zones and containment
                    </label>
                  </div>
                </div>

                <div className={styles.taskCard}>
                  <h4>Task 2: Water Mitigation (2 hours)</h4>
                  <div className={styles.taskSteps}>
                    <label>
                      <input type="checkbox" />
                      Calculate required equipment using psychrometrics
                    </label>
                    <label>
                      <input type="checkbox" />
                      Extract standing water from all units
                    </label>
                    <label>
                      <input type="checkbox" />
                      Remove affected carpet and underlay
                    </label>
                    <label>
                      <input type="checkbox" />
                      Set up drying equipment (list all equipment)
                    </label>
                    <label>
                      <input type="checkbox" />
                      Take initial moisture readings (document)
                    </label>
                    <label>
                      <input type="checkbox" />
                      Establish drying goals and timeline
                    </label>
                  </div>
                </div>

                <div className={styles.taskCard}>
                  <h4>Task 3: Mould Assessment (1 hour)</h4>
                  <div className={styles.taskSteps}>
                    <label>
                      <input type="checkbox" />
                      Inspect Unit 7 for mould extent
                    </label>
                    <label>
                      <input type="checkbox" />
                      Determine containment requirements
                    </label>
                    <label>
                      <input type="checkbox" />
                      Set up negative air if required
                    </label>
                    <label>
                      <input type="checkbox" />
                      Document mould type and coverage
                    </label>
                    <label>
                      <input type="checkbox" />
                      Develop remediation protocol
                    </label>
                    <label>
                      <input type="checkbox" />
                      Advise tenant on health precautions
                    </label>
                  </div>
                </div>

                <div className={styles.taskCard}>
                  <h4>Task 4: Contents & Structure (2 hours)</h4>
                  <div className={styles.taskSteps}>
                    <label>
                      <input type="checkbox" />
                      Inventory damaged contents in Unit 4
                    </label>
                    <label>
                      <input type="checkbox" />
                      Determine restore vs replace items
                    </label>
                    <label>
                      <input type="checkbox" />
                      Pack out salvageable contents
                    </label>
                    <label>
                      <input type="checkbox" />
                      Remove damaged ceiling materials
                    </label>
                    <label>
                      <input type="checkbox" />
                      Check for asbestos before demolition
                    </label>
                    <label>
                      <input type="checkbox" />
                      Coordinate trades for repairs
                    </label>
                  </div>
                </div>

                <div className={styles.taskCard}>
                  <h4>Task 5: Documentation & Communication (1 hour)</h4>
                  <div className={styles.taskSteps}>
                    <label>
                      <input type="checkbox" />
                      Create Xactimate estimate for each unit
                    </label>
                    <label>
                      <input type="checkbox" />
                      Write cause and origin report
                    </label>
                    <label>
                      <input type="checkbox" />
                      Prepare scope of works document
                    </label>
                    <label>
                      <input type="checkbox" />
                      Brief building manager on process
                    </label>
                    <label>
                      <input type="checkbox" />
                      Provide written updates to tenants
                    </label>
                    <label>
                      <input type="checkbox" />
                      Submit initial report to insurers
                    </label>
                  </div>
                </div>
              </div>

              <button 
                className={styles.completeScenarioBtn}
                onClick={() => markPracticalComplete('waterDamage')}
              >
                Complete Water Damage Scenario
              </button>
            </div>

            <div className={styles.additionalScenarios}>
              <h2>🔥 Quick Response Scenarios</h2>
              
              <div className={styles.quickScenario}>
                <h3>Scenario A: Restaurant Kitchen Fire</h3>
                <p>Grease fire in commercial kitchen, protein smoke throughout dining area. Restaurant wants to reopen tomorrow.</p>
                <div className={styles.decisionPoint}>
                  <p><strong>Critical Decision:</strong> Can they reopen tomorrow?</p>
                  <textarea 
                    placeholder="Explain your decision and required steps..."
                    rows={4}
                  />
                </div>
              </div>

              <div className={styles.quickScenario}>
                <h3>Scenario B: Sewage Backup in Childcare</h3>
                <p>Category 3 water in childcare centre play area. 50 children enrolled, parents arriving in 2 hours.</p>
                <div className={styles.decisionPoint}>
                  <p><strong>Critical Decision:</strong> What do you tell parents?</p>
                  <textarea 
                    placeholder="Write your communication to parents..."
                    rows={4}
                  />
                </div>
              </div>

              <div className={styles.quickScenario}>
                <h3>Scenario C: Hospital Operating Theatre</h3>
                <p>Small fire in operating theatre, smoke residue on equipment. Surgeries scheduled in 48 hours.</p>
                <div className={styles.decisionPoint}>
                  <p><strong>Critical Decision:</strong> What's your restoration protocol?</p>
                  <textarea 
                    placeholder="Detail your step-by-step approach..."
                    rows={4}
                  />
                </div>
              </div>
            </div>

            <button 
              className={styles.continueButton}
              onClick={() => {
                setActiveTab('simulations');
                markSectionComplete('scenarios');
              }}
            >
              Continue to Simulations →
            </button>
          </div>
        )}

        {activeTab === 'simulations' && (
          <div className={styles.contentSection}>
            <h1>Hands-On Practical Simulations</h1>

            <div className={styles.simulationExercise}>
              <h2>🔧 Equipment Setup Simulation</h2>
              
              <div className={styles.roomLayout}>
                <h3>Room Specifications:</h3>
                <ul>
                  <li>Dimensions: 5m x 4m x 2.7m ceiling</li>
                  <li>Flooring: Carpet over concrete slab</li>
                  <li>Water depth: 50mm throughout</li>
                  <li>Temperature: 22°C</li>
                  <li>Relative Humidity: 85%</li>
                </ul>
              </div>

              <div className={styles.equipmentCalculation}>
                <h3>Calculate Required Equipment:</h3>
                <div className={styles.calcForm}>
                  <label>
                    Air Movers Required:
                    <input type="number" placeholder="Enter number" />
                  </label>
                  <label>
                    Dehumidifier Capacity (L/day):
                    <input type="number" placeholder="Enter capacity" />
                  </label>
                  <label>
                    Air Changes Per Hour:
                    <input type="number" placeholder="Enter ACH" />
                  </label>
                  <label>
                    Estimated Drying Time (days):
                    <input type="number" placeholder="Enter days" />
                  </label>
                </div>
                
                <div className={styles.placementDiagram}>
                  <h4>Draw Equipment Placement:</h4>
                  <div className={styles.roomGrid}>
                    <p>[Interactive room grid would go here]</p>
                    <p>Mark positions for:</p>
                    <ul>
                      <li>Air movers (show airflow direction)</li>
                      <li>Dehumidifier placement</li>
                      <li>Containment barriers</li>
                      <li>Power distribution</li>
                    </ul>
                  </div>
                </div>
              </div>

              <button 
                className={styles.checkAnswerBtn}
                onClick={() => markPracticalComplete('mouldAssessment')}
              >
                Submit Equipment Plan
              </button>
            </div>

            <div className={styles.moistureMapping}>
              <h2>📊 Moisture Mapping Exercise</h2>
              
              <div className={styles.mappingGrid}>
                <h3>Record Moisture Readings:</h3>
                <table className={styles.moistureTable}>
                  <thead>
                    <tr>
                      <th>Location</th>
                      <th>Material</th>
                      <th>Day 1</th>
                      <th>Day 2</th>
                      <th>Day 3</th>
                      <th>Target</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>North Wall</td>
                      <td>Plasterboard</td>
                      <td><input type="number" placeholder="%" /></td>
                      <td><input type="number" placeholder="%" /></td>
                      <td><input type="number" placeholder="%" /></td>
                      <td>12%</td>
                    </tr>
                    <tr>
                      <td>South Wall</td>
                      <td>Plasterboard</td>
                      <td><input type="number" placeholder="%" /></td>
                      <td><input type="number" placeholder="%" /></td>
                      <td><input type="number" placeholder="%" /></td>
                      <td>12%</td>
                    </tr>
                    <tr>
                      <td>Floor Centre</td>
                      <td>Concrete</td>
                      <td><input type="number" placeholder="%" /></td>
                      <td><input type="number" placeholder="%" /></td>
                      <td><input type="number" placeholder="%" /></td>
                      <td>4%</td>
                    </tr>
                    <tr>
                      <td>Skirting</td>
                      <td>Pine</td>
                      <td><input type="number" placeholder="%" /></td>
                      <td><input type="number" placeholder="%" /></td>
                      <td><input type="number" placeholder="%" /></td>
                      <td>15%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className={styles.dryingAnalysis}>
                <h3>Analyse Drying Progress:</h3>
                <textarea 
                  placeholder="Based on the readings, what adjustments would you make to equipment?"
                  rows={4}
                />
              </div>
            </div>

            <div className={styles.ppeSelection}>
              <h2>🦺 PPE Selection Challenge</h2>
              
              <div className={styles.ppeScenarios}>
                <h3>Select Appropriate PPE for Each Situation:</h3>
                
                <div className={styles.ppeChoice}>
                  <p><strong>Situation 1:</strong> Category 3 water extraction</p>
                  <div className={styles.ppeOptions}>
                    <label><input type="checkbox" /> N95 Respirator</label>
                    <label><input type="checkbox" /> P2/P3 Respirator</label>
                    <label><input type="checkbox" /> Tyvek Suit</label>
                    <label><input type="checkbox" /> Chemical Gloves</label>
                    <label><input type="checkbox" /> Safety Glasses</label>
                    <label><input type="checkbox" /> Face Shield</label>
                    <label><input type="checkbox" /> Rubber Boots</label>
                  </div>
                </div>

                <div className={styles.ppeChoice}>
                  <p><strong>Situation 2:</strong> Mould remediation (Stachybotrys)</p>
                  <div className={styles.ppeOptions}>
                    <label><input type="checkbox" /> N95 Respirator</label>
                    <label><input type="checkbox" /> Full Face Respirator</label>
                    <label><input type="checkbox" /> Tyvek Suit</label>
                    <label><input type="checkbox" /> Nitrile Gloves</label>
                    <label><input type="checkbox" /> Goggles</label>
                    <label><input type="checkbox" /> Boot Covers</label>
                  </div>
                </div>

                <div className={styles.ppeChoice}>
                  <p><strong>Situation 3:</strong> Fire damage assessment</p>
                  <div className={styles.ppeOptions}>
                    <label><input type="checkbox" /> Dust Mask</label>
                    <label><input type="checkbox" /> P2 Respirator</label>
                    <label><input type="checkbox" /> Hard Hat</label>
                    <label><input type="checkbox" /> Safety Boots</label>
                    <label><input type="checkbox" /> High-Vis Vest</label>
                    <label><input type="checkbox" /> Work Gloves</label>
                  </div>
                </div>
              </div>

              <button 
                className={styles.checkPPEBtn}
                onClick={() => markPracticalComplete('fireRestoration')}
              >
                Verify PPE Selection
              </button>
            </div>

            <button 
              className={styles.continueButton}
              onClick={() => {
                setActiveTab('troubleshooting');
                markSectionComplete('simulations');
              }}
            >
              Continue to Troubleshooting →
            </button>
          </div>
        )}

        {activeTab === 'troubleshooting' && (
          <div className={styles.contentSection}>
            <h1>Troubleshooting Common Problems</h1>

            <div className={styles.troubleshootingGuide}>
              <h2>🔍 Problem-Solving Scenarios</h2>
              
              <div className={styles.problemCard}>
                <h3>Problem 1: Drying Not Progressing</h3>
                <div className={styles.problemDetails}>
                  <p><strong>Situation:</strong> After 3 days, moisture readings haven't changed. Equipment running continuously.</p>
                  
                  <h4>Diagnostic Checklist:</h4>
                  <div className={styles.diagnosticList}>
                    <label><input type="checkbox" /> Check for hidden water sources</label>
                    <label><input type="checkbox" /> Verify equipment is functioning</label>
                    <label><input type="checkbox" /> Calculate if equipment is adequate</label>
                    <label><input type="checkbox" /> Check for vapour barriers</label>
                    <label><input type="checkbox" /> Assess ambient conditions</label>
                    <label><input type="checkbox" /> Look for secondary water intrusion</label>
                  </div>

                  <h4>Most Likely Cause:</h4>
                  <select>
                    <option>Select answer...</option>
                    <option>Insufficient dehumidification</option>
                    <option>Vapour barrier preventing drying</option>
                    <option>Ongoing leak not identified</option>
                    <option>Equipment malfunction</option>
                    <option>Incorrect equipment placement</option>
                  </select>

                  <h4>Your Solution:</h4>
                  <textarea 
                    placeholder="Describe your corrective action..."
                    rows={3}
                  />
                </div>
              </div>

              <div className={styles.problemCard}>
                <h3>Problem 2: Customer Complaint - Odour Returns</h3>
                <div className={styles.problemDetails}>
                  <p><strong>Situation:</strong> Two weeks after completion, customer reports musty smell has returned.</p>
                  
                  <h4>Investigation Steps:</h4>
                  <div className={styles.diagnosticList}>
                    <label><input type="checkbox" /> Re-inspect with moisture meter</label>
                    <label><input type="checkbox" /> Check HVAC system</label>
                    <label><input type="checkbox" /> Look for hidden mould</label>
                    <label><input type="checkbox" /> Verify all affected materials were removed</label>
                    <label><input type="checkbox" /> Check crawl space/ceiling cavity</label>
                    <label><input type="checkbox" /> Review original drying logs</label>
                  </div>

                  <h4>Your Response Plan:</h4>
                  <textarea 
                    placeholder="How do you handle this callback?"
                    rows={4}
                  />
                </div>
              </div>

              <div className={styles.problemCard}>
                <h3>Problem 3: Insurance Scope Dispute</h3>
                <div className={styles.problemDetails}>
                  <p><strong>Situation:</strong> Assessor says only patch and paint needed, you believe full wall replacement required due to contamination.</p>
                  
                  <h4>Supporting Evidence Needed:</h4>
                  <div className={styles.diagnosticList}>
                    <label><input type="checkbox" /> Moisture readings documentation</label>
                    <label><input type="checkbox" /> Photos showing damage extent</label>
                    <label><input type="checkbox" /> Category 3 water confirmation</label>
                    <label><input type="checkbox" /> IICRC S500 guidelines reference</label>
                    <label><input type="checkbox" /> Health risk documentation</label>
                    <label><input type="checkbox" /> Written contamination report</label>
                  </div>

                  <h4>Negotiation Strategy:</h4>
                  <textarea 
                    placeholder="How do you present your case?"
                    rows={4}
                  />
                </div>
              </div>

              <div className={styles.problemCard}>
                <h3>Problem 4: Safety Near-Miss Incident</h3>
                <div className={styles.problemDetails}>
                  <p><strong>Situation:</strong> Technician almost fell through damaged ceiling while inspecting roof space.</p>
                  
                  <h4>Immediate Actions:</h4>
                  <div className={styles.diagnosticList}>
                    <label><input type="checkbox" /> Stop all work immediately</label>
                    <label><input type="checkbox" /> Check worker for injuries</label>
                    <label><input type="checkbox" /> Secure the hazard area</label>
                    <label><input type="checkbox" /> Document the incident</label>
                    <label><input type="checkbox" /> Notify supervisor</label>
                    <label><input type="checkbox" /> Conduct toolbox talk</label>
                  </div>

                  <h4>Prevention Measures:</h4>
                  <textarea 
                    placeholder="What changes to prevent recurrence?"
                    rows={4}
                  />
                </div>
              </div>
            </div>

            <div className={styles.quickDecisions}>
              <h2>⚡ Rapid Decision Making</h2>
              
              <div className={styles.rapidFire}>
                <div className={styles.quickQ}>
                  <p><strong>Q1:</strong> Asbestos suspected in ceiling - your action?</p>
                  <select>
                    <option>Continue with masks</option>
                    <option>Stop work, test, wait</option>
                    <option>Remove carefully</option>
                    <option>Ignore if undisturbed</option>
                  </select>
                </div>

                <div className={styles.quickQ}>
                  <p><strong>Q2:</strong> Customer offers cash to skip insurance - your response?</p>
                  <select>
                    <option>Accept if good price</option>
                    <option>Decline politely</option>
                    <option>Refer to management</option>
                    <option>Do job off books</option>
                  </select>
                </div>

                <div className={styles.quickQ}>
                  <p><strong>Q3:</strong> Find drugs during contents pack-out - your action?</p>
                  <select>
                    <option>Dispose quietly</option>
                    <option>Report to police</option>
                    <option>Inform customer</option>
                    <option>Document and inform supervisor</option>
                  </select>
                </div>
              </div>
            </div>

            <button 
              className={styles.continueButton}
              onClick={() => {
                setActiveTab('documentation');
                markSectionComplete('troubleshooting');
              }}
            >
              Continue to Documentation →
            </button>
          </div>
        )}

        {activeTab === 'documentation' && (
          <div className={styles.contentSection}>
            <h1>Documentation Practice</h1>

            <div className={styles.documentationExercise}>
              <h2>📝 Complete Job Documentation Package</h2>
              
              <div className={styles.docPackage}>
                <h3>Create the Following Documents:</h3>
                
                <div className={styles.docSection}>
                  <h4>1. Initial Assessment Report</h4>
                  <textarea 
                    placeholder="Date/Time:
Property Address:
Contact Person:
Insurance Claim #:

Cause of Loss:

Affected Areas:

Immediate Actions Taken:

Equipment Deployed:

Safety Hazards Identified:

Recommendations:"
                    rows={12}
                  />
                </div>

                <div className={styles.docSection}>
                  <h4>2. Scope of Works</h4>
                  <textarea 
                    placeholder="WATER DAMAGE MITIGATION:
- Extract standing water from...
- Remove and dispose...
- Set up drying equipment...

STRUCTURAL DRYING:
- Monitor and document...
- Achieve drying goals...

ANTIMICROBIAL TREATMENT:
- Apply to all affected...

REPAIRS & RESTORATION:
- Replace damaged...
- Paint affected areas...

FINAL CLEANING:
- Detail clean all..."
                    rows={15}
                  />
                </div>

                <div className={styles.docSection}>
                  <h4>3. Daily Drying Log</h4>
                  <div className={styles.dryingLogTable}>
                    <table>
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Location</th>
                          <th>Material</th>
                          <th>Moisture %</th>
                          <th>Temp °C</th>
                          <th>RH %</th>
                          <th>GPP</th>
                          <th>Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><input type="date" /></td>
                          <td><input type="text" /></td>
                          <td><input type="text" /></td>
                          <td><input type="number" /></td>
                          <td><input type="number" /></td>
                          <td><input type="number" /></td>
                          <td><input type="number" /></td>
                          <td><input type="text" /></td>
                        </tr>
                        <tr>
                          <td><input type="date" /></td>
                          <td><input type="text" /></td>
                          <td><input type="text" /></td>
                          <td><input type="number" /></td>
                          <td><input type="number" /></td>
                          <td><input type="number" /></td>
                          <td><input type="number" /></td>
                          <td><input type="text" /></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className={styles.docSection}>
                  <h4>4. Customer Communication</h4>
                  <textarea 
                    placeholder="Dear [Customer Name],

Re: Water Damage Restoration at [Property Address]

I am writing to provide an update on the restoration work at your property.

Current Status:

Next Steps:

Timeline:

Important Information:

If you have any questions or concerns, please don't hesitate to contact me.

Kind regards,
[Your Name]
[Position]
[Contact Details]"
                    rows={15}
                  />
                </div>

                <div className={styles.docSection}>
                  <h4>5. Completion Certificate</h4>
                  <textarea 
                    placeholder="CERTIFICATE OF COMPLETION

Property: 
Claim #:
Date of Loss:
Completion Date:

We certify that:
- All water has been extracted
- Structure has been dried to industry standards
- Affected materials have been cleaned or replaced
- Antimicrobial treatment has been applied
- All repairs have been completed
- Property has been returned to pre-loss condition

Warranty: 12 months on all work performed

Signed:
Technician: _____________ Date: _______
Customer: ______________ Date: _______"
                    rows={15}
                  />
                </div>
              </div>

              <div className={styles.photoDocumentation}>
                <h3>Photo Documentation Requirements:</h3>
                <div className={styles.photoChecklist}>
                  <label><input type="checkbox" /> Exterior of property</label>
                  <label><input type="checkbox" /> Source of water damage</label>
                  <label><input type="checkbox" /> Each affected room (4 corners)</label>
                  <label><input type="checkbox" /> Close-ups of damage</label>
                  <label><input type="checkbox" /> Moisture meter readings</label>
                  <label><input type="checkbox" /> Equipment setup</label>
                  <label><input type="checkbox" /> Containment barriers</label>
                  <label><input type="checkbox" /> Progress photos (daily)</label>
                  <label><input type="checkbox" /> Completion photos</label>
                </div>
              </div>

              <button 
                className={styles.submitDocsBtn}
                onClick={() => markPracticalComplete('documentation')}
              >
                Submit Documentation Package
              </button>
            </div>

            <button 
              className={styles.continueButton}
              onClick={() => {
                setActiveTab('integration');
                markSectionComplete('documentation');
              }}
            >
              Continue to Skills Integration →
            </button>
          </div>
        )}

        {activeTab === 'integration' && (
          <div className={styles.contentSection}>
            <h1>Skills Integration Exercise</h1>

            <div className={styles.integrationChallenge}>
              <h2>🎯 Master Challenge: Complete Job Management</h2>
              
              <div className={styles.challengeScenario}>
                <h3>The Ultimate Test:</h3>
                <p>You're the lead technician on a complex commercial job. A 3-storey medical centre has suffered water damage from a burst pipe, affecting all levels. The facility needs to remain partially operational.</p>
                
                <div className={styles.challengeRequirements}>
                  <h4>Your Complete Response Must Include:</h4>
                  
                  <div className={styles.responseSection}>
                    <h5>1. Initial Response Plan (30 mins)</h5>
                    <textarea 
                      placeholder="Detail your first 30 minutes on site..."
                      rows={5}
                    />
                  </div>

                  <div className={styles.responseSection}>
                    <h5>2. Stakeholder Management</h5>
                    <textarea 
                      placeholder="List all stakeholders and communication plan..."
                      rows={5}
                    />
                  </div>

                  <div className={styles.responseSection}>
                    <h5>3. Work Zones & Containment</h5>
                    <textarea 
                      placeholder="Describe containment strategy for operational areas..."
                      rows={5}
                    />
                  </div>

                  <div className={styles.responseSection}>
                    <h5>4. Equipment Calculation</h5>
                    <textarea 
                      placeholder="Calculate all equipment needs for 2000m²..."
                      rows={5}
                    />
                  </div>

                  <div className={styles.responseSection}>
                    <h5>5. Health & Safety Plan</h5>
                    <textarea 
                      placeholder="Identify hazards and control measures..."
                      rows={5}
                    />
                  </div>

                  <div className={styles.responseSection}>
                    <h5>6. Timeline & Phases</h5>
                    <textarea 
                      placeholder="Create phased restoration timeline..."
                      rows={5}
                    />
                  </div>

                  <div className={styles.responseSection}>
                    <h5>7. Quality Control</h5>
                    <textarea 
                      placeholder="List quality checkpoints and standards..."
                      rows={5}
                    />
                  </div>

                  <div className={styles.responseSection}>
                    <h5>8. Cost Estimate</h5>
                    <textarea 
                      placeholder="Provide rough cost breakdown..."
                      rows={5}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.peerReview}>
                <h3>Self-Assessment Checklist:</h3>
                <div className={styles.selfAssessment}>
                  <label><input type="checkbox" /> Considered all safety requirements</label>
                  <label><input type="checkbox" /> Addressed infection control for medical facility</label>
                  <label><input type="checkbox" /> Planned for business continuity</label>
                  <label><input type="checkbox" /> Included all required documentation</label>
                  <label><input type="checkbox" /> Calculated resources accurately</label>
                  <label><input type="checkbox" /> Considered all stakeholders</label>
                  <label><input type="checkbox" /> Applied IICRC standards</label>
                  <label><input type="checkbox" /> Planned for potential complications</label>
                </div>
              </div>

              <button 
                className={styles.submitChallengeBtn}
                onClick={() => markPracticalComplete('customerInteraction')}
              >
                Submit Master Challenge
              </button>
            </div>

            <button 
              className={styles.continueButton}
              onClick={() => {
                setActiveTab('review');
                markSectionComplete('integration');
              }}
            >
              Continue to Final Review →
            </button>
          </div>
        )}

        {activeTab === 'review' && (
          <div className={styles.contentSection}>
            <h1>Day 13 Final Review</h1>

            <div className={styles.reviewSummary}>
              <h2>📊 Practical Training Summary</h2>
              
              <div className={styles.completionStatus}>
                <h3>Exercise Completion Status:</h3>
                <div className={styles.statusGrid}>
                  <div className={styles.statusItem}>
                    <span className={practicalProgress.waterDamage ? '✅' : '❌'}</span>
                    <p>Water Damage Scenario</p>
                  </div>
                  <div className={styles.statusItem}>
                    <span className={practicalProgress.mouldAssessment ? '✅' : '❌'}</span>
                    <p>Mould Assessment</p>
                  </div>
                  <div className={styles.statusItem}>
                    <span className={practicalProgress.fireRestoration ? '✅' : '❌'}</span>
                    <p>Fire Restoration</p>
                  </div>
                  <div className={styles.statusItem}>
                    <span className={practicalProgress.documentation ? '✅' : '❌'}</span>
                    <p>Documentation</p>
                  </div>
                  <div className={styles.statusItem}>
                    <span className={practicalProgress.customerInteraction ? '✅' : '❌'}</span>
                    <p>Customer Service</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.keySkillsReview}>
              <h2>🎯 Key Skills Demonstrated</h2>
              
              <div className={styles.skillsGrid}>
                <div className={styles.skillCategory}>
                  <h3>Technical Skills</h3>
                  <ul>
                    <li>✓ Water extraction and drying setup</li>
                    <li>✓ Moisture mapping and documentation</li>
                    <li>✓ Equipment calculation and placement</li>
                    <li>✓ Contamination assessment</li>
                    <li>✓ Structural drying monitoring</li>
                  </ul>
                </div>

                <div className={styles.skillCategory}>
                  <h3>Safety & Compliance</h3>
                  <ul>
                    <li>✓ Hazard identification</li>
                    <li>✓ PPE selection</li>
                    <li>✓ Containment procedures</li>
                    <li>✓ WHS documentation</li>
                    <li>✓ Regulatory compliance</li>
                  </ul>
                </div>

                <div className={styles.skillCategory}>
                  <h3>Communication</h3>
                  <ul>
                    <li>✓ Customer interaction</li>
                    <li>✓ Insurance liaison</li>
                    <li>✓ Written reports</li>
                    <li>✓ Stakeholder management</li>
                    <li>✓ Team coordination</li>
                  </ul>
                </div>

                <div className={styles.skillCategory}>
                  <h3>Problem Solving</h3>
                  <ul>
                    <li>✓ Troubleshooting drying issues</li>
                    <li>✓ Handling complaints</li>
                    <li>✓ Insurance negotiations</li>
                    <li>✓ Safety incident response</li>
                    <li>✓ Complex decision making</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.readinessAssessment}>
              <h2>🚀 Field Readiness Checklist</h2>
              
              <div className={styles.readinessChecklist}>
                <h3>Are you ready for field deployment?</h3>
                <label><input type="checkbox" /> I can safely assess water damage situations</label>
                <label><input type="checkbox" /> I understand psychrometric principles</label>
                <label><input type="checkbox" /> I can calculate equipment requirements</label>
                <label><input type="checkbox" /> I know IICRC drying standards</label>
                <label><input type="checkbox" /> I can identify and handle mould safely</label>
                <label><input type="checkbox" /> I understand fire damage restoration</label>
                <label><input type="checkbox" /> I can handle biohazard situations safely</label>
                <label><input type="checkbox" /> I can document jobs properly</label>
                <label><input type="checkbox" /> I can communicate with customers professionally</label>
                <label><input type="checkbox" /> I understand insurance processes</label>
                <label><input type="checkbox" /> I know when to escalate issues</label>
                <label><input type="checkbox" /> I can work safely and comply with WHS</label>
              </div>
            </div>

            <div className={styles.nextSteps}>
              <h2>📋 Next Steps</h2>
              <div className={styles.stepsGrid}>
                <div className={styles.stepCard}>
                  <h3>Tomorrow: Day 14</h3>
                  <p>Final assessment and certification exam</p>
                </div>
                <div className={styles.stepCard}>
                  <h3>Field Shadowing</h3>
                  <p>2 weeks with experienced technician</p>
                </div>
                <div className={styles.stepCard}>
                  <h3>Probation Period</h3>
                  <p>3 months supervised field work</p>
                </div>
                <div className={styles.stepCard}>
                  <h3>Full Certification</h3>
                  <p>Independent technician status</p>
                </div>
              </div>
            </div>

            <div className={styles.completionCard}>
              <h2>🏆 Day 13 Complete!</h2>
              <p>Excellent work completing all practical exercises. You've demonstrated the hands-on skills needed for field work.</p>
              <div className={styles.completionActions}>
                <button 
                  className={styles.certificateButton}
                  onClick={() => markSectionComplete('review')}
                >
                  Complete Day 13
                </button>
                <Link 
                  href="/portal/training/modules/day-14"
                  className={styles.nextModuleButton}
                >
                  Final Day: Certification →
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}