'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../training.module.css';

export default function Day11Module() {
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
          <h2>Day 11: Large Loss</h2>
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
            className={`${styles.navItem} ${activeTab === 'large-loss' ? styles.active : ''}`}
            onClick={() => setActiveTab('large-loss')}
          >
            Large Loss Definition
          </button>
          <button 
            className={`${styles.navItem} ${activeTab === 'commercial' ? styles.active : ''}`}
            onClick={() => setActiveTab('commercial')}
          >
            Commercial Properties
          </button>
          <button 
            className={`${styles.navItem} ${activeTab === 'coordination' ? styles.active : ''}`}
            onClick={() => setActiveTab('coordination')}
          >
            Project Coordination
          </button>
          <button 
            className={`${styles.navItem} ${activeTab === 'specialised' ? styles.active : ''}`}
            onClick={() => setActiveTab('specialised')}
          >
            Specialised Equipment
          </button>
          <button 
            className={`${styles.navItem} ${activeTab === 'scenarios' ? styles.active : ''}`}
            onClick={() => setActiveTab('scenarios')}
          >
            Case Studies
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
            <h1>Day 11: Commercial & Large Loss Projects</h1>
            
            <div className={styles.learningObjectives}>
              <h2>Learning Objectives</h2>
              <ul>
                <li>Understand large loss project definitions and thresholds</li>
                <li>Master commercial property restoration challenges</li>
                <li>Learn multi-trade coordination and project management</li>
                <li>Understand industrial equipment and specialised drying</li>
                <li>Manage stakeholder communications and expectations</li>
                <li>Apply catastrophe response protocols</li>
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
                  <p>Project planning</p>
                </div>
              </div>
            </div>

            <button 
              className={styles.startButton}
              onClick={() => {
                setActiveTab('large-loss');
                markSectionComplete('overview');
              }}
            >
              Start Learning →
            </button>
          </div>
        )}

        {activeTab === 'large-loss' && (
          <div className={styles.contentSection}>
            <h1>Understanding Large Loss Projects</h1>

            <div className={styles.infoCard}>
              <h2>📊 Large Loss Classifications</h2>
              <div className={styles.lossCategories}>
                <div className={styles.categoryCard}>
                  <h3>Standard Commercial</h3>
                  <ul>
                    <li>Value: $100,000 - $500,000</li>
                    <li>Duration: 2-8 weeks</li>
                    <li>Single trade coordination</li>
                    <li>Standard equipment needs</li>
                    <li>Regular project management</li>
                  </ul>
                </div>

                <div className={styles.categoryCard}>
                  <h3>Large Loss</h3>
                  <ul>
                    <li>Value: $500,000 - $2 million</li>
                    <li>Duration: 2-6 months</li>
                    <li>Multi-trade coordination</li>
                    <li>Specialised equipment</li>
                    <li>Dedicated project manager</li>
                  </ul>
                </div>

                <div className={styles.categoryCard}>
                  <h3>Major/Complex Loss</h3>
                  <ul>
                    <li>Value: $2 million - $10 million</li>
                    <li>Duration: 6-18 months</li>
                    <li>Multiple contractors</li>
                    <li>Engineering involvement</li>
                    <li>Executive oversight</li>
                  </ul>
                </div>

                <div className={styles.categoryCard}>
                  <h3>Catastrophic Loss</h3>
                  <ul>
                    <li>Value: $10 million+</li>
                    <li>Duration: 1-3 years</li>
                    <li>National resources</li>
                    <li>Crisis management team</li>
                    <li>Media management</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.projectFactors}>
              <h2>🏗️ Key Differentiators for Large Loss</h2>
              
              <div className={styles.factorGrid}>
                <div className={styles.factorCard}>
                  <h3>Scale & Complexity</h3>
                  <ul>
                    <li>Multiple floors or buildings affected</li>
                    <li>Extensive structural damage</li>
                    <li>Complex mechanical systems</li>
                    <li>Specialised materials/equipment</li>
                    <li>Heritage or unique features</li>
                  </ul>
                </div>

                <div className={styles.factorCard}>
                  <h3>Stakeholder Management</h3>
                  <ul>
                    <li>Multiple insurance carriers</li>
                    <li>Loss adjusters and assessors</li>
                    <li>Building engineers/consultants</li>
                    <li>Corporate executives</li>
                    <li>Government regulators</li>
                  </ul>
                </div>

                <div className={styles.factorCard}>
                  <h3>Business Continuity</h3>
                  <ul>
                    <li>Maintaining operations during restoration</li>
                    <li>Temporary facilities setup</li>
                    <li>Phased restoration approach</li>
                    <li>After-hours work requirements</li>
                    <li>Critical system priorities</li>
                  </ul>
                </div>

                <div className={styles.factorCard}>
                  <h3>Resource Requirements</h3>
                  <ul>
                    <li>Large crews (20-100+ workers)</li>
                    <li>Equipment logistics and storage</li>
                    <li>On-site project office</li>
                    <li>Security and access control</li>
                    <li>Waste management systems</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.australianContext}>
              <h2>🇦🇺 Australian Large Loss Considerations</h2>
              <ul>
                <li><strong>Major Insurers:</strong> IAG, Suncorp, QBE, Allianz - each with specific large loss protocols</li>
                <li><strong>CAT Events:</strong> Cyclones, floods, bushfires trigger catastrophe response</li>
                <li><strong>Remote Logistics:</strong> Equipment mobilisation to regional areas</li>
                <li><strong>Building Codes:</strong> NCC compliance for commercial restoration</li>
                <li><strong>WHS Requirements:</strong> Principal contractor responsibilities</li>
                <li><strong>Environmental:</strong> EPA oversight on large-scale waste disposal</li>
              </ul>
            </div>

            <div className={styles.responseProtocol}>
              <h2>🚨 Large Loss Response Protocol</h2>
              <ol>
                <li><strong>Initial Notification:</strong> Escalate to senior management immediately</li>
                <li><strong>Rapid Response Team:</strong> Deploy within 2-4 hours</li>
                <li><strong>Preliminary Assessment:</strong> Scope, safety, and stabilisation needs</li>
                <li><strong>Resource Mobilisation:</strong> Equipment, personnel, subcontractors</li>
                <li><strong>Stakeholder Meeting:</strong> Within 24 hours with all parties</li>
                <li><strong>Project Plan:</strong> Detailed scope, timeline, and budget</li>
                <li><strong>Daily Reporting:</strong> Progress updates to all stakeholders</li>
              </ol>
            </div>

            <button 
              className={styles.continueButton}
              onClick={() => {
                setActiveTab('commercial');
                markSectionComplete('large-loss');
              }}
            >
              Continue to Commercial Properties →
            </button>
          </div>
        )}

        {activeTab === 'commercial' && (
          <div className={styles.contentSection}>
            <h1>Commercial Property Types & Challenges</h1>

            <div className={styles.propertyTypes}>
              <h2>🏢 Commercial Property Categories</h2>

              <div className={styles.propertyCard}>
                <h3>Office Buildings & Corporate</h3>
                <div className={styles.propertyDetails}>
                  <div className={styles.challenges}>
                    <h4>Unique Challenges:</h4>
                    <ul>
                      <li>IT infrastructure and data centres</li>
                      <li>Document and records recovery</li>
                      <li>Open plan vs private offices</li>
                      <li>After-hours access requirements</li>
                      <li>Lift shaft water damage</li>
                    </ul>
                  </div>
                  <div className={styles.priorities}>
                    <h4>Restoration Priorities:</h4>
                    <ul>
                      <li>Server rooms and IT systems</li>
                      <li>Executive floors</li>
                      <li>Reception and client areas</li>
                      <li>Essential services restoration</li>
                      <li>HVAC and building systems</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className={styles.propertyCard}>
                <h3>Retail & Shopping Centres</h3>
                <div className={styles.propertyDetails}>
                  <div className={styles.challenges}>
                    <h4>Unique Challenges:</h4>
                    <ul>
                      <li>Multiple tenancies affected</li>
                      <li>Stock and inventory damage</li>
                      <li>Public safety and access</li>
                      <li>Food court special requirements</li>
                      <li>Trading hour pressures</li>
                    </ul>
                  </div>
                  <div className={styles.priorities}>
                    <h4>Restoration Priorities:</h4>
                    <ul>
                      <li>Anchor tenants</li>
                      <li>Common areas and entries</li>
                      <li>Fire and life safety systems</li>
                      <li>Cold storage and refrigeration</li>
                      <li>Loading docks and service areas</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className={styles.propertyCard}>
                <h3>Industrial & Manufacturing</h3>
                <div className={styles.propertyDetails}>
                  <div className={styles.challenges}>
                    <h4>Unique Challenges:</h4>
                    <ul>
                      <li>Production line equipment</li>
                      <li>Raw materials contamination</li>
                      <li>Hazardous materials present</li>
                      <li>Large open spaces</li>
                      <li>Heavy machinery access</li>
                    </ul>
                  </div>
                  <div className={styles.priorities}>
                    <h4>Restoration Priorities:</h4>
                    <ul>
                      <li>Critical production equipment</li>
                      <li>Quality control areas</li>
                      <li>Inventory and storage</li>
                      <li>Power and compressed air</li>
                      <li>Environmental controls</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className={styles.propertyCard}>
                <h3>Healthcare & Aged Care</h3>
                <div className={styles.propertyDetails}>
                  <div className={styles.challenges}>
                    <h4>Unique Challenges:</h4>
                    <ul>
                      <li>Infection control requirements</li>
                      <li>Cannot relocate patients</li>
                      <li>Medical equipment sensitivity</li>
                      <li>Pharmaceutical storage</li>
                      <li>24/7 operations</li>
                    </ul>
                  </div>
                  <div className={styles.priorities}>
                    <h4>Restoration Priorities:</h4>
                    <ul>
                      <li>Operating theatres</li>
                      <li>ICU and emergency</li>
                      <li>Pharmacy and labs</li>
                      <li>Patient rooms</li>
                      <li>Medical gas systems</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className={styles.propertyCard}>
                <h3>Educational Facilities</h3>
                <div className={styles.propertyDetails}>
                  <div className={styles.challenges}>
                    <h4>Unique Challenges:</h4>
                    <ul>
                      <li>Academic calendar pressures</li>
                      <li>Student safety requirements</li>
                      <li>Laboratory and special rooms</li>
                      <li>Library and archives</li>
                      <li>Sports facilities</li>
                    </ul>
                  </div>
                  <div className={styles.priorities}>
                    <h4>Restoration Priorities:</h4>
                    <ul>
                      <li>Classrooms and lecture halls</li>
                      <li>IT and computer labs</li>
                      <li>Science laboratories</li>
                      <li>Administration offices</li>
                      <li>Student accommodations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.systemsCard}>
              <h2>🔧 Commercial Building Systems</h2>
              <div className={styles.systemsGrid}>
                <div>
                  <h3>HVAC Systems</h3>
                  <ul>
                    <li>Chilled water systems</li>
                    <li>Cooling towers</li>
                    <li>Air handling units</li>
                    <li>VAV boxes and controls</li>
                    <li>BMS integration</li>
                  </ul>
                </div>
                <div>
                  <h3>Electrical Systems</h3>
                  <ul>
                    <li>Main switchboards</li>
                    <li>UPS systems</li>
                    <li>Emergency generators</li>
                    <li>Lighting controls</li>
                    <li>Fire alarm systems</li>
                  </ul>
                </div>
                <div>
                  <h3>Hydraulic Systems</h3>
                  <ul>
                    <li>Fire sprinklers</li>
                    <li>Hydrants and hose reels</li>
                    <li>Domestic water</li>
                    <li>Sewer and trade waste</li>
                    <li>Stormwater systems</li>
                  </ul>
                </div>
                <div>
                  <h3>Vertical Transport</h3>
                  <ul>
                    <li>Passenger lifts</li>
                    <li>Goods lifts</li>
                    <li>Escalators</li>
                    <li>Lift motor rooms</li>
                    <li>Shaft water damage</li>
                  </ul>
                </div>
              </div>
            </div>

            <button 
              className={styles.continueButton}
              onClick={() => {
                setActiveTab('coordination');
                markSectionComplete('commercial');
              }}
            >
              Continue to Project Coordination →
            </button>
          </div>
        )}

        {activeTab === 'coordination' && (
          <div className={styles.contentSection}>
            <h1>Project Coordination & Management</h1>

            <div className={styles.coordinationStructure}>
              <h2>📋 Large Loss Project Structure</h2>
              
              <div className={styles.orgChart}>
                <div className={styles.orgLevel}>
                  <div className={styles.orgBox}>
                    <h3>Project Director</h3>
                    <p>Overall responsibility, stakeholder liaison</p>
                  </div>
                </div>
                
                <div className={styles.orgLevel}>
                  <div className={styles.orgBox}>
                    <h3>Project Manager</h3>
                    <p>Day-to-day operations, coordination</p>
                  </div>
                </div>
                
                <div className={styles.orgLevel}>
                  <div className={styles.orgBox}>
                    <h3>Site Supervisor</h3>
                    <p>On-site management, safety, quality</p>
                  </div>
                  <div className={styles.orgBox}>
                    <h3>Admin Coordinator</h3>
                    <p>Documentation, reporting, logistics</p>
                  </div>
                </div>
                
                <div className={styles.orgLevel}>
                  <div className={styles.orgBox}>
                    <h3>Trade Leaders</h3>
                    <p>Water, structural, electrical, HVAC</p>
                  </div>
                  <div className={styles.orgBox}>
                    <h3>Subcontractors</h3>
                    <p>Specialised services</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.communicationMatrix}>
              <h2>📞 Stakeholder Communication Plan</h2>
              
              <div className={styles.matrixTable}>
                <table>
                  <thead>
                    <tr>
                      <th>Stakeholder</th>
                      <th>Frequency</th>
                      <th>Method</th>
                      <th>Content</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Insurance Company</td>
                      <td>Daily</td>
                      <td>Email report</td>
                      <td>Progress, costs, issues</td>
                    </tr>
                    <tr>
                      <td>Loss Adjuster</td>
                      <td>2-3 times/week</td>
                      <td>Site meetings</td>
                      <td>Scope changes, approvals</td>
                    </tr>
                    <tr>
                      <td>Property Owner</td>
                      <td>Daily</td>
                      <td>Phone/meeting</td>
                      <td>Updates, decisions needed</td>
                    </tr>
                    <tr>
                      <td>Tenants</td>
                      <td>Weekly</td>
                      <td>Email bulletin</td>
                      <td>Schedule, access, impacts</td>
                    </tr>
                    <tr>
                      <td>Authorities</td>
                      <td>As required</td>
                      <td>Formal submission</td>
                      <td>Compliance, approvals</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className={styles.projectPhases}>
              <h2>🔄 Large Loss Project Phases</h2>
              
              <div className={styles.phaseCard}>
                <h3>Phase 1: Emergency Response (0-48 hours)</h3>
                <ul>
                  <li>Site security and safety assessment</li>
                  <li>Emergency stabilisation and mitigation</li>
                  <li>Initial scope and resource planning</li>
                  <li>Stakeholder notification and mobilisation</li>
                  <li>Temporary services establishment</li>
                </ul>
              </div>

              <div className={styles.phaseCard}>
                <h3>Phase 2: Assessment & Planning (Days 2-7)</h3>
                <ul>
                  <li>Detailed damage assessment</li>
                  <li>Engineering and specialist reports</li>
                  <li>Develop restoration methodology</li>
                  <li>Procurement and subcontractor engagement</li>
                  <li>Submit preliminary scope of works</li>
                </ul>
              </div>

              <div className={styles.phaseCard}>
                <h3>Phase 3: Restoration Works (Weeks 2-X)</h3>
                <ul>
                  <li>Demolition and strip-out</li>
                  <li>Structural drying and dehumidification</li>
                  <li>Cleaning and decontamination</li>
                  <li>Repairs and reconstruction</li>
                  <li>Progressive quality inspections</li>
                </ul>
              </div>

              <div className={styles.phaseCard}>
                <h3>Phase 4: Completion (Final weeks)</h3>
                <ul>
                  <li>Final cleaning and detailing</li>
                  <li>Systems commissioning and testing</li>
                  <li>Authority inspections and certificates</li>
                  <li>Handover documentation</li>
                  <li>Practical completion and sign-off</li>
                </ul>
              </div>
            </div>

            <div className={styles.documentationCard}>
              <h2>📄 Critical Documentation</h2>
              <div className={styles.docGrid}>
                <div>
                  <h3>Daily Requirements</h3>
                  <ul>
                    <li>Site diary and photos</li>
                    <li>Labour allocation sheets</li>
                    <li>Equipment utilisation</li>
                    <li>Moisture readings</li>
                    <li>Safety observations</li>
                  </ul>
                </div>
                <div>
                  <h3>Weekly Reporting</h3>
                  <ul>
                    <li>Progress report</li>
                    <li>Cost tracking</li>
                    <li>Variation register</li>
                    <li>Program update</li>
                    <li>Risk register</li>
                  </ul>
                </div>
                <div>
                  <h3>Project Records</h3>
                  <ul>
                    <li>Scope of works</li>
                    <li>Insurance approvals</li>
                    <li>Subcontractor contracts</li>
                    <li>Test certificates</li>
                    <li>As-built drawings</li>
                  </ul>
                </div>
              </div>
            </div>

            <button 
              className={styles.continueButton}
              onClick={() => {
                setActiveTab('specialised');
                markSectionComplete('coordination');
              }}
            >
              Continue to Specialised Equipment →
            </button>
          </div>
        )}

        {activeTab === 'specialised' && (
          <div className={styles.contentSection}>
            <h1>Specialised Equipment for Large Loss</h1>

            <div className={styles.equipmentCategory}>
              <h2>🌊 High-Volume Water Extraction</h2>
              
              <div className={styles.equipmentGrid}>
                <div className={styles.equipmentCard}>
                  <h3>Truck-Mounted Extractors</h3>
                  <ul>
                    <li>Capacity: 100-300 gallons/minute</li>
                    <li>Reach: Up to 30 floors high</li>
                    <li>Power: Diesel or PTO driven</li>
                    <li>Application: Large floor areas</li>
                    <li>Advantage: Continuous operation</li>
                  </ul>
                </div>

                <div className={styles.equipmentCard}>
                  <h3>Submersible Pumps</h3>
                  <ul>
                    <li>Capacity: 500-5000 GPM</li>
                    <li>Head: Up to 50 metres</li>
                    <li>Power: 3-phase electric</li>
                    <li>Application: Basements, lift shafts</li>
                    <li>Features: Solids handling</li>
                  </ul>
                </div>

                <div className={styles.equipmentCard}>
                  <h3>Flood Pumpers</h3>
                  <ul>
                    <li>Trailer-mounted units</li>
                    <li>10,000+ litres/minute</li>
                    <li>Self-priming</li>
                    <li>Long-distance discharge</li>
                    <li>24/7 operation capable</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.equipmentCategory}>
              <h2>💨 Industrial Drying Systems</h2>
              
              <div className={styles.equipmentGrid}>
                <div className={styles.equipmentCard}>
                  <h3>Desiccant Dehumidifiers</h3>
                  <ul>
                    <li>Capacity: 1000-5000 CFM</li>
                    <li>Grain depression: -40°C dewpoint</li>
                    <li>Power: 3-phase, 30-100 amps</li>
                    <li>Application: Large spaces, cold conditions</li>
                    <li>Ducting: Flexible lay-flat systems</li>
                  </ul>
                </div>

                <div className={styles.equipmentCard}>
                  <h3>Trailer-Mounted Systems</h3>
                  <ul>
                    <li>Combined heat and dehumidification</li>
                    <li>300kW heating capacity</li>
                    <li>10,000 CFM airflow</li>
                    <li>Remote monitoring</li>
                    <li>Generator included</li>
                  </ul>
                </div>

                <div className={styles.equipmentCard}>
                  <h3>Structural Drying Mats</h3>
                  <ul>
                    <li>Hardwood floor systems</li>
                    <li>Concrete drying</li>
                    <li>Negative pressure extraction</li>
                    <li>Minimal demolition</li>
                    <li>500+ sqm coverage</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.equipmentCategory}>
              <h2>⚡ Power Generation & Distribution</h2>
              
              <div className={styles.equipmentGrid}>
                <div className={styles.equipmentCard}>
                  <h3>Industrial Generators</h3>
                  <ul>
                    <li>100kVA - 2MVA capacity</li>
                    <li>Synchronisation capability</li>
                    <li>Load bank testing</li>
                    <li>Automatic transfer switches</li>
                    <li>Sound attenuated</li>
                  </ul>
                </div>

                <div className={styles.equipmentCard}>
                  <h3>Power Distribution</h3>
                  <ul>
                    <li>Temporary switchboards</li>
                    <li>Cable management systems</li>
                    <li>3-phase distribution</li>
                    <li>Earth leakage protection</li>
                    <li>Emergency stops</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.specialistEquipment}>
              <h2>🔬 Specialist Restoration Equipment</h2>
              
              <div className={styles.specialistGrid}>
                <div>
                  <h3>Document Restoration</h3>
                  <ul>
                    <li>Vacuum freeze drying</li>
                    <li>Gamma irradiation</li>
                    <li>Ultrasonic cleaning</li>
                    <li>Document scanners</li>
                  </ul>
                </div>
                <div>
                  <h3>Electronics Recovery</h3>
                  <ul>
                    <li>Ultrasonic baths</li>
                    <li>Corrosion removal</li>
                    <li>Circuit board cleaning</li>
                    <li>Data recovery systems</li>
                  </ul>
                </div>
                <div>
                  <h3>Decontamination</h3>
                  <ul>
                    <li>Hydroxyl generators (industrial)</li>
                    <li>Ozone generators (50g/hr+)</li>
                    <li>HEPA air scrubbers (2000 CFM)</li>
                    <li>Negative air machines</li>
                  </ul>
                </div>
                <div>
                  <h3>Access Equipment</h3>
                  <ul>
                    <li>Scissor lifts to 20m</li>
                    <li>Boom lifts to 40m</li>
                    <li>Scaffolding systems</li>
                    <li>Suspended platforms</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.logisticsCard}>
              <h2>🚚 Equipment Logistics</h2>
              <ul>
                <li><strong>Transport:</strong> Semi-trailers, crane trucks for delivery</li>
                <li><strong>Storage:</strong> Secure compound near site</li>
                <li><strong>Fuel:</strong> Bulk diesel delivery contracts</li>
                <li><strong>Maintenance:</strong> On-site technician for critical equipment</li>
                <li><strong>Monitoring:</strong> Remote telemetry and alarms</li>
                <li><strong>Backup:</strong> Redundancy for critical equipment</li>
              </ul>
            </div>

            <button 
              className={styles.continueButton}
              onClick={() => {
                setActiveTab('scenarios');
                markSectionComplete('specialised');
              }}
            >
              Continue to Case Studies →
            </button>
          </div>
        )}

        {activeTab === 'scenarios' && (
          <div className={styles.contentSection}>
            <h1>Large Loss Case Studies</h1>

            <div className={styles.caseStudy}>
              <h2>🏢 Case Study 1: CBD Office Tower Flood</h2>
              <div className={styles.caseDetails}>
                <div className={styles.situation}>
                  <h3>Situation:</h3>
                  <p>30-storey office building, burst pipe on level 25 over weekend. Water cascaded through 15 floors affecting 50,000m² of premium office space.</p>
                  <ul>
                    <li>Loss value: $8.5 million</li>
                    <li>Affected tenants: 35 companies</li>
                    <li>Duration: 4 months</li>
                    <li>Personnel: 80+ workers</li>
                  </ul>
                </div>

                <div className={styles.challenges}>
                  <h3>Key Challenges:</h3>
                  <ul>
                    <li>Multiple insurance policies (base building + tenants)</li>
                    <li>24/7 data centre on level 10 could not shut down</li>
                    <li>ASX-listed company needed trading floor operational</li>
                    <li>Lift shafts filled with water</li>
                    <li>Building remained occupied above level 25</li>
                  </ul>
                </div>

                <div className={styles.solution}>
                  <h3>Solution Approach:</h3>
                  <ul>
                    <li>Established 3 work zones with separate access</li>
                    <li>Installed temporary data centre cooling</li>
                    <li>Priority restoration of trading floor (72 hours)</li>
                    <li>Lift shaft pumping and specialist drying</li>
                    <li>Night shifts for occupied floor work</li>
                    <li>Weekly tenant meetings and daily bulletins</li>
                  </ul>
                </div>

                <div className={styles.outcome}>
                  <h3>Outcomes:</h3>
                  <ul>
                    <li>Zero business days lost for critical operations</li>
                    <li>Phased reoccupation from week 6</li>
                    <li>Full restoration in 16 weeks</li>
                    <li>No tenant lease breaks</li>
                    <li>Insurance claim settled favourably</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.caseStudy}>
              <h2>🏭 Case Study 2: Food Processing Plant Fire</h2>
              <div className={styles.caseDetails}>
                <div className={styles.situation}>
                  <h3>Situation:</h3>
                  <p>Major fire in packaging area spread through 8,000m² facility. Smoke damage throughout, production halted, export contracts at risk.</p>
                  <ul>
                    <li>Loss value: $12 million</li>
                    <li>Business interruption: $2M/week</li>
                    <li>Duration: 3 months</li>
                    <li>Personnel: 120 workers</li>
                  </ul>
                </div>

                <div className={styles.challenges}>
                  <h3>Key Challenges:</h3>
                  <ul>
                    <li>Food safety standards (HACCP compliance)</li>
                    <li>Protein smoke throughout cold stores</li>
                    <li>Ammonia refrigeration system damage</li>
                    <li>$5 million inventory decision</li>
                    <li>Export certification requirements</li>
                  </ul>
                </div>

                <div className={styles.solution}>
                  <h3>Solution Approach:</h3>
                  <ul>
                    <li>Engaged food safety consultant day 1</li>
                    <li>Segregated and tested all inventory</li>
                    <li>Specialist refrigeration contractors</li>
                    <li>Established temporary production line</li>
                    <li>24/7 operation with 3 shift crews</li>
                    <li>Department of Agriculture liaison</li>
                  </ul>
                </div>

                <div className={styles.outcome}>
                  <h3>Outcomes:</h3>
                  <ul>
                    <li>Partial production resumed week 3</li>
                    <li>Salvaged $3.2M of inventory</li>
                    <li>Export certification maintained</li>
                    <li>No contract penalties incurred</li>
                    <li>Full production capacity week 12</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.caseStudy}>
              <h2>🏥 Case Study 3: Hospital Basement Flood</h2>
              <div className={styles.caseDetails}>
                <div className={styles.situation}>
                  <h3>Situation:</h3>
                  <p>Storm water ingress flooded hospital basement containing emergency generators, medical records, pharmacy, and kitchen. Hospital could not evacuate.</p>
                  <ul>
                    <li>Loss value: $15 million</li>
                    <li>Affected area: 5,000m²</li>
                    <li>Duration: 6 months</li>
                    <li>Critical services impacted</li>
                  </ul>
                </div>

                <div className={styles.challenges}>
                  <h3>Key Challenges:</h3>
                  <ul>
                    <li>Life support systems dependency</li>
                    <li>Infection control requirements</li>
                    <li>Medical records recovery</li>
                    <li>Pharmaceutical disposal regulations</li>
                    <li>24/7 meal service continuity</li>
                  </ul>
                </div>

                <div className={styles.solution}>
                  <h3>Solution Approach:</h3>
                  <ul>
                    <li>Temporary generators within 4 hours</li>
                    <li>Mobile kitchen established</li>
                    <li>Document freeze-drying facility</li>
                    <li>HEPA containment for works</li>
                    <li>Infection control protocols</li>
                    <li>Phased restoration by department</li>
                  </ul>
                </div>

                <div className={styles.outcome}>
                  <h3>Outcomes:</h3>
                  <ul>
                    <li>Zero impact on patient care</li>
                    <li>95% medical records recovered</li>
                    <li>No infection outbreaks</li>
                    <li>Improved flood resilience installed</li>
                    <li>Insurance covered full claim</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.lessonsLearned}>
              <h2>📚 Key Lessons from Large Loss Projects</h2>
              <ul>
                <li><strong>Early Escalation:</strong> Recognise large loss immediately and escalate</li>
                <li><strong>Resource Commitment:</strong> Deploy adequate resources from day 1</li>
                <li><strong>Stakeholder Management:</strong> Over-communicate rather than under</li>
                <li><strong>Documentation:</strong> Photograph everything, document all decisions</li>
                <li><strong>Business Continuity:</strong> Prioritise critical operations</li>
                <li><strong>Quality Control:</strong> Multiple inspection points prevent rework</li>
                <li><strong>Safety First:</strong> Large sites have exponentially more risks</li>
                <li><strong>Expect Changes:</strong> Scope will evolve as damage is uncovered</li>
              </ul>
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
            <h1>Day 11 Assessment</h1>

            <div className={styles.assessmentIntro}>
              <h2>📝 Knowledge Check</h2>
              <p>Test your understanding of commercial and large loss restoration principles.</p>
            </div>

            <div className={styles.quiz}>
              <div className={styles.questionCard}>
                <h3>Question 1: Large Loss Threshold</h3>
                <p>In Australia, at what value is a project typically considered "Large Loss"?</p>
                <div className={styles.options}>
                  <label>
                    <input 
                      type="radio" 
                      name="q1" 
                      onChange={() => handleQuizAnswer('q1', 'a')}
                    />
                    $50,000+
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q1" 
                      onChange={() => handleQuizAnswer('q1', 'b')}
                    />
                    $100,000+
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q1" 
                      onChange={() => handleQuizAnswer('q1', 'c')}
                    />
                    $500,000+
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q1" 
                      onChange={() => handleQuizAnswer('q1', 'd')}
                    />
                    $1,000,000+
                  </label>
                </div>
              </div>

              <div className={styles.questionCard}>
                <h3>Question 2: Stakeholder Communication</h3>
                <p>How often should progress reports be sent to insurers on large loss projects?</p>
                <div className={styles.options}>
                  <label>
                    <input 
                      type="radio" 
                      name="q2" 
                      onChange={() => handleQuizAnswer('q2', 'a')}
                    />
                    Monthly
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q2" 
                      onChange={() => handleQuizAnswer('q2', 'b')}
                    />
                    Weekly
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q2" 
                      onChange={() => handleQuizAnswer('q2', 'c')}
                    />
                    Daily
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q2" 
                      onChange={() => handleQuizAnswer('q2', 'd')}
                    />
                    As requested
                  </label>
                </div>
              </div>

              <div className={styles.questionCard}>
                <h3>Question 3: Healthcare Facilities</h3>
                <p>What is the primary concern when working in healthcare facilities?</p>
                <div className={styles.options}>
                  <label>
                    <input 
                      type="radio" 
                      name="q3" 
                      onChange={() => handleQuizAnswer('q3', 'a')}
                    />
                    Cost control
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q3" 
                      onChange={() => handleQuizAnswer('q3', 'b')}
                    />
                    Speed of completion
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q3" 
                      onChange={() => handleQuizAnswer('q3', 'c')}
                    />
                    Infection control
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q3" 
                      onChange={() => handleQuizAnswer('q3', 'd')}
                    />
                    Equipment protection
                  </label>
                </div>
              </div>

              <div className={styles.questionCard}>
                <h3>Question 4: Desiccant Dehumidifiers</h3>
                <p>When are desiccant dehumidifiers preferred over refrigerant units?</p>
                <div className={styles.options}>
                  <label>
                    <input 
                      type="radio" 
                      name="q4" 
                      onChange={() => handleQuizAnswer('q4', 'a')}
                    />
                    Small residential jobs
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q4" 
                      onChange={() => handleQuizAnswer('q4', 'b')}
                    />
                    Cold conditions or large spaces
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q4" 
                      onChange={() => handleQuizAnswer('q4', 'c')}
                    />
                    When power is limited
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="q4" 
                      onChange={() => handleQuizAnswer('q4', 'd')}
                    />
                    Budget-conscious projects
                  </label>
                </div>
              </div>
            </div>

            <div className={styles.keyTakeaways}>
              <h2>🎯 Key Takeaways</h2>
              <ul>
                <li>Large loss projects require dedicated project management and resources</li>
                <li>Commercial properties have unique challenges based on their use</li>
                <li>Stakeholder communication is critical - daily reporting is standard</li>
                <li>Business continuity often takes priority over restoration speed</li>
                <li>Healthcare facilities require strict infection control protocols</li>
                <li>Specialised equipment like desiccants are essential for large spaces</li>
                <li>Documentation is crucial for insurance and liability purposes</li>
                <li>Multi-trade coordination requires experienced supervision</li>
                <li>Phased restoration allows partial reoccupation during works</li>
              </ul>
            </div>

            <div className={styles.completionCard}>
              <h2>🏆 Module Complete!</h2>
              <p>Congratulations on completing Day 11: Commercial & Large Loss Projects.</p>
              <div className={styles.completionActions}>
                <button 
                  className={styles.certificateButton}
                  onClick={() => markSectionComplete('assessment')}
                >
                  Mark Complete
                </button>
                <Link 
                  href="/portal/training/modules/day-12"
                  className={styles.nextModuleButton}
                >
                  Continue to Day 12 →
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}