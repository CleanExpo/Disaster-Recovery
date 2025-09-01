'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../training.module.css';

export default function Day9Module() {
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
          <h2>Day 9: Fire & Smoke</h2>
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
            className={`${styles.navItem} ${activeTab === 'fire-types' ? styles.active : ''}`}
            onClick={() => setActiveTab('fire-types')}
          >
            Fire Classifications
          </button>
          <button 
            className={`${styles.navItem} ${activeTab === 'smoke-damage' ? styles.active : ''}`}
            onClick={() => setActiveTab('smoke-damage')}
          >
            Smoke Damage Types
          </button>
          <button 
            className={`${styles.navItem} ${activeTab === 'restoration' ? styles.active : ''}`}
            onClick={() => setActiveTab('restoration')}
          >
            Restoration Process
          </button>
          <button 
            className={`${styles.navItem} ${activeTab === 'odour' ? styles.active : ''}`}
            onClick={() => setActiveTab('odour')}
          >
            Odour Elimination
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
            <h1>Day 9: Fire & Smoke Damage Restoration</h1>
            
            <div className={styles.learningObjectives}>
              <h2>Learning Objectives</h2>
              <ul>
                <li>Understand different fire classifications and damage patterns</li>
                <li>Identify smoke residue types and cleaning methods</li>
                <li>Master soot removal and surface cleaning techniques</li>
                <li>Learn odour control and elimination strategies</li>
                <li>Apply IICRC S-740 standards for fire restoration</li>
                <li>Understand contents processing and pack-out procedures</li>
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
                  <p>Case studies</p>
                </div>
              </div>
            </div>

            <button 
              className={styles.startButton}
              onClick={() => {
                setActiveTab('fire-types');
                markSectionComplete('overview');
              }}
            >
              Start Learning →
            </button>
          </div>
        )}

        {activeTab === 'fire-types' && (
          <div className={styles.contentSection}>
            <h1>Fire Classifications & Damage Types</h1>

            <div className={styles.infoCard}>
              <h2>🔥 Fire Classifications</h2>
              <div className={styles.gridTwo}>
                <div>
                  <h3>Class A - Ordinary Combustibles</h3>
                  <ul>
                    <li>Wood, paper, fabric, plastics</li>
                    <li>Most common residential fires</li>
                    <li>Water-based suppression</li>
                    <li>Char and ash residue</li>
                  </ul>
                </div>
                <div>
                  <h3>Class B - Flammable Liquids</h3>
                  <ul>
                    <li>Petrol, oil, paint, solvents</li>
                    <li>Kitchen grease fires</li>
                    <li>Foam or CO2 suppression</li>
                    <li>Heavy soot and odour</li>
                  </ul>
                </div>
                <div>
                  <h3>Class C - Electrical Fires</h3>
                  <ul>
                    <li>Electrical equipment and wiring</li>
                    <li>Appliance malfunctions</li>
                    <li>CO2 or dry chemical suppression</li>
                    <li>Melted plastics and metals</li>
                  </ul>
                </div>
                <div>
                  <h3>Class D & K - Special Hazards</h3>
                  <ul>
                    <li>D: Combustible metals</li>
                    <li>K: Commercial cooking oils</li>
                    <li>Specialised suppression agents</li>
                    <li>Unique restoration challenges</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.warningCard}>
              <h2>⚠️ Damage Characteristics by Temperature</h2>
              <div className={styles.temperatureScale}>
                <div className={styles.tempRange}>
                  <h3>100-200°C</h3>
                  <p>Light smoke damage, surface soot</p>
                </div>
                <div className={styles.tempRange}>
                  <h3>200-400°C</h3>
                  <p>Heavy soot, paint damage, plastic melting</p>
                </div>
                <div className={styles.tempRange}>
                  <h3>400-600°C</h3>
                  <p>Charring, glass cracking, metal warping</p>
                </div>
                <div className={styles.tempRange}>
                  <h3>600°C+</h3>
                  <p>Structural damage, complete combustion</p>
                </div>
              </div>
            </div>

            <div className={styles.practicalExercise}>
              <h2>🔍 Damage Assessment Factors</h2>
              <ul>
                <li><strong>Heat Damage:</strong> Warping, melting, charring, structural weakening</li>
                <li><strong>Smoke Migration:</strong> HVAC distribution, pressure differentials, temperature gradients</li>
                <li><strong>Water Damage:</strong> Fire suppression water, firefighting efforts</li>
                <li><strong>Chemical Residue:</strong> Fire suppressants, combustion byproducts</li>
                <li><strong>Time Factor:</strong> Corrosion and etching increase over time</li>
              </ul>
            </div>

            <button 
              className={styles.continueButton}
              onClick={() => {
                setActiveTab('smoke-damage');
                markSectionComplete('fire-types');
              }}
            >
              Continue to Smoke Damage →
            </button>
          </div>
        )}

        {activeTab === 'smoke-damage' && (
          <div className={styles.contentSection}>
            <h1>Smoke Damage Types & Residues</h1>

            <div className={styles.infoCard}>
              <h2>💨 Types of Smoke Residue</h2>
              
              <div className={styles.smokeType}>
                <h3>Wet Smoke (Low Heat, Smoldering)</h3>
                <ul>
                  <li>Temperature: Below 200°C</li>
                  <li>Characteristics: Sticky, smeary, strong odour</li>
                  <li>Sources: Plastics, rubber, synthetic materials</li>
                  <li>Cleaning: Requires aggressive cleaning agents</li>
                  <li>PPE: Full respiratory protection required</li>
                </ul>
              </div>

              <div className={styles.smokeType}>
                <h3>Dry Smoke (High Heat, Fast Burning)</h3>
                <ul>
                  <li>Temperature: Above 400°C</li>
                  <li>Characteristics: Dry, powdery, easier to clean</li>
                  <li>Sources: Paper, wood, natural materials</li>
                  <li>Cleaning: Dry cleaning methods effective</li>
                  <li>Distribution: Travels far, gets into cracks</li>
                </ul>
              </div>

              <div className={styles.smokeType}>
                <h3>Protein Smoke (Organic Materials)</h3>
                <ul>
                  <li>Sources: Kitchen fires, burnt food</li>
                  <li>Characteristics: Nearly invisible, strong odour</li>
                  <li>Residue: Yellowish, greasy film</li>
                  <li>Cleaning: Requires degreasing agents</li>
                  <li>Challenge: Discolours paints and varnishes</li>
                </ul>
              </div>

              <div className={styles.smokeType}>
                <h3>Fuel Oil Soot (Furnace Puff-Back)</h3>
                <ul>
                  <li>Sources: Heating system malfunctions</li>
                  <li>Characteristics: Oily, difficult to clean</li>
                  <li>Distribution: Spreads through HVAC system</li>
                  <li>Cleaning: Requires specialised degreasers</li>
                  <li>Surfaces: Can permanently stain fabrics</li>
                </ul>
              </div>
            </div>

            <div className={styles.checklistCard}>
              <h2>🧪 Smoke Behaviour Principles</h2>
              <div className={styles.principlesList}>
                <div>
                  <h3>1. Temperature Gradient</h3>
                  <p>Hot smoke rises, deposits on cooler surfaces</p>
                </div>
                <div>
                  <h3>2. Pressure Differentials</h3>
                  <p>Moves from high to low pressure areas</p>
                </div>
                <div>
                  <h3>3. Ionisation Attraction</h3>
                  <p>Charged particles attract to surfaces</p>
                </div>
                <div>
                  <h3>4. Surface Porosity</h3>
                  <p>Porous materials absorb more residue</p>
                </div>
              </div>
            </div>

            <button 
              className={styles.continueButton}
              onClick={() => {
                setActiveTab('restoration');
                markSectionComplete('smoke-damage');
              }}
            >
              Continue to Restoration Process →
            </button>
          </div>
        )}

        {activeTab === 'restoration' && (
          <div className={styles.contentSection}>
            <h1>Fire Damage Restoration Process</h1>

            <div className={styles.processFlow}>
              <h2>🔄 Restoration Workflow</h2>
              
              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>1</div>
                <div className={styles.stepContent}>
                  <h3>Emergency Response & Stabilisation</h3>
                  <ul>
                    <li>Secure property and ensure safety</li>
                    <li>Board-up and tarp damaged areas</li>
                    <li>Shut off utilities if necessary</li>
                    <li>Document damage for insurance</li>
                    <li>Extract standing water</li>
                  </ul>
                </div>
              </div>

              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>2</div>
                <div className={styles.stepContent}>
                  <h3>Assessment & Planning</h3>
                  <ul>
                    <li>Test for asbestos and lead paint</li>
                    <li>Identify salvageable materials</li>
                    <li>Create restoration scope</li>
                    <li>Develop cleaning protocols</li>
                    <li>Establish containment zones</li>
                  </ul>
                </div>
              </div>

              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>3</div>
                <div className={styles.stepContent}>
                  <h3>Contents Pack-Out</h3>
                  <ul>
                    <li>Inventory all items with photos</li>
                    <li>Categorise: Clean, restore, or dispose</li>
                    <li>Pack salvageable items carefully</li>
                    <li>Transport to cleaning facility</li>
                    <li>Store in climate-controlled environment</li>
                  </ul>
                </div>
              </div>

              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>4</div>
                <div className={styles.stepContent}>
                  <h3>Structural Cleaning</h3>
                  <ul>
                    <li>HEPA vacuum all surfaces</li>
                    <li>Clean from top to bottom</li>
                    <li>Use appropriate cleaning agents</li>
                    <li>Clean HVAC system thoroughly</li>
                    <li>Seal porous surfaces if needed</li>
                  </ul>
                </div>
              </div>

              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>5</div>
                <div className={styles.stepContent}>
                  <h3>Deodorisation</h3>
                  <ul>
                    <li>Remove odour source</li>
                    <li>Clean all affected surfaces</li>
                    <li>Apply counteractants</li>
                    <li>Use thermal fogging or ozone</li>
                    <li>Seal if necessary</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.warningCard}>
              <h2>⚠️ Australian Standards Compliance</h2>
              <ul>
                <li><strong>AS/NZS 4360:</strong> Risk Management</li>
                <li><strong>AS 1851:</strong> Fire Protection Systems</li>
                <li><strong>IICRC S-740:</strong> Professional Restoration Standards</li>
                <li><strong>WHS Regulations:</strong> Asbestos and hazardous materials</li>
                <li><strong>EPA Guidelines:</strong> Waste disposal and air quality</li>
              </ul>
            </div>

            <div className={styles.cleaningMethods}>
              <h2>🧹 Surface Cleaning Techniques</h2>
              <div className={styles.gridTwo}>
                <div>
                  <h3>Dry Cleaning</h3>
                  <ul>
                    <li>Chemical sponges</li>
                    <li>HEPA vacuuming</li>
                    <li>Dry ice blasting</li>
                    <li>Compressed air</li>
                  </ul>
                </div>
                <div>
                  <h3>Wet Cleaning</h3>
                  <ul>
                    <li>Detergent solutions</li>
                    <li>Ultrasonic cleaning</li>
                    <li>Pressure washing</li>
                    <li>Steam cleaning</li>
                  </ul>
                </div>
                <div>
                  <h3>Abrasive Cleaning</h3>
                  <ul>
                    <li>Soda blasting</li>
                    <li>Media blasting</li>
                    <li>Sanding</li>
                    <li>Wire brushing</li>
                  </ul>
                </div>
                <div>
                  <h3>Immersion Cleaning</h3>
                  <ul>
                    <li>Ultrasonic baths</li>
                    <li>Chemical dipping</li>
                    <li>Contents restoration</li>
                    <li>Electronics cleaning</li>
                  </ul>
                </div>
              </div>
            </div>

            <button 
              className={styles.continueButton}
              onClick={() => {
                setActiveTab('odour');
                markSectionComplete('restoration');
              }}
            >
              Continue to Odour Elimination →
            </button>
          </div>
        )}

        {activeTab === 'odour' && (
          <div className={styles.contentSection}>
            <h1>Odour Control & Elimination</h1>

            <div className={styles.infoCard}>
              <h2>👃 Understanding Smoke Odours</h2>
              <p>Smoke odours are caused by microscopic particles that penetrate porous materials and continue to off-gas over time. Successful deodorisation requires removing the source, cleaning surfaces, and treating the air.</p>
            </div>

            <div className={styles.odourMethods}>
              <h2>🌬️ Deodorisation Techniques</h2>

              <div className={styles.methodCard}>
                <h3>Thermal Fogging</h3>
                <ul>
                  <li><strong>Process:</strong> Heated deodorant creates penetrating fog</li>
                  <li><strong>Coverage:</strong> Reaches same areas as smoke</li>
                  <li><strong>Best For:</strong> Severe smoke odours, large areas</li>
                  <li><strong>Limitations:</strong> Requires evacuation, leaves residue</li>
                  <li><strong>Safety:</strong> Full PPE, seal HVAC, no open flames</li>
                </ul>
              </div>

              <div className={styles.methodCard}>
                <h3>Ozone Treatment</h3>
                <ul>
                  <li><strong>Process:</strong> O3 oxidises odour molecules</li>
                  <li><strong>Duration:</strong> 24-72 hours typical</li>
                  <li><strong>Best For:</strong> Persistent odours, sealed spaces</li>
                  <li><strong>Limitations:</strong> Can damage rubber, plants</li>
                  <li><strong>Safety:</strong> No occupancy during treatment</li>
                </ul>
              </div>

              <div className={styles.methodCard}>
                <h3>Hydroxyl Generators</h3>
                <ul>
                  <li><strong>Process:</strong> UV light creates hydroxyl radicals</li>
                  <li><strong>Advantage:</strong> Safe for occupied spaces</li>
                  <li><strong>Best For:</strong> Ongoing treatment, sensitive areas</li>
                  <li><strong>Duration:</strong> 3-7 days continuous</li>
                  <li><strong>Coverage:</strong> 150-500 m² per unit</li>
                </ul>
              </div>

              <div className={styles.methodCard}>
                <h3>Vapour Modification</h3>
                <ul>
                  <li><strong>Process:</strong> Counteractants modify odour perception</li>
                  <li><strong>Types:</strong> Pairing agents, masking agents</li>
                  <li><strong>Application:</strong> ULV foggers, direct spray</li>
                  <li><strong>Best For:</strong> Quick results, occupied spaces</li>
                  <li><strong>Duration:</strong> Temporary to permanent</li>
                </ul>
              </div>
            </div>

            <div className={styles.checklistCard}>
              <h2>✅ Deodorisation Checklist</h2>
              <div className={styles.checklistGrid}>
                <label>
                  <input type="checkbox" />
                  Remove all debris and damaged materials
                </label>
                <label>
                  <input type="checkbox" />
                  Clean all surfaces thoroughly
                </label>
                <label>
                  <input type="checkbox" />
                  Clean HVAC system and replace filters
                </label>
                <label>
                  <input type="checkbox" />
                  Treat concealed spaces (walls, ceilings)
                </label>
                <label>
                  <input type="checkbox" />
                  Apply appropriate deodorisation method
                </label>
                <label>
                  <input type="checkbox" />
                  Seal persistent odour sources
                </label>
                <label>
                  <input type="checkbox" />
                  Monitor and re-treat if necessary
                </label>
                <label>
                  <input type="checkbox" />
                  Perform final odour evaluation
                </label>
              </div>
            </div>

            <div className={styles.warningCard}>
              <h2>⚠️ Common Deodorisation Mistakes</h2>
              <ul>
                <li>Attempting to mask odours without removing source</li>
                <li>Under-treating - not reaching all affected areas</li>
                <li>Over-treating - causing secondary odours or damage</li>
                <li>Wrong method for odour type or material</li>
                <li>Insufficient cleaning before deodorisation</li>
                <li>Not addressing HVAC system contamination</li>
              </ul>
            </div>

            <button 
              className={styles.continueButton}
              onClick={() => {
                setActiveTab('scenarios');
                markSectionComplete('odour');
              }}
            >
              Continue to Practical Scenarios →
            </button>
          </div>
        )}

        {activeTab === 'scenarios' && (
          <div className={styles.contentSection}>
            <h1>Practical Fire Damage Scenarios</h1>

            <div className={styles.scenarioCard}>
              <h2>🏠 Scenario 1: Kitchen Fire - Protein Smoke</h2>
              <div className={styles.scenarioDetails}>
                <p><strong>Situation:</strong> Cooking oil fire in residential kitchen. Fire suppressed quickly but smoke spread throughout 2-storey home via open plan design and return air vents.</p>
                
                <h3>Damage Assessment:</h3>
                <ul>
                  <li>Kitchen: Heavy grease residue, charred cabinets</li>
                  <li>Living areas: Light yellow film on all surfaces</li>
                  <li>Bedrooms: Odour penetration in soft furnishings</li>
                  <li>HVAC: Contaminated throughout system</li>
                </ul>

                <h3>Your Response:</h3>
                <div className={styles.responseSteps}>
                  <p>1. <strong>Immediate:</strong> Shut down HVAC, establish containment</p>
                  <p>2. <strong>Cleaning:</strong> Degrease all surfaces, starting with kitchen</p>
                  <p>3. <strong>HVAC:</strong> Full duct cleaning and sanitisation</p>
                  <p>4. <strong>Soft contents:</strong> Pack-out for specialised cleaning</p>
                  <p>5. <strong>Deodorisation:</strong> Thermal fog with pairing agent</p>
                  <p>6. <strong>Painting:</strong> Prime with stain blocker, repaint affected areas</p>
                </div>
              </div>
            </div>

            <div className={styles.scenarioCard}>
              <h2>🏢 Scenario 2: Office Building - Electrical Fire</h2>
              <div className={styles.scenarioDetails}>
                <p><strong>Situation:</strong> Server room fire on 3rd floor of 10-storey building. Sprinklers activated. Smoke spread to floors 3-5 via stairwell.</p>
                
                <h3>Damage Assessment:</h3>
                <ul>
                  <li>Server room: Total loss, water and fire damage</li>
                  <li>Floor 3: Heavy soot, water damage, electronics affected</li>
                  <li>Floors 4-5: Light smoke residue, odour issues</li>
                  <li>Business interruption: Critical data systems offline</li>
                </ul>

                <h3>Your Response:</h3>
                <div className={styles.responseSteps}>
                  <p>1. <strong>Priority:</strong> Coordinate with IT for data recovery</p>
                  <p>2. <strong>Water:</strong> Extract immediately, deploy drying equipment</p>
                  <p>3. <strong>Electronics:</strong> Specialist cleaning for salvageable equipment</p>
                  <p>4. <strong>Cleaning:</strong> HEPA vacuum, then appropriate cleaning method</p>
                  <p>5. <strong>Air quality:</strong> Deploy air scrubbers, hydroxyl generators</p>
                  <p>6. <strong>Documentation:</strong> Detailed inventory for insurance claim</p>
                </div>
              </div>
            </div>

            <div className={styles.scenarioCard}>
              <h2>🚗 Scenario 3: Garage Fire - Mixed Smoke Types</h2>
              <div className={styles.scenarioDetails}>
                <p><strong>Situation:</strong> Vehicle fire in attached garage. Fire spread to storage area containing paint, chemicals, and household items. House filled with toxic smoke.</p>
                
                <h3>Damage Assessment:</h3>
                <ul>
                  <li>Garage: Structural damage, hazardous residues</li>
                  <li>House: Complex smoke mixture, potential toxic contamination</li>
                  <li>Contents: Wide range of materials affected</li>
                  <li>Health concerns: Chemical exposure risks</li>
                </ul>

                <h3>Your Response:</h3>
                <div className={styles.responseSteps}>
                  <p>1. <strong>Safety:</strong> Test for hazardous chemicals, asbestos</p>
                  <p>2. <strong>PPE:</strong> Full protection including respirators</p>
                  <p>3. <strong>Containment:</strong> Seal garage from house</p>
                  <p>4. <strong>Disposal:</strong> Hazardous waste protocols for chemicals</p>
                  <p>5. <strong>Cleaning:</strong> Multiple methods based on residue types</p>
                  <p>6. <strong>Testing:</strong> Air quality clearance before reoccupancy</p>
                </div>
              </div>
            </div>

            <div className={styles.interactiveExercise}>
              <h2>💡 Quick Decision Points</h2>
              <div className={styles.decisionGrid}>
                <div>
                  <p><strong>Q: Customer wants to stay during restoration</strong></p>
                  <p>A: Only if limited damage, no hazards, separate living area available</p>
                </div>
                <div>
                  <p><strong>Q: Insurance wants to clean smoke-damaged clothes on-site</strong></p>
                  <p>A: Recommend specialist textile restoration for best results</p>
                </div>
                <div>
                  <p><strong>Q: Visible mould found during fire restoration</strong></p>
                  <p>A: Stop work, assess extent, modify scope to include mould remediation</p>
                </div>
                <div>
                  <p><strong>Q: Customer complains of lingering odour after treatment</strong></p>
                  <p>A: Investigate missed sources, re-clean, additional deodorisation</p>
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
            <h1>Day 9 Assessment</h1>

            <div className={styles.assessmentIntro}>
              <h2>📝 Knowledge Check</h2>
              <p>Test your understanding of fire and smoke damage restoration principles.</p>
            </div>

            <div className={styles.quiz}>
              <div className={styles.questionCard}>
                <h3>Question 1: Smoke Types</h3>
                <p>Which type of smoke residue is most difficult to clean and why?</p>
                <div className={styles.options}>
                  <label>
                    <input 
                      type="radio" 
                      name="q1" 
                      onChange={() => handleQuizAnswer('q1', 'a')}
                    />
                    Dry smoke - because it's powdery
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q1" 
                      onChange={() => handleQuizAnswer('q1', 'b')}
                    />
                    Wet smoke - because it's sticky and smeary
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q1" 
                      onChange={() => handleQuizAnswer('q1', 'c')}
                    />
                    Protein smoke - because it's invisible
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q1" 
                      onChange={() => handleQuizAnswer('q1', 'd')}
                    />
                    Fuel oil soot - because it's oily
                  </label>
                </div>
              </div>

              <div className={styles.questionCard}>
                <h3>Question 2: Deodorisation</h3>
                <p>What must be done before applying any deodorisation treatment?</p>
                <div className={styles.options}>
                  <label>
                    <input 
                      type="radio" 
                      name="q2" 
                      onChange={() => handleQuizAnswer('q2', 'a')}
                    />
                    Test the equipment
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q2" 
                      onChange={() => handleQuizAnswer('q2', 'b')}
                    />
                    Remove source and clean all surfaces
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q2" 
                      onChange={() => handleQuizAnswer('q2', 'c')}
                    />
                    Seal the room
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q2" 
                      onChange={() => handleQuizAnswer('q2', 'd')}
                    />
                    Apply masking agents
                  </label>
                </div>
              </div>

              <div className={styles.questionCard}>
                <h3>Question 3: Safety Consideration</h3>
                <p>Which deodorisation method requires complete evacuation of the building?</p>
                <div className={styles.options}>
                  <label>
                    <input 
                      type="radio" 
                      name="q3" 
                      onChange={() => handleQuizAnswer('q3', 'a')}
                    />
                    Hydroxyl generators
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q3" 
                      onChange={() => handleQuizAnswer('q3', 'b')}
                    />
                    Vapour modification
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q3" 
                      onChange={() => handleQuizAnswer('q3', 'c')}
                    />
                    Ozone treatment
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q3" 
                      onChange={() => handleQuizAnswer('q3', 'd')}
                    />
                    Air scrubbing
                  </label>
                </div>
              </div>

              <div className={styles.questionCard}>
                <h3>Question 4: Restoration Sequence</h3>
                <p>What is the correct order for structural cleaning?</p>
                <div className={styles.options}>
                  <label>
                    <input 
                      type="radio" 
                      name="q4" 
                      onChange={() => handleQuizAnswer('q4', 'a')}
                    />
                    Bottom to top, wet then dry
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q4" 
                      onChange={() => handleQuizAnswer('q4', 'b')}
                    />
                    Top to bottom, dry then wet
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q4" 
                      onChange={() => handleQuizAnswer('q4', 'c')}
                    />
                    Random pattern to avoid streaking
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q4" 
                      onChange={() => handleQuizAnswer('q4', 'd')}
                    />
                    Outside to inside
                  </label>
                </div>
              </div>
            </div>

            <div className={styles.keyTakeaways}>
              <h2>🎯 Key Takeaways</h2>
              <ul>
                <li>Different fire types produce different smoke residues requiring specific cleaning methods</li>
                <li>Successful deodorisation requires source removal, cleaning, and treatment</li>
                <li>Thermal fogging reaches the same areas as smoke traveled</li>
                <li>Ozone is effective but requires evacuation and can damage certain materials</li>
                <li>Hydroxyl generators are safe for occupied spaces</li>
                <li>Always clean from top to bottom to avoid recontamination</li>
                <li>HVAC systems must be thoroughly cleaned to prevent recontamination</li>
                <li>Document everything for insurance purposes</li>
              </ul>
            </div>

            <div className={styles.completionCard}>
              <h2>🏆 Module Complete!</h2>
              <p>Congratulations on completing Day 9: Fire & Smoke Damage Restoration.</p>
              <div className={styles.completionActions}>
                <button 
                  className={styles.certificateButton}
                  onClick={() => markSectionComplete('assessment')}
                >
                  Mark Complete
                </button>
                <Link 
                  href="/portal/training/modules/day-10"
                  className={styles.nextModuleButton}
                >
                  Continue to Day 10 →
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}