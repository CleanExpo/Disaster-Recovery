'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../training.module.css';

export default function Day14Module() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [examStarted, setExamStarted] = useState(false);
  const [examCompleted, setExamCompleted] = useState(false);
  const [examAnswers, setExamAnswers] = useState<{[key: string]: string}>({});
  const [examScore, setExamScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(90); // 90 minutes

  const handleExamAnswer = (question: string, answer: string) => {
    setExamAnswers({ ...examAnswers, [question]: answer });
  };

  const calculateExamScore = () => {
    // This would normally check against correct answers
    const totalQuestions = 50;
    const answered = Object.keys(examAnswers).length;
    const score = Math.round((answered / totalQuestions) * 100);
    setExamScore(score);
    setExamCompleted(true);
  };

  return (
    <div className={styles.moduleContainer}>
      {/* Sidebar Navigation */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <Link href="/portal/training" className={styles.backLink}>
            ← Back to Training Hub
          </Link>
          <h2>Day 14: Certification</h2>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: examCompleted ? '100%' : '0%' }}
            />
          </div>
          <span className={styles.progressText}>
            {examCompleted ? 'Complete' : 'Final Assessment'}
          </span>
        </div>

        <nav className={styles.sidebarNav}>
          <button 
            className={`${styles.navItem} ${activeTab === 'overview' ? styles.active : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`${styles.navItem} ${activeTab === 'review' ? styles.active : ''}`}
            onClick={() => setActiveTab('review')}
          >
            Course Review
          </button>
          <button 
            className={`${styles.navItem} ${activeTab === 'exam' ? styles.active : ''}`}
            onClick={() => setActiveTab('exam')}
          >
            Final Exam
          </button>
          <button 
            className={`${styles.navItem} ${activeTab === 'certification' ? styles.active : ''}`}
            onClick={() => setActiveTab('certification')}
            disabled={!examCompleted}
          >
            Certification
          </button>
          <button 
            className={`${styles.navItem} ${activeTab === 'resources' ? styles.active : ''}`}
            onClick={() => setActiveTab('resources')}
          >
            Resources
          </button>
          <button 
            className={`${styles.navItem} ${activeTab === 'next' ? styles.active : ''}`}
            onClick={() => setActiveTab('next')}
          >
            Next Steps
          </button>
        </nav>

        <div className={styles.sidebarFooter}>
          <button className={styles.resourcesBtn}>
            📚 Download All Materials
          </button>
          {examCompleted && (
            <button className={styles.certificateBtn}>
              🏆 Download Certificate
            </button>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        {activeTab === 'overview' && (
          <div className={styles.contentSection}>
            <h1>Day 14: Final Assessment & Certification</h1>
            
            <div className={styles.finalDayIntro}>
              <h2>🎓 Congratulations on Reaching the Final Day!</h2>
              <p>You've completed 13 days of intensive training in disaster recovery and restoration. Today, you'll demonstrate your knowledge through a comprehensive assessment and receive your certification.</p>
            </div>

            <div className={styles.examInfo}>
              <h2>📝 Final Exam Information</h2>
              <div className={styles.examDetails}>
                <div className={styles.examDetailCard}>
                  <h3>Format</h3>
                  <ul>
                    <li>50 multiple choice questions</li>
                    <li>10 scenario-based problems</li>
                    <li>5 practical calculations</li>
                  </ul>
                </div>
                <div className={styles.examDetailCard}>
                  <h3>Duration</h3>
                  <ul>
                    <li>90 minutes time limit</li>
                    <li>One attempt only</li>
                    <li>No breaks permitted</li>
                  </ul>
                </div>
                <div className={styles.examDetailCard}>
                  <h3>Passing Score</h3>
                  <ul>
                    <li>Minimum 80% required</li>
                    <li>Immediate results</li>
                    <li>Certificate on pass</li>
                  </ul>
                </div>
                <div className={styles.examDetailCard}>
                  <h3>Topics Covered</h3>
                  <ul>
                    <li>All 13 days of content</li>
                    <li>Practical applications</li>
                    <li>Safety & compliance</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.trainingRecap}>
              <h2>📚 Your Training Journey</h2>
              <div className={styles.journeyTimeline}>
                <div className={styles.weekRecap}>
                  <h3>Week 1: Foundation</h3>
                  <ul>
                    <li>✅ Day 1: Industry Introduction</li>
                    <li>✅ Day 2: Safety & PPE</li>
                    <li>✅ Day 3: Water Damage Basics</li>
                    <li>✅ Day 4: Advanced Water Damage</li>
                    <li>✅ Day 5: Structural Drying</li>
                    <li>✅ Day 6: Equipment & Technology</li>
                    <li>✅ Day 7: Documentation & Quality</li>
                  </ul>
                </div>
                <div className={styles.weekRecap}>
                  <h3>Week 2: Specialisation</h3>
                  <ul>
                    <li>✅ Day 8: Mould Remediation</li>
                    <li>✅ Day 9: Fire & Smoke Damage</li>
                    <li>✅ Day 10: Biohazard & Trauma</li>
                    <li>✅ Day 11: Commercial & Large Loss</li>
                    <li>✅ Day 12: Business Operations</li>
                    <li>✅ Day 13: Practical Application</li>
                    <li>📝 Day 14: Certification</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.readyCheck}>
              <h2>✅ Final Readiness Check</h2>
              <p>Before starting your exam, ensure you:</p>
              <ul>
                <li>Have reviewed all course materials</li>
                <li>Understand IICRC standards and guidelines</li>
                <li>Can perform psychrometric calculations</li>
                <li>Know safety protocols and PPE requirements</li>
                <li>Understand insurance and documentation processes</li>
                <li>Have a quiet environment for the exam</li>
              </ul>
            </div>

            <button 
              className={styles.startButton}
              onClick={() => setActiveTab('review')}
            >
              Begin Final Review →
            </button>
          </div>
        )}

        {activeTab === 'review' && (
          <div className={styles.contentSection}>
            <h1>Comprehensive Course Review</h1>

            <div className={styles.reviewSection}>
              <h2>🔑 Key Concepts Review</h2>
              
              <div className={styles.conceptGrid}>
                <div className={styles.conceptCard}>
                  <h3>Water Damage Categories</h3>
                  <ul>
                    <li><strong>Category 1:</strong> Clean water from sanitary source</li>
                    <li><strong>Category 2:</strong> Grey water with contamination</li>
                    <li><strong>Category 3:</strong> Black water, grossly contaminated</li>
                    <li>Time and temperature can change categories</li>
                    <li>Always assume worst category when uncertain</li>
                  </ul>
                </div>

                <div className={styles.conceptCard}>
                  <h3>Classes of Water Damage</h3>
                  <ul>
                    <li><strong>Class 1:</strong> Least amount, &lt;5% affected</li>
                    <li><strong>Class 2:</strong> Large amount, 10-40% affected</li>
                    <li><strong>Class 3:</strong> Greatest amount, &gt;40% affected</li>
                    <li><strong>Class 4:</strong> Specialty drying situations</li>
                    <li>Determines equipment and time required</li>
                  </ul>
                </div>

                <div className={styles.conceptCard}>
                  <h3>Psychrometry Essentials</h3>
                  <ul>
                    <li>Temperature affects moisture capacity</li>
                    <li>Relative humidity = actual/potential moisture</li>
                    <li>GPP = Grains per pound (7000 grains = 1 lb)</li>
                    <li>Vapour pressure drives moisture movement</li>
                    <li>Dew point = condensation temperature</li>
                  </ul>
                </div>

                <div className={styles.conceptCard}>
                  <h3>Drying Principles</h3>
                  <ul>
                    <li>Remove excess water (extraction)</li>
                    <li>Evaporation through air movement</li>
                    <li>Dehumidification to remove moisture</li>
                    <li>Temperature control for optimal drying</li>
                    <li>Monitor daily until dry standard met</li>
                  </ul>
                </div>

                <div className={styles.conceptCard}>
                  <h3>Mould Fundamentals</h3>
                  <ul>
                    <li>Needs moisture, food, temperature, time</li>
                    <li>Can grow in 24-48 hours</li>
                    <li>Containment prevents spread</li>
                    <li>HEPA filtration required</li>
                    <li>Never use bleach on porous materials</li>
                  </ul>
                </div>

                <div className={styles.conceptCard}>
                  <h3>Fire & Smoke Types</h3>
                  <ul>
                    <li><strong>Wet smoke:</strong> Low heat, sticky, strong odour</li>
                    <li><strong>Dry smoke:</strong> High heat, powdery, easier clean</li>
                    <li><strong>Protein:</strong> Nearly invisible, discolours</li>
                    <li><strong>Fuel oil:</strong> Furnace puffback, difficult</li>
                    <li>Different cleaning methods for each</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.criticalFormulas}>
              <h2>📐 Critical Formulas</h2>
              
              <div className={styles.formulaGrid}>
                <div className={styles.formulaCard}>
                  <h3>Air Movers Required</h3>
                  <p>Linear feet ÷ 10-16 feet = Number of air movers</p>
                  <p>OR</p>
                  <p>1 air mover per 50-70 sq ft (Class 2)</p>
                </div>

                <div className={styles.formulaCard}>
                  <h3>Dehumidification (AHAM)</h3>
                  <p>Class 1: ÷ 40 = Pints/day</p>
                  <p>Class 2: ÷ 30 = Pints/day</p>
                  <p>Class 3: ÷ 20 = Pints/day</p>
                </div>

                <div className={styles.formulaCard}>
                  <h3>Moisture Content</h3>
                  <p>MC% = (Wet weight - Dry weight) ÷ Dry weight × 100</p>
                </div>

                <div className={styles.formulaCard}>
                  <h3>Air Changes (ACH)</h3>
                  <p>ACH = (CFM × 60) ÷ Cubic feet of room</p>
                  <p>Target: 4-6 ACH minimum</p>
                </div>
              </div>
            </div>

            <div className={styles.safetyReminders}>
              <h2>⚠️ Critical Safety Reminders</h2>
              <ul>
                <li>Always test for asbestos in materials pre-1990</li>
                <li>Never enter confined spaces without proper protocols</li>
                <li>Category 3 water requires full PPE including respirator</li>
                <li>Electrical hazards - always check before entering water</li>
                <li>Document all safety hazards and near-misses</li>
                <li>Stop work authority - anyone can stop unsafe work</li>
              </ul>
            </div>

            <div className={styles.insuranceEssentials}>
              <h2>🏢 Insurance & Documentation</h2>
              <div className={styles.insuranceGrid}>
                <div>
                  <h3>Required Documentation</h3>
                  <ul>
                    <li>Cause and origin report</li>
                    <li>Photo documentation</li>
                    <li>Moisture logs (daily)</li>
                    <li>Scope of works</li>
                    <li>Xactimate estimate</li>
                    <li>Completion certificate</li>
                  </ul>
                </div>
                <div>
                  <h3>Key Insurers</h3>
                  <ul>
                    <li>IAG (NRMA, CGU, SGIO)</li>
                    <li>Suncorp (AAMI, GIO)</li>
                    <li>Allianz</li>
                    <li>QBE</li>
                    <li>Zurich</li>
                  </ul>
                </div>
              </div>
            </div>

            <button 
              className={styles.continueButton}
              onClick={() => setActiveTab('exam')}
            >
              Proceed to Final Exam →
            </button>
          </div>
        )}

        {activeTab === 'exam' && (
          <div className={styles.contentSection}>
            {!examStarted ? (
              <div className={styles.examPreStart}>
                <h1>Final Certification Exam</h1>
                
                <div className={styles.examInstructions}>
                  <h2>📋 Exam Instructions</h2>
                  <ul>
                    <li>You have 90 minutes to complete all questions</li>
                    <li>The exam contains 50 questions covering all course material</li>
                    <li>You need 80% (40 correct answers) to pass</li>
                    <li>Once started, you cannot pause the exam</li>
                    <li>Each question has only one correct answer</li>
                    <li>Review your answers before submitting</li>
                  </ul>
                </div>

                <div className={styles.examWarning}>
                  <h3>⚠️ Important</h3>
                  <p>Ensure you have a stable internet connection and will not be interrupted. The exam must be completed in one session.</p>
                </div>

                <button 
                  className={styles.startExamButton}
                  onClick={() => setExamStarted(true)}
                >
                  Start Exam
                </button>
              </div>
            ) : !examCompleted ? (
              <div className={styles.examContent}>
                <div className={styles.examHeader}>
                  <h1>Final Certification Exam</h1>
                  <div className={styles.examTimer}>
                    ⏱️ Time Remaining: {timeRemaining} minutes
                  </div>
                </div>

                <div className={styles.examQuestions}>
                  {/* Sample exam questions - in reality would be 50 */}
                  
                  <div className={styles.examQuestion}>
                    <h3>Question 1</h3>
                    <p>What is the maximum time frame before Category 1 water becomes Category 2?</p>
                    <div className={styles.examOptions}>
                      <label>
                        <input 
                          type="radio" 
                          name="exam_q1" 
                          onChange={() => handleExamAnswer('q1', 'a')}
                        />
                        24 hours
                      </label>
                      <label>
                        <input 
                          type="radio" 
                          name="exam_q1" 
                          onChange={() => handleExamAnswer('q1', 'b')}
                        />
                        48 hours
                      </label>
                      <label>
                        <input 
                          type="radio" 
                          name="exam_q1" 
                          onChange={() => handleExamAnswer('q1', 'c')}
                        />
                        72 hours
                      </label>
                      <label>
                        <input 
                          type="radio" 
                          name="exam_q1" 
                          onChange={() => handleExamAnswer('q1', 'd')}
                        />
                        96 hours
                      </label>
                    </div>
                  </div>

                  <div className={styles.examQuestion}>
                    <h3>Question 2</h3>
                    <p>Which type of dehumidifier works best in cold conditions?</p>
                    <div className={styles.examOptions}>
                      <label>
                        <input 
                          type="radio" 
                          name="exam_q2" 
                          onChange={() => handleExamAnswer('q2', 'a')}
                        />
                        Refrigerant
                      </label>
                      <label>
                        <input 
                          type="radio" 
                          name="exam_q2" 
                          onChange={() => handleExamAnswer('q2', 'b')}
                        />
                        Desiccant
                      </label>
                      <label>
                        <input 
                          type="radio" 
                          name="exam_q2" 
                          onChange={() => handleExamAnswer('q2', 'c')}
                        />
                        LGR
                      </label>
                      <label>
                        <input 
                          type="radio" 
                          name="exam_q2" 
                          onChange={() => handleExamAnswer('q2', 'd')}
                        />
                        Conventional
                      </label>
                    </div>
                  </div>

                  <div className={styles.examQuestion}>
                    <h3>Question 3</h3>
                    <p>What is the proper PPE for Category 3 water extraction?</p>
                    <div className={styles.examOptions}>
                      <label>
                        <input 
                          type="radio" 
                          name="exam_q3" 
                          onChange={() => handleExamAnswer('q3', 'a')}
                        />
                        Gloves and boots only
                      </label>
                      <label>
                        <input 
                          type="radio" 
                          name="exam_q3" 
                          onChange={() => handleExamAnswer('q3', 'b')}
                        />
                        Full PPE including N95 respirator
                      </label>
                      <label>
                        <input 
                          type="radio" 
                          name="exam_q3" 
                          onChange={() => handleExamAnswer('q3', 'c')}
                        />
                        Full PPE including P2/P3 respirator
                      </label>
                      <label>
                        <input 
                          type="radio" 
                          name="exam_q3" 
                          onChange={() => handleExamAnswer('q3', 'd')}
                        />
                        Standard work clothes
                      </label>
                    </div>
                  </div>

                  <div className={styles.examCalculation}>
                    <h3>Calculation Question</h3>
                    <p>A room measures 10m x 8m x 3m high with Class 2 water damage. Using the formula of 1 air mover per 60 sq ft, how many air movers are required? (1m² = 10.76 sq ft)</p>
                    <input 
                      type="number" 
                      placeholder="Enter number of air movers"
                      onChange={(e) => handleExamAnswer('calc1', e.target.value)}
                    />
                  </div>

                  <div className={styles.examScenario}>
                    <h3>Scenario Question</h3>
                    <p>You arrive at a property where the customer reports a "musty smell" but no visible water damage. The smell is strongest in the bedroom. What is your first action?</p>
                    <div className={styles.examOptions}>
                      <label>
                        <input 
                          type="radio" 
                          name="exam_scenario1" 
                          onChange={() => handleExamAnswer('scenario1', 'a')}
                        />
                        Set up air scrubbers immediately
                      </label>
                      <label>
                        <input 
                          type="radio" 
                          name="exam_scenario1" 
                          onChange={() => handleExamAnswer('scenario1', 'b')}
                        />
                        Use moisture meter to check for hidden moisture
                      </label>
                      <label>
                        <input 
                          type="radio" 
                          name="exam_scenario1" 
                          onChange={() => handleExamAnswer('scenario1', 'c')}
                        />
                        Apply antimicrobial to all surfaces
                      </label>
                      <label>
                        <input 
                          type="radio" 
                          name="exam_scenario1" 
                          onChange={() => handleExamAnswer('scenario1', 'd')}
                        />
                        Tell customer it's not covered by insurance
                      </label>
                    </div>
                  </div>

                  {/* Note: In production, all 50 questions would be here */}
                  <p className={styles.examNote}>
                    [Questions 6-50 would appear here in the actual exam]
                  </p>
                </div>

                <div className={styles.examSubmit}>
                  <button 
                    className={styles.submitExamButton}
                    onClick={calculateExamScore}
                  >
                    Submit Exam
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.examResults}>
                <h1>Exam Results</h1>
                
                <div className={styles.scoreDisplay}>
                  <h2>Your Score: {examScore}%</h2>
                  {examScore >= 80 ? (
                    <div className={styles.passResult}>
                      <h3>🎉 Congratulations! You Passed!</h3>
                      <p>You have successfully completed the NRP Disaster Recovery Certification Program.</p>
                    </div>
                  ) : (
                    <div className={styles.failResult}>
                      <h3>Unfortunately, you did not pass</h3>
                      <p>You need 80% to pass. Please review the materials and contact your trainer.</p>
                    </div>
                  )}
                </div>

                {examScore >= 80 && (
                  <button 
                    className={styles.viewCertificateButton}
                    onClick={() => setActiveTab('certification')}
                  >
                    View Your Certificate →
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'certification' && examCompleted && examScore >= 80 && (
          <div className={styles.contentSection}>
            <h1>Certification Achieved!</h1>
            
            <div className={styles.certificateDisplay}>
              <div className={styles.certificate}>
                <div className={styles.certificateHeader}>
                  <h1>Certificate of Completion</h1>
                  <p>This is to certify that</p>
                </div>
                
                <div className={styles.certificateName}>
                  <h2>[Technician Name]</h2>
                </div>
                
                <div className={styles.certificateBody}>
                  <p>has successfully completed the</p>
                  <h3>NRP Disaster Recovery & Restoration</h3>
                  <h3>Professional Certification Program</h3>
                  <p>Achieving a score of {examScore}%</p>
                </div>
                
                <div className={styles.certificateDetails}>
                  <p>This 14-day intensive program covers:</p>
                  <ul>
                    <li>Water Damage Mitigation</li>
                    <li>Structural Drying</li>
                    <li>Mould Remediation</li>
                    <li>Fire & Smoke Restoration</li>
                    <li>Biohazard Cleaning</li>
                    <li>Commercial Large Loss</li>
                  </ul>
                </div>
                
                <div className={styles.certificateFooter}>
                  <div className={styles.certSignature}>
                    <p>_____________________</p>
                    <p>Training Director</p>
                    <p>Date: {new Date().toLocaleDateString()}</p>
                  </div>
                  <div className={styles.certSeal}>
                    <p>NRP CERTIFIED</p>
                    <p>TECHNICIAN</p>
                  </div>
                  <div className={styles.certSignature}>
                    <p>_____________________</p>
                    <p>Operations Manager</p>
                    <p>Cert #: NRP-2024-001</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.certificationBenefits}>
              <h2>🏆 Your Certification Benefits</h2>
              <ul>
                <li>Recognised across the Australian restoration industry</li>
                <li>Valid for 2 years with annual refresher required</li>
                <li>Access to ongoing professional development</li>
                <li>Priority for specialized training opportunities</li>
                <li>Eligible for senior technician pathway</li>
              </ul>
            </div>

            <div className={styles.downloadOptions}>
              <button className={styles.downloadCertButton}>
                📥 Download Certificate (PDF)
              </button>
              <button className={styles.downloadTranscriptButton}>
                📄 Download Training Transcript
              </button>
              <button className={styles.shareButton}>
                🔗 Share on LinkedIn
              </button>
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className={styles.contentSection}>
            <h1>Training Resources & References</h1>
            
            <div className={styles.resourceLibrary}>
              <h2>📚 Resource Library</h2>
              
              <div className={styles.resourceCategory}>
                <h3>Standards & Guidelines</h3>
                <ul>
                  <li>📄 IICRC S500 Water Damage Standard</li>
                  <li>📄 IICRC S520 Mould Remediation Standard</li>
                  <li>📄 IICRC S540 Trauma and Crime Scene Cleanup</li>
                  <li>📄 IICRC S700 Fire and Smoke Restoration</li>
                  <li>📄 AS/NZS 4360 Risk Management</li>
                  <li>📄 Australian Mould Guidelines</li>
                </ul>
              </div>

              <div className={styles.resourceCategory}>
                <h3>Quick Reference Guides</h3>
                <ul>
                  <li>📋 Psychrometric Chart</li>
                  <li>📋 Equipment Calculation Formulas</li>
                  <li>📋 Moisture Content Standards</li>
                  <li>📋 PPE Selection Matrix</li>
                  <li>📋 Chemical Compatibility Chart</li>
                  <li>📋 Insurance Carrier Contacts</li>
                </ul>
              </div>

              <div className={styles.resourceCategory}>
                <h3>Templates & Forms</h3>
                <ul>
                  <li>📝 Job Assessment Template</li>
                  <li>📝 Moisture Log Sheet</li>
                  <li>📝 Scope of Works Template</li>
                  <li>📝 Customer Agreement Form</li>
                  <li>📝 Completion Certificate</li>
                  <li>📝 Safety Checklist</li>
                </ul>
              </div>

              <div className={styles.resourceCategory}>
                <h3>Training Videos</h3>
                <ul>
                  <li>🎥 Proper PPE Donning/Doffing</li>
                  <li>🎥 Moisture Meter Usage</li>
                  <li>🎥 Equipment Setup Demonstrations</li>
                  <li>🎥 Containment Procedures</li>
                  <li>🎥 Customer Communication Tips</li>
                  <li>🎥 Xactimate Basics</li>
                </ul>
              </div>
            </div>

            <div className={styles.continuingEducation}>
              <h2>📖 Continuing Education</h2>
              <div className={styles.educationOptions}>
                <div className={styles.courseOption}>
                  <h3>Advanced Courses</h3>
                  <ul>
                    <li>Applied Structural Drying (ASD)</li>
                    <li>Applied Microbial Remediation (AMRT)</li>
                    <li>Fire & Smoke Restoration (FSRT)</li>
                    <li>Trauma & Crime Scene (TCST)</li>
                  </ul>
                </div>
                <div className={styles.courseOption}>
                  <h3>Specialisations</h3>
                  <ul>
                    <li>Commercial Drying Specialist</li>
                    <li>Contents Restoration</li>
                    <li>Electronics Restoration</li>
                    <li>Document Recovery</li>
                  </ul>
                </div>
              </div>
            </div>

            <button 
              className={styles.downloadAllButton}
            >
              📦 Download All Resources (ZIP)
            </button>
          </div>
        )}

        {activeTab === 'next' && (
          <div className={styles.contentSection}>
            <h1>Your Next Steps</h1>
            
            <div className={styles.careerPathway}>
              <h2>🚀 Career Progression Pathway</h2>
              
              <div className={styles.pathwayTimeline}>
                <div className={styles.pathwayStage}>
                  <h3>Immediate (Week 1-2)</h3>
                  <ul>
                    <li>Shadow experienced technician</li>
                    <li>Observe 5+ different job types</li>
                    <li>Practice equipment setup</li>
                    <li>Review job documentation</li>
                  </ul>
                </div>

                <div className={styles.pathwayStage}>
                  <h3>Month 1-3: Probation</h3>
                  <ul>
                    <li>Supervised field work</li>
                    <li>Handle Category 1 & 2 water</li>
                    <li>Basic moisture mapping</li>
                    <li>Customer interaction practice</li>
                  </ul>
                </div>

                <div className={styles.pathwayStage}>
                  <h3>Month 4-6: Development</h3>
                  <ul>
                    <li>Independent small jobs</li>
                    <li>Mould assessments</li>
                    <li>Fire damage basics</li>
                    <li>Xactimate proficiency</li>
                  </ul>
                </div>

                <div className={styles.pathwayStage}>
                  <h3>Month 7-12: Advancement</h3>
                  <ul>
                    <li>Lead technician opportunities</li>
                    <li>Complex job management</li>
                    <li>Mentoring new staff</li>
                    <li>Specialisation selection</li>
                  </ul>
                </div>

                <div className={styles.pathwayStage}>
                  <h3>Year 2+: Leadership</h3>
                  <ul>
                    <li>Project management</li>
                    <li>Large loss coordination</li>
                    <li>Business development</li>
                    <li>Technical expertise</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.supportResources}>
              <h2>💪 Ongoing Support</h2>
              
              <div className={styles.supportGrid}>
                <div className={styles.supportCard}>
                  <h3>Mentorship Program</h3>
                  <p>Paired with senior technician for 6 months</p>
                  <ul>
                    <li>Weekly check-ins</li>
                    <li>On-call support</li>
                    <li>Skills development</li>
                  </ul>
                </div>

                <div className={styles.supportCard}>
                  <h3>Technical Support</h3>
                  <p>24/7 technical helpline available</p>
                  <ul>
                    <li>Equipment troubleshooting</li>
                    <li>Standards clarification</li>
                    <li>Complex situations</li>
                  </ul>
                </div>

                <div className={styles.supportCard}>
                  <h3>Professional Network</h3>
                  <p>Connect with industry professionals</p>
                  <ul>
                    <li>Internal forums</li>
                    <li>Industry events</li>
                    <li>Knowledge sharing</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.finalMessage}>
              <h2>🎊 Congratulations & Welcome!</h2>
              <p>You are now part of the NRP Disaster Recovery team. Your journey in the restoration industry begins now. Remember:</p>
              <ul>
                <li>Every job is a learning opportunity</li>
                <li>Safety is always the top priority</li>
                <li>Customer service sets us apart</li>
                <li>Quality work builds reputation</li>
                <li>Continuous improvement is key</li>
              </ul>
              
              <div className={styles.contactInfo}>
                <h3>Important Contacts</h3>
                <p>📞 Operations Manager: 1300 XXX XXX</p>
                <p>📞 24/7 Technical Support: 1300 XXX XXX</p>
                <p>📧 Training Department: training@nrp.com.au</p>
                <p>📧 HR Department: hr@nrp.com.au</p>
              </div>
            </div>

            <div className={styles.completionActions}>
              <Link 
                href="/portal"
                className={styles.returnPortalButton}
              >
                Return to Portal Dashboard
              </Link>
              <button className={styles.printButton}>
                🖨️ Print Completion Report
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}