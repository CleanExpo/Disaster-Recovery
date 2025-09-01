'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../training.module.css';

export default function Day10Module() {
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
          <h2>Day 10: Biohazard</h2>
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
            className={`${styles.navItem} ${activeTab === 'biohazard-types' ? styles.active : ''}`}
            onClick={() => setActiveTab('biohazard-types')}
          >
            Biohazard Classifications
          </button>
          <button 
            className={`${styles.navItem} ${activeTab === 'trauma-cleaning' ? styles.active : ''}`}
            onClick={() => setActiveTab('trauma-cleaning')}
          >
            Trauma Scene Cleaning
          </button>
          <button 
            className={`${styles.navItem} ${activeTab === 'infectious' ? styles.active : ''}`}
            onClick={() => setActiveTab('infectious')}
          >
            Infectious Disease Control
          </button>
          <button 
            className={`${styles.navItem} ${activeTab === 'procedures' ? styles.active : ''}`}
            onClick={() => setActiveTab('procedures')}
          >
            Safety Procedures
          </button>
          <button 
            className={`${styles.navItem} ${activeTab === 'scenarios' ? styles.active : ''}`}
            onClick={() => setActiveTab('scenarios')}
          >
            Practical Scenarios
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
            <h1>Day 10: Biohazard & Trauma Cleaning</h1>
            
            <div className={styles.learningObjectives}>
              <h2>Learning Objectives</h2>
              <ul>
                <li>Understand biohazard classifications and risk levels</li>
                <li>Master trauma scene cleaning protocols</li>
                <li>Learn bloodborne pathogen safety procedures</li>
                <li>Understand infectious disease decontamination</li>
                <li>Apply proper PPE selection and usage</li>
                <li>Comply with Australian health and safety regulations</li>
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
                  <p>Safety protocols</p>
                </div>
              </div>
            </div>

            <button 
              className={styles.startButton}
              onClick={() => {
                setActiveTab('biohazard-types');
                markSectionComplete('overview');
              }}
            >
              Start Learning →
            </button>
          </div>
        )}

        {activeTab === 'biohazard-types' && (
          <div className={styles.contentSection}>
            <h1>Biohazard Classifications</h1>

            <div className={styles.warningCard}>
              <h2>☣️ CRITICAL SAFETY WARNING</h2>
              <p>Biohazard cleaning involves serious health risks. Never attempt without proper training, PPE, and authorisation. This training covers procedures but does not replace hands-on certification.</p>
            </div>

            <div className={styles.infoCard}>
              <h2>🔬 Biohazard Risk Levels</h2>
              
              <div className={styles.riskLevel}>
                <h3>Level 1 - Minimal Risk</h3>
                <ul>
                  <li>Small amounts of blood or bodily fluids</li>
                  <li>Household accidents, minor injuries</li>
                  <li>Standard precautions sufficient</li>
                  <li>Examples: Nosebleeds, small cuts, vomit</li>
                  <li>PPE: Gloves, safety glasses, disposable gown</li>
                </ul>
              </div>

              <div className={styles.riskLevel}>
                <h3>Level 2 - Moderate Risk</h3>
                <ul>
                  <li>Larger quantities of blood/fluids</li>
                  <li>Potential pathogen exposure</li>
                  <li>Unattended deaths (short duration)</li>
                  <li>Examples: Serious injuries, medical emergencies</li>
                  <li>PPE: Full suit, respirator, face shield</li>
                </ul>
              </div>

              <div className={styles.riskLevel}>
                <h3>Level 3 - High Risk</h3>
                <ul>
                  <li>Decomposition present</li>
                  <li>Large volume contamination</li>
                  <li>Crime scenes, suicides</li>
                  <li>Hoarding with biological hazards</li>
                  <li>PPE: Full hazmat, SCBA if needed</li>
                </ul>
              </div>

              <div className={styles.riskLevel}>
                <h3>Level 4 - Extreme Risk</h3>
                <ul>
                  <li>Infectious disease outbreak</li>
                  <li>Chemical/biological warfare agents</li>
                  <li>Extreme decomposition</li>
                  <li>Multiple fatalities</li>
                  <li>Requires specialist teams</li>
                </ul>
              </div>
            </div>

            <div className={styles.checklistCard}>
              <h2>🦠 Common Bloodborne Pathogens</h2>
              <div className={styles.pathogenGrid}>
                <div>
                  <h3>HIV</h3>
                  <p>Survives outside body: Minutes to hours</p>
                  <p>Transmission: Blood, sexual fluids</p>
                </div>
                <div>
                  <h3>Hepatitis B</h3>
                  <p>Survives outside body: Up to 7 days</p>
                  <p>Transmission: Blood, bodily fluids</p>
                </div>
                <div>
                  <h3>Hepatitis C</h3>
                  <p>Survives outside body: Up to 3 weeks</p>
                  <p>Transmission: Primarily blood</p>
                </div>
                <div>
                  <h3>MRSA</h3>
                  <p>Survives outside body: Days to months</p>
                  <p>Transmission: Contact with contaminated surfaces</p>
                </div>
              </div>
            </div>

            <div className={styles.regulatoryCard}>
              <h2>📋 Australian Regulatory Requirements</h2>
              <ul>
                <li><strong>WHS Act 2011:</strong> Duty of care for worker safety</li>
                <li><strong>AS/NZS 2243.3:</strong> Microbiological safety and containment</li>
                <li><strong>EPA Guidelines:</strong> Waste disposal and transport</li>
                <li><strong>TGA Requirements:</strong> Disinfectant standards</li>
                <li><strong>State Health Departments:</strong> Notification requirements</li>
                <li><strong>Australian Guidelines for the Prevention and Control of Infection</strong></li>
              </ul>
            </div>

            <button 
              className={styles.continueButton}
              onClick={() => {
                setActiveTab('trauma-cleaning');
                markSectionComplete('biohazard-types');
              }}
            >
              Continue to Trauma Cleaning →
            </button>
          </div>
        )}

        {activeTab === 'trauma-cleaning' && (
          <div className={styles.contentSection}>
            <h1>Trauma Scene Cleaning Protocols</h1>

            <div className={styles.warningCard}>
              <h2>⚠️ Psychological Considerations</h2>
              <p>Trauma cleaning can be emotionally challenging. Always maintain professionalism, show respect for the deceased and affected families, and seek support if needed. Employee assistance programs should be available.</p>
            </div>

            <div className={styles.processFlow}>
              <h2>🔄 Trauma Cleaning Process</h2>
              
              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>1</div>
                <div className={styles.stepContent}>
                  <h3>Scene Assessment & Documentation</h3>
                  <ul>
                    <li>Obtain police/coroner clearance</li>
                    <li>Assess contamination extent</li>
                    <li>Photograph for insurance (with permission)</li>
                    <li>Identify all affected materials</li>
                    <li>Plan containment and work zones</li>
                  </ul>
                </div>
              </div>

              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>2</div>
                <div className={styles.stepContent}>
                  <h3>Setup & Containment</h3>
                  <ul>
                    <li>Establish clean/dirty zones</li>
                    <li>Set up decontamination station</li>
                    <li>Install negative air if needed</li>
                    <li>Lay protective floor coverings</li>
                    <li>Post biohazard warning signs</li>
                  </ul>
                </div>
              </div>

              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>3</div>
                <div className={styles.stepContent}>
                  <h3>Removal of Contaminated Materials</h3>
                  <ul>
                    <li>Remove all visible contamination</li>
                    <li>Cut out affected porous materials</li>
                    <li>Double-bag all biohazard waste</li>
                    <li>Use approved biohazard containers</li>
                    <li>Document items for insurance</li>
                  </ul>
                </div>
              </div>

              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>4</div>
                <div className={styles.stepContent}>
                  <h3>Cleaning & Disinfection</h3>
                  <ul>
                    <li>Apply enzyme cleaner to break down proteins</li>
                    <li>Clean all surfaces thoroughly</li>
                    <li>Apply hospital-grade disinfectant</li>
                    <li>Maintain wet contact time</li>
                    <li>ATP testing for verification</li>
                  </ul>
                </div>
              </div>

              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>5</div>
                <div className={styles.stepContent}>
                  <h3>Deodorisation & Restoration</h3>
                  <ul>
                    <li>Apply odour counteractants</li>
                    <li>Use hydroxyl or ozone if needed</li>
                    <li>Seal remaining odour sources</li>
                    <li>Replace removed materials</li>
                    <li>Final inspection and clearance</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.cleaningProducts}>
              <h2>🧪 Approved Cleaning Agents</h2>
              <div className={styles.productGrid}>
                <div>
                  <h3>Enzyme Cleaners</h3>
                  <ul>
                    <li>Breaks down organic matter</li>
                    <li>Effective on blood and proteins</li>
                    <li>Non-toxic, biodegradable</li>
                    <li>Requires dwell time</li>
                  </ul>
                </div>
                <div>
                  <h3>Quaternary Ammonium</h3>
                  <ul>
                    <li>Broad spectrum disinfectant</li>
                    <li>EPA registered</li>
                    <li>10-minute contact time</li>
                    <li>Safe on most surfaces</li>
                  </ul>
                </div>
                <div>
                  <h3>Sodium Hypochlorite</h3>
                  <ul>
                    <li>1:10 bleach solution</li>
                    <li>Highly effective</li>
                    <li>Can damage surfaces</li>
                    <li>Requires ventilation</li>
                  </ul>
                </div>
                <div>
                  <h3>Hydrogen Peroxide</h3>
                  <ul>
                    <li>Oxidising agent</li>
                    <li>No toxic residue</li>
                    <li>Colour safe</li>
                    <li>Effective virucide</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.wasteDisposal}>
              <h2>🗑️ Biohazard Waste Disposal</h2>
              <ul>
                <li><strong>Red Bags:</strong> Soft waste contaminated with blood/fluids</li>
                <li><strong>Yellow Bins:</strong> Sharps and needles</li>
                <li><strong>Approved Containers:</strong> Rigid, leak-proof, labeled</li>
                <li><strong>Manifest System:</strong> Track from generation to disposal</li>
                <li><strong>Licensed Transporter:</strong> Use approved medical waste company</li>
                <li><strong>Incineration:</strong> Final disposal method for pathological waste</li>
              </ul>
            </div>

            <button 
              className={styles.continueButton}
              onClick={() => {
                setActiveTab('infectious');
                markSectionComplete('trauma-cleaning');
              }}
            >
              Continue to Infectious Disease →
            </button>
          </div>
        )}

        {activeTab === 'infectious' && (
          <div className={styles.contentSection}>
            <h1>Infectious Disease Decontamination</h1>

            <div className={styles.infoCard}>
              <h2>🦠 COVID-19 and Emerging Pathogens</h2>
              <p>The COVID-19 pandemic highlighted the importance of proper infectious disease protocols. These procedures apply to all communicable diseases including influenza, norovirus, tuberculosis, and emerging pathogens.</p>
            </div>

            <div className={styles.diseaseProtocols}>
              <h2>Common Infectious Disease Scenarios</h2>

              <div className={styles.diseaseCard}>
                <h3>COVID-19 / Respiratory Viruses</h3>
                <ul>
                  <li><strong>Transmission:</strong> Airborne droplets and surface contact</li>
                  <li><strong>Survival:</strong> Hours to days on surfaces</li>
                  <li><strong>PPE:</strong> N95/P2 respirator, face shield, gown, gloves</li>
                  <li><strong>Disinfectant:</strong> 70% alcohol or 0.1% bleach</li>
                  <li><strong>Focus Areas:</strong> High-touch surfaces, HVAC systems</li>
                  <li><strong>Dwell Time:</strong> 1-minute minimum</li>
                </ul>
              </div>

              <div className={styles.diseaseCard}>
                <h3>Norovirus (Gastro)</h3>
                <ul>
                  <li><strong>Transmission:</strong> Faecal-oral route, highly contagious</li>
                  <li><strong>Survival:</strong> Weeks on surfaces</li>
                  <li><strong>PPE:</strong> Full protection including shoe covers</li>
                  <li><strong>Disinfectant:</strong> 1000-5000ppm chlorine</li>
                  <li><strong>Focus Areas:</strong> Bathrooms, kitchens, carpets</li>
                  <li><strong>Special Note:</strong> Alcohol ineffective</li>
                </ul>
              </div>

              <div className={styles.diseaseCard}>
                <h3>Tuberculosis (TB)</h3>
                <ul>
                  <li><strong>Transmission:</strong> Airborne, long-range</li>
                  <li><strong>PPE:</strong> N95/P2 minimum, consider PAPR</li>
                  <li><strong>Ventilation:</strong> Critical - negative pressure</li>
                  <li><strong>Disinfectant:</strong> Phenolic or tuberculocidal</li>
                  <li><strong>UV-C Light:</strong> Effective for air disinfection</li>
                  <li><strong>Notification:</strong> Report to health department</li>
                </ul>
              </div>

              <div className={styles.diseaseCard}>
                <h3>C. difficile (Healthcare)</h3>
                <ul>
                  <li><strong>Transmission:</strong> Spore-forming bacteria</li>
                  <li><strong>Resistance:</strong> Survives standard cleaning</li>
                  <li><strong>PPE:</strong> Contact precautions plus</li>
                  <li><strong>Disinfectant:</strong> Sporicidal agent required</li>
                  <li><strong>Process:</strong> Clean first, then disinfect</li>
                  <li><strong>Verification:</strong> UV marking or ATP testing</li>
                </ul>
              </div>
            </div>

            <div className={styles.decontaminationProcess}>
              <h2>🔄 Electrostatic Spraying Technology</h2>
              <div className={styles.techInfo}>
                <p>Electrostatic sprayers charge disinfectant particles, causing them to wrap around surfaces for complete coverage.</p>
                <ul>
                  <li>360-degree coverage of objects</li>
                  <li>Reduces chemical use by 65%</li>
                  <li>Faster application than manual methods</li>
                  <li>Ideal for large areas and complex surfaces</li>
                  <li>No wiping required for most applications</li>
                </ul>
              </div>
            </div>

            <div className={styles.checklistCard}>
              <h2>✅ Decontamination Checklist</h2>
              <div className={styles.checklistGrid}>
                <label>
                  <input type="checkbox" />
                  Review pathogen-specific protocols
                </label>
                <label>
                  <input type="checkbox" />
                  Don appropriate PPE
                </label>
                <label>
                  <input type="checkbox" />
                  Pre-clean visible soil
                </label>
                <label>
                  <input type="checkbox" />
                  Apply disinfectant per label
                </label>
                <label>
                  <input type="checkbox" />
                  Maintain wet contact time
                </label>
                <label>
                  <input type="checkbox" />
                  Clean high-touch surfaces twice
                </label>
                <label>
                  <input type="checkbox" />
                  Disinfect cleaning equipment
                </label>
                <label>
                  <input type="checkbox" />
                  Proper waste disposal
                </label>
                <label>
                  <input type="checkbox" />
                  Document all procedures
                </label>
                <label>
                  <input type="checkbox" />
                  Provide clearance certificate
                </label>
              </div>
            </div>

            <button 
              className={styles.continueButton}
              onClick={() => {
                setActiveTab('procedures');
                markSectionComplete('infectious');
              }}
            >
              Continue to Safety Procedures →
            </button>
          </div>
        )}

        {activeTab === 'procedures' && (
          <div className={styles.contentSection}>
            <h1>Safety Procedures & PPE</h1>

            <div className={styles.warningCard}>
              <h2>⚠️ PPE is Your Last Line of Defense</h2>
              <p>Engineering controls (containment) and administrative controls (procedures) should be implemented first. PPE protects you when other controls cannot eliminate the hazard.</p>
            </div>

            <div className={styles.ppeSelection}>
              <h2>🦺 Personal Protective Equipment Selection</h2>
              
              <div className={styles.ppeGrid}>
                <div className={styles.ppeItem}>
                  <h3>Respiratory Protection</h3>
                  <ul>
                    <li><strong>N95/P2:</strong> Minimum for biohazards</li>
                    <li><strong>P3:</strong> High-risk situations</li>
                    <li><strong>Full Face:</strong> Eye protection included</li>
                    <li><strong>PAPR:</strong> Powered air for extended use</li>
                    <li><strong>Fit Testing:</strong> Annual requirement</li>
                  </ul>
                </div>

                <div className={styles.ppeItem}>
                  <h3>Body Protection</h3>
                  <ul>
                    <li><strong>Tyvek Suits:</strong> Disposable, fluid resistant</li>
                    <li><strong>Chemical Suits:</strong> For harsh disinfectants</li>
                    <li><strong>Coveralls:</strong> Reusable option</li>
                    <li><strong>Aprons:</strong> Additional fluid protection</li>
                    <li><strong>Boot Covers:</strong> Prevent tracking</li>
                  </ul>
                </div>

                <div className={styles.ppeItem}>
                  <h3>Hand Protection</h3>
                  <ul>
                    <li><strong>Nitrile:</strong> Chemical resistant</li>
                    <li><strong>Double Gloving:</strong> High-risk situations</li>
                    <li><strong>Extended Cuff:</strong> Forearm protection</li>
                    <li><strong>Cut Resistant:</strong> Sharp hazards</li>
                    <li><strong>Change Frequency:</strong> Every 2 hours</li>
                  </ul>
                </div>

                <div className={styles.ppeItem}>
                  <h3>Eye/Face Protection</h3>
                  <ul>
                    <li><strong>Safety Glasses:</strong> Minimum protection</li>
                    <li><strong>Goggles:</strong> Full seal around eyes</li>
                    <li><strong>Face Shield:</strong> Splash protection</li>
                    <li><strong>Full Face Respirator:</strong> Combined protection</li>
                    <li><strong>Anti-fog:</strong> Essential feature</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.donningDoffing}>
              <h2>👔 Donning and Doffing Procedures</h2>
              
              <div className={styles.procedureColumns}>
                <div>
                  <h3>Donning Sequence (Putting On)</h3>
                  <ol>
                    <li>Perform hand hygiene</li>
                    <li>Put on boot covers</li>
                    <li>Put on inner gloves</li>
                    <li>Put on coveralls/suit</li>
                    <li>Put on respirator and perform seal check</li>
                    <li>Put on face shield/goggles</li>
                    <li>Put on outer gloves over cuffs</li>
                    <li>Final inspection by partner</li>
                  </ol>
                </div>
                
                <div>
                  <h3>Doffing Sequence (Taking Off)</h3>
                  <ol>
                    <li>Disinfect outer gloves</li>
                    <li>Remove outer gloves</li>
                    <li>Remove face shield/goggles</li>
                    <li>Remove coveralls (roll down)</li>
                    <li>Remove boot covers</li>
                    <li>Remove inner gloves</li>
                    <li>Perform hand hygiene</li>
                    <li>Remove respirator (last)</li>
                    <li>Final hand hygiene</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className={styles.exposureProtocol}>
              <h2>🚨 Exposure Incident Protocol</h2>
              <div className={styles.emergencySteps}>
                <div className={styles.urgentAction}>
                  <h3>IMMEDIATE ACTION (First 5 Minutes)</h3>
                  <ul>
                    <li>Needle stick/cut: Squeeze wound, flush with water</li>
                    <li>Splash to eyes: Irrigate for 15 minutes</li>
                    <li>Splash to mouth: Spit out, rinse repeatedly</li>
                    <li>Skin contact: Wash with soap and water</li>
                  </ul>
                </div>
                
                <div className={styles.followUp}>
                  <h3>Follow-Up Actions</h3>
                  <ul>
                    <li>Report to supervisor immediately</li>
                    <li>Seek medical evaluation within 2 hours</li>
                    <li>Document incident thoroughly</li>
                    <li>Begin post-exposure prophylaxis if indicated</li>
                    <li>Follow-up testing as prescribed</li>
                    <li>Workers compensation claim if needed</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.immunisation}>
              <h2>💉 Recommended Immunisations</h2>
              <ul>
                <li><strong>Hepatitis B:</strong> Required, verify immunity</li>
                <li><strong>Tetanus:</strong> Every 10 years</li>
                <li><strong>Hepatitis A:</strong> Recommended</li>
                <li><strong>Influenza:</strong> Annual</li>
                <li><strong>COVID-19:</strong> Up to date with boosters</li>
                <li><strong>TB Testing:</strong> Baseline and annual</li>
              </ul>
            </div>

            <button 
              className={styles.continueButton}
              onClick={() => {
                setActiveTab('scenarios');
                markSectionComplete('procedures');
              }}
            >
              Continue to Practical Scenarios →
            </button>
          </div>
        )}

        {activeTab === 'scenarios' && (
          <div className={styles.contentSection}>
            <h1>Practical Biohazard Scenarios</h1>

            <div className={styles.scenarioCard}>
              <h2>🏠 Scenario 1: Unattended Death - Residential</h2>
              <div className={styles.scenarioDetails}>
                <p><strong>Situation:</strong> Elderly resident discovered after 5 days. Summer conditions, decomposition present. Family requesting urgent cleaning for property sale.</p>
                
                <h3>Assessment:</h3>
                <ul>
                  <li>Level 3 biohazard - advanced decomposition</li>
                  <li>Bodily fluids penetrated flooring</li>
                  <li>Insect activity present</li>
                  <li>Strong odour throughout property</li>
                  <li>HVAC system contaminated</li>
                </ul>

                <h3>Your Response:</h3>
                <div className={styles.responseSteps}>
                  <p>1. <strong>Authorisation:</strong> Obtain coroner and family clearance</p>
                  <p>2. <strong>PPE:</strong> Full biohazard suit, P3 respirator</p>
                  <p>3. <strong>Containment:</strong> Seal affected room, negative air</p>
                  <p>4. <strong>Removal:</strong> All contaminated materials including subfloor</p>
                  <p>5. <strong>Cleaning:</strong> Enzyme treatment, multiple disinfection rounds</p>
                  <p>6. <strong>Deodorisation:</strong> Hydroxyl generators for 72 hours minimum</p>
                  <p>7. <strong>Restoration:</strong> Replace flooring, repaint, HVAC cleaning</p>
                  <p>8. <strong>Verification:</strong> ATP testing before clearance</p>
                </div>
              </div>
            </div>

            <div className={styles.scenarioCard}>
              <h2>🏥 Scenario 2: Healthcare Facility - C. diff Outbreak</h2>
              <div className={styles.scenarioDetails}>
                <p><strong>Situation:</strong> Aged care facility with confirmed C. difficile outbreak. 3 rooms affected, 2 residents hospitalised. Facility remains operational.</p>
                
                <h3>Assessment:</h3>
                <ul>
                  <li>Spore-forming bacteria requiring special protocols</li>
                  <li>Standard disinfectants ineffective</li>
                  <li>High risk to vulnerable population</li>
                  <li>Need to maintain facility operations</li>
                </ul>

                <h3>Your Response:</h3>
                <div className={styles.responseSteps}>
                  <p>1. <strong>Coordination:</strong> Work with facility infection control</p>
                  <p>2. <strong>Isolation:</strong> Maintain contact precautions</p>
                  <p>3. <strong>Cleaning:</strong> Physical removal of soil first</p>
                  <p>4. <strong>Disinfection:</strong> Sporicidal agent, 10-minute contact</p>
                  <p>5. <strong>Focus:</strong> High-touch surfaces, bathroom fixtures</p>
                  <p>6. <strong>Verification:</strong> UV marking system or ATP testing</p>
                  <p>7. <strong>Prevention:</strong> Staff training on ongoing protocols</p>
                </div>
              </div>
            </div>

            <div className={styles.scenarioCard}>
              <h2>🚔 Scenario 3: Crime Scene - Commercial Property</h2>
              <div className={styles.scenarioDetails}>
                <p><strong>Situation:</strong> Violent crime in retail store. Police have released scene. Blood throughout customer area, behind counter. Business wants to reopen ASAP.</p>
                
                <h3>Assessment:</h3>
                <ul>
                  <li>Large volume blood contamination</li>
                  <li>Multiple surface types affected</li>
                  <li>Public area requiring complete sanitisation</li>
                  <li>Potential media attention</li>
                </ul>

                <h3>Your Response:</h3>
                <div className={styles.responseSteps}>
                  <p>1. <strong>Discretion:</strong> Unmarked vehicles, after hours work</p>
                  <p>2. <strong>Documentation:</strong> Detailed photos for insurance</p>
                  <p>3. <strong>Removal:</strong> Affected inventory, display materials</p>
                  <p>4. <strong>Cleaning:</strong> Enzyme cleaner, then disinfectant</p>
                  <p>5. <strong>Hard Surfaces:</strong> Can be restored with proper cleaning</p>
                  <p>6. <strong>Soft Materials:</strong> Usually require disposal</p>
                  <p>7. <strong>Certification:</strong> Provide clearance for reopening</p>
                  <p>8. <strong>Support:</strong> Offer trauma counselling resources</p>
                </div>
              </div>
            </div>

            <div className={styles.scenarioCard}>
              <h2>🏭 Scenario 4: Industrial - Sewage Backup</h2>
              <div className={styles.scenarioDetails}>
                <p><strong>Situation:</strong> Major sewage backup in food processing facility. Raw sewage throughout production area. Health department involved.</p>
                
                <h3>Assessment:</h3>
                <ul>
                  <li>Category 3 water - grossly contaminated</li>
                  <li>Food safety critical environment</li>
                  <li>Multiple pathogen risk</li>
                  <li>Regulatory compliance required</li>
                </ul>

                <h3>Your Response:</h3>
                <div className={styles.responseSteps}>
                  <p>1. <strong>Stop Work:</strong> Cease all food production</p>
                  <p>2. <strong>Extract:</strong> Remove all standing sewage</p>
                  <p>3. <strong>Dispose:</strong> All exposed food products</p>
                  <p>4. <strong>Clean:</strong> High-pressure wash all surfaces</p>
                  <p>5. <strong>Disinfect:</strong> Food-grade sanitisers only</p>
                  <p>6. <strong>Testing:</strong> Environmental swabs for pathogens</p>
                  <p>7. <strong>Clearance:</strong> Health department approval</p>
                  <p>8. <strong>Prevention:</strong> Backflow prevention review</p>
                </div>
              </div>
            </div>

            <button 
              className={styles.continueButton}
              onClick={() => {
                setActiveTab('assessment');
                markSectionComplete('scenarios');
              }}
            >
              Continue to Assessment →
            </button>
          </div>
        )}

        {activeTab === 'assessment' && (
          <div className={styles.contentSection}>
            <h1>Day 10 Assessment</h1>

            <div className={styles.assessmentIntro}>
              <h2>📝 Knowledge Check</h2>
              <p>Test your understanding of biohazard and trauma cleaning protocols.</p>
            </div>

            <div className={styles.quiz}>
              <div className={styles.questionCard}>
                <h3>Question 1: PPE Removal</h3>
                <p>What is the LAST item to remove when doffing PPE?</p>
                <div className={styles.options}>
                  <label>
                    <input 
                      type="radio" 
                      name="q1" 
                      onChange={() => handleQuizAnswer('q1', 'a')}
                    />
                    Gloves
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q1" 
                      onChange={() => handleQuizAnswer('q1', 'b')}
                    />
                    Coveralls
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q1" 
                      onChange={() => handleQuizAnswer('q1', 'c')}
                    />
                    Respirator
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q1" 
                      onChange={() => handleQuizAnswer('q1', 'd')}
                    />
                    Boot covers
                  </label>
                </div>
              </div>

              <div className={styles.questionCard}>
                <h3>Question 2: Bloodborne Pathogens</h3>
                <p>Which bloodborne pathogen can survive the longest outside the body?</p>
                <div className={styles.options}>
                  <label>
                    <input 
                      type="radio" 
                      name="q2" 
                      onChange={() => handleQuizAnswer('q2', 'a')}
                    />
                    HIV
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q2" 
                      onChange={() => handleQuizAnswer('q2', 'b')}
                    />
                    Hepatitis B
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q2" 
                      onChange={() => handleQuizAnswer('q2', 'c')}
                    />
                    Hepatitis C
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q2" 
                      onChange={() => handleQuizAnswer('q2', 'd')}
                    />
                    MRSA
                  </label>
                </div>
              </div>

              <div className={styles.questionCard}>
                <h3>Question 3: Disinfection</h3>
                <p>What type of disinfectant is required for C. difficile?</p>
                <div className={styles.options}>
                  <label>
                    <input 
                      type="radio" 
                      name="q3" 
                      onChange={() => handleQuizAnswer('q3', 'a')}
                    />
                    Alcohol-based
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q3" 
                      onChange={() => handleQuizAnswer('q3', 'b')}
                    />
                    Quaternary ammonium
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q3" 
                      onChange={() => handleQuizAnswer('q3', 'c')}
                    />
                    Sporicidal agent
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q3" 
                      onChange={() => handleQuizAnswer('q3', 'd')}
                    />
                    Soap and water
                  </label>
                </div>
              </div>

              <div className={styles.questionCard}>
                <h3>Question 4: Exposure Protocol</h3>
                <p>After a needle stick injury, what is the maximum time to seek medical evaluation?</p>
                <div className={styles.options}>
                  <label>
                    <input 
                      type="radio" 
                      name="q4" 
                      onChange={() => handleQuizAnswer('q4', 'a')}
                    />
                    30 minutes
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q4" 
                      onChange={() => handleQuizAnswer('q4', 'b')}
                    />
                    2 hours
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q4" 
                      onChange={() => handleQuizAnswer('q4', 'c')}
                    />
                    24 hours
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q4" 
                      onChange={() => handleQuizAnswer('q4', 'd')}
                    />
                    72 hours
                  </label>
                </div>
              </div>
            </div>

            <div className={styles.keyTakeaways}>
              <h2>🎯 Key Takeaways</h2>
              <ul>
                <li>Biohazard cleaning requires specialised training and strict protocols</li>
                <li>Always obtain proper clearance before beginning trauma scene cleaning</li>
                <li>PPE is your last line of defense - use engineering controls first</li>
                <li>Respirator is the last item removed to maintain protection</li>
                <li>Different pathogens require different disinfection strategies</li>
                <li>C. difficile spores require sporicidal agents - alcohol is ineffective</li>
                <li>Immediate action after exposure can prevent infection</li>
                <li>Documentation is critical for compliance and insurance</li>
                <li>Psychological support is important for trauma cleaning work</li>
              </ul>
            </div>

            <div className={styles.completionCard}>
              <h2>🏆 Module Complete!</h2>
              <p>Congratulations on completing Day 10: Biohazard & Trauma Cleaning.</p>
              <div className={styles.completionActions}>
                <button 
                  className={styles.certificateButton}
                  onClick={() => markSectionComplete('assessment')}
                >
                  Mark Complete
                </button>
                <Link 
                  href="/portal/training/modules/day-11"
                  className={styles.nextModuleButton}
                >
                  Continue to Day 11 →
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}