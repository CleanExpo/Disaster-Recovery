-- ============================================
-- NRP CRM DATABASE INITIALIZATION
-- ============================================

-- Create additional databases
CREATE DATABASE IF NOT EXISTS nrp_leads;
CREATE DATABASE IF NOT EXISTS nrp_finance;
CREATE DATABASE IF NOT EXISTS nrp_insurance;

-- Note: When running this script manually, connect to nrp_crm database first
-- Run: psql -U nrp_admin -d nrp_crm -f 01-init-databases.sql

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "btree_gin";

-- ============================================
-- CONTRACTORS TABLE
-- ============================================

CREATE TABLE contractors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_name VARCHAR(255) NOT NULL,
    abn VARCHAR(11) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    mobile VARCHAR(20),
    
    -- Membership Information
    membership_tier VARCHAR(20) CHECK (membership_tier IN ('foundation', 'professional', 'enterprise', 'franchise')),
    member_since TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'suspended', 'terminated')),
    
    -- Business Information
    trading_name VARCHAR(255),
    website VARCHAR(255),
    description TEXT,
    year_established INTEGER,
    number_of_employees INTEGER,
    
    -- Address Information
    street_address VARCHAR(255),
    suburb VARCHAR(100),
    state VARCHAR(3),
    postcode VARCHAR(4),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    location GEOGRAPHY(POINT, 4326),
    
    -- Service Information
    service_radius_km INTEGER DEFAULT 25,
    emergency_available BOOLEAN DEFAULT false,
    available_24_7 BOOLEAN DEFAULT false,
    
    -- Insurance & Compliance
    public_liability_insurance BOOLEAN DEFAULT false,
    public_liability_amount DECIMAL(12, 2),
    public_liability_expiry DATE,
    workers_comp_insurance BOOLEAN DEFAULT false,
    workers_comp_expiry DATE,
    professional_indemnity BOOLEAN DEFAULT false,
    professional_indemnity_amount DECIMAL(12, 2),
    professional_indemnity_expiry DATE,
    
    -- Performance Metrics
    total_jobs_completed INTEGER DEFAULT 0,
    total_revenue DECIMAL(12, 2) DEFAULT 0,
    average_rating DECIMAL(3, 2) DEFAULT 0,
    response_time_minutes INTEGER,
    completion_rate DECIMAL(5, 2) DEFAULT 0,
    
    -- Financial Information
    bank_account_name VARCHAR(255),
    bsb VARCHAR(6),
    account_number VARCHAR(10),
    stripe_customer_id VARCHAR(255),
    stripe_subscription_id VARCHAR(255),
    
    -- System Fields
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by UUID,
    updated_by UUID,
    metadata JSONB DEFAULT '{}',
    
    -- Indexes for performance
    INDEX idx_contractors_status (status),
    INDEX idx_contractors_membership (membership_tier),
    INDEX idx_contractors_postcode (postcode),
    INDEX idx_contractors_suburb (suburb),
    INDEX idx_contractors_location USING GIST (location)
);

-- ============================================
-- SERVICE TERRITORIES TABLE
-- ============================================

CREATE TABLE service_territories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contractor_id UUID REFERENCES contractors(id) ON DELETE CASCADE,
    postcode VARCHAR(4) NOT NULL,
    suburb VARCHAR(100),
    state VARCHAR(3),
    is_exclusive BOOLEAN DEFAULT false,
    exclusive_until DATE,
    priority_level INTEGER DEFAULT 1,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(contractor_id, postcode),
    INDEX idx_territories_postcode (postcode),
    INDEX idx_territories_contractor (contractor_id)
);

-- ============================================
-- SERVICE TYPES TABLE
-- ============================================

CREATE TABLE service_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(50),
    description TEXT,
    icon VARCHAR(50),
    is_emergency BOOLEAN DEFAULT false,
    average_job_value DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default service types
INSERT INTO service_types (name, category, icon, is_emergency) VALUES
('Water Damage Restoration', 'water', '💧', true),
('Fire Damage Restoration', 'fire', '🔥', true),
('Mould Remediation', 'mould', '🦠', false),
('Storm Damage', 'storm', '🌪️', true),
('Sewage Cleanup', 'biohazard', '☣️', true),
('Biohazard Cleanup', 'biohazard', '☣️', true),
('Carpet Drying', 'water', '🏠', false),
('Contents Restoration', 'general', '📦', false),
('Odour Removal', 'general', '👃', false),
('Trauma Cleanup', 'biohazard', '⚠️', true);

-- ============================================
-- CONTRACTOR SERVICES TABLE
-- ============================================

CREATE TABLE contractor_services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contractor_id UUID REFERENCES contractors(id) ON DELETE CASCADE,
    service_type_id UUID REFERENCES service_types(id),
    is_certified BOOLEAN DEFAULT false,
    certification_number VARCHAR(100),
    certification_expiry DATE,
    hourly_rate DECIMAL(8, 2),
    minimum_charge DECIMAL(8, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(contractor_id, service_type_id),
    INDEX idx_contractor_services (contractor_id)
);

-- ============================================
-- CERTIFICATIONS TABLE
-- ============================================

CREATE TABLE certifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contractor_id UUID REFERENCES contractors(id) ON DELETE CASCADE,
    certification_type VARCHAR(100) NOT NULL,
    certification_body VARCHAR(100),
    certification_number VARCHAR(100),
    issue_date DATE,
    expiry_date DATE,
    document_url VARCHAR(500),
    verified BOOLEAN DEFAULT false,
    verified_at TIMESTAMP,
    verified_by UUID,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_certifications_contractor (contractor_id),
    INDEX idx_certifications_expiry (expiry_date)
);

-- ============================================
-- LEADS TABLE
-- ============================================

CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_number VARCHAR(20) UNIQUE NOT NULL,
    
    -- Customer Information
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_email VARCHAR(255),
    customer_address VARCHAR(500),
    suburb VARCHAR(100),
    state VARCHAR(3),
    postcode VARCHAR(4),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    location GEOGRAPHY(POINT, 4326),
    
    -- Damage Information
    damage_type VARCHAR(50) NOT NULL,
    damage_description TEXT,
    urgency VARCHAR(20) DEFAULT 'standard' CHECK (urgency IN ('emergency', 'urgent', 'standard')),
    property_type VARCHAR(50),
    affected_areas TEXT[],
    
    -- Insurance Information
    insurance_company VARCHAR(100),
    policy_number VARCHAR(100),
    claim_number VARCHAR(100),
    insurance_status VARCHAR(20) CHECK (insurance_status IN ('approved', 'pending', 'declined', 'private')),
    excess_amount DECIMAL(8, 2),
    
    -- Lead Management
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'distributed', 'accepted', 'declined', 'expired', 'completed', 'cancelled')),
    estimated_value DECIMAL(10, 2),
    actual_value DECIMAL(10, 2),
    source VARCHAR(50),
    source_details JSONB,
    
    -- Distribution
    distributed_at TIMESTAMP,
    distribution_count INTEGER DEFAULT 0,
    accepted_by UUID REFERENCES contractors(id),
    accepted_at TIMESTAMP,
    declined_by UUID[],
    expires_at TIMESTAMP,
    
    -- System Fields
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB DEFAULT '{}',
    
    -- Indexes
    INDEX idx_leads_status (status),
    INDEX idx_leads_postcode (postcode),
    INDEX idx_leads_urgency (urgency),
    INDEX idx_leads_created (created_at DESC),
    INDEX idx_leads_location USING GIST (location)
);

-- ============================================
-- LEAD DISTRIBUTION TABLE
-- ============================================

CREATE TABLE lead_distributions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
    contractor_id UUID REFERENCES contractors(id) ON DELETE CASCADE,
    
    -- Distribution Details
    priority_score DECIMAL(5, 2),
    distance_km DECIMAL(6, 2),
    notified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notification_method VARCHAR(20),
    
    -- Response
    viewed_at TIMESTAMP,
    responded_at TIMESTAMP,
    response VARCHAR(20) CHECK (response IN ('accepted', 'declined', 'expired')),
    decline_reason VARCHAR(100),
    
    -- System Fields
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(lead_id, contractor_id),
    INDEX idx_distribution_lead (lead_id),
    INDEX idx_distribution_contractor (contractor_id),
    INDEX idx_distribution_response (response)
);

-- ============================================
-- JOBS TABLE
-- ============================================

CREATE TABLE jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_number VARCHAR(20) UNIQUE NOT NULL,
    lead_id UUID REFERENCES leads(id),
    contractor_id UUID REFERENCES contractors(id),
    
    -- Job Details
    status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_progress', 'drying', 'monitoring', 'completed', 'cancelled', 'on_hold')),
    job_type VARCHAR(50),
    description TEXT,
    
    -- Timeline
    scheduled_date DATE,
    scheduled_time TIME,
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    duration_hours DECIMAL(6, 2),
    
    -- Location
    site_address VARCHAR(500),
    site_contact_name VARCHAR(255),
    site_contact_phone VARCHAR(20),
    access_instructions TEXT,
    
    -- Financials
    quoted_amount DECIMAL(10, 2),
    approved_amount DECIMAL(10, 2),
    actual_amount DECIMAL(10, 2),
    materials_cost DECIMAL(10, 2),
    labour_cost DECIMAL(10, 2),
    equipment_cost DECIMAL(10, 2),
    subcontractor_cost DECIMAL(10, 2),
    
    -- Insurance
    insurance_approved BOOLEAN DEFAULT false,
    insurance_approval_date DATE,
    insurance_payment_received BOOLEAN DEFAULT false,
    insurance_payment_amount DECIMAL(10, 2),
    
    -- Documentation
    scope_of_work TEXT,
    work_completed TEXT,
    moisture_readings JSONB,
    photos JSONB,
    documents JSONB,
    
    -- Quality
    quality_score DECIMAL(3, 2),
    customer_rating INTEGER CHECK (customer_rating BETWEEN 1 AND 5),
    customer_feedback TEXT,
    
    -- System Fields
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by UUID,
    updated_by UUID,
    metadata JSONB DEFAULT '{}',
    
    -- Indexes
    INDEX idx_jobs_contractor (contractor_id),
    INDEX idx_jobs_status (status),
    INDEX idx_jobs_scheduled (scheduled_date),
    INDEX idx_jobs_created (created_at DESC)
);

-- ============================================
-- JOB ACTIVITIES TABLE
-- ============================================

CREATE TABLE job_activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
    contractor_id UUID REFERENCES contractors(id),
    
    activity_type VARCHAR(50) NOT NULL,
    description TEXT,
    performed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    duration_minutes INTEGER,
    
    -- For specific activities
    moisture_reading DECIMAL(5, 2),
    equipment_deployed TEXT[],
    materials_used JSONB,
    photos JSONB,
    
    created_by UUID,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_activities_job (job_id),
    INDEX idx_activities_type (activity_type)
);

-- ============================================
-- INVOICES TABLE
-- ============================================

CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_number VARCHAR(20) UNIQUE NOT NULL,
    job_id UUID REFERENCES jobs(id),
    contractor_id UUID REFERENCES contractors(id),
    
    -- Invoice Details
    invoice_date DATE DEFAULT CURRENT_DATE,
    due_date DATE,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'viewed', 'paid', 'overdue', 'cancelled')),
    
    -- Amounts
    subtotal DECIMAL(10, 2),
    gst_amount DECIMAL(10, 2),
    total_amount DECIMAL(10, 2),
    paid_amount DECIMAL(10, 2) DEFAULT 0,
    
    -- Line Items stored as JSONB
    line_items JSONB,
    
    -- Payment Information
    payment_method VARCHAR(50),
    payment_reference VARCHAR(100),
    paid_at TIMESTAMP,
    
    -- Commission
    nrp_commission_rate DECIMAL(5, 2),
    nrp_commission_amount DECIMAL(10, 2),
    commission_paid BOOLEAN DEFAULT false,
    commission_paid_at TIMESTAMP,
    
    -- System Fields
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    sent_at TIMESTAMP,
    viewed_at TIMESTAMP,
    
    INDEX idx_invoices_contractor (contractor_id),
    INDEX idx_invoices_status (status),
    INDEX idx_invoices_due (due_date)
);

-- ============================================
-- DOCUMENTS TABLE
-- ============================================

CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Relations
    contractor_id UUID REFERENCES contractors(id),
    job_id UUID REFERENCES jobs(id),
    lead_id UUID REFERENCES leads(id),
    invoice_id UUID REFERENCES invoices(id),
    
    -- Document Details
    document_type VARCHAR(50) NOT NULL,
    document_name VARCHAR(255) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_size INTEGER,
    mime_type VARCHAR(100),
    storage_path VARCHAR(500),
    storage_type VARCHAR(20) DEFAULT 'local',
    
    -- Metadata
    description TEXT,
    tags TEXT[],
    is_public BOOLEAN DEFAULT false,
    
    -- System Fields
    uploaded_by UUID,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    
    INDEX idx_documents_contractor (contractor_id),
    INDEX idx_documents_job (job_id),
    INDEX idx_documents_type (document_type)
);

-- ============================================
-- NOTIFICATIONS TABLE
-- ============================================

CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contractor_id UUID REFERENCES contractors(id),
    
    -- Notification Details
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT,
    data JSONB,
    
    -- Delivery
    channels TEXT[] DEFAULT ARRAY['in_app'],
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP,
    
    -- Status
    is_read BOOLEAN DEFAULT false,
    is_archived BOOLEAN DEFAULT false,
    
    -- System Fields
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    
    INDEX idx_notifications_contractor (contractor_id),
    INDEX idx_notifications_read (is_read),
    INDEX idx_notifications_created (created_at DESC)
);

-- ============================================
-- AUDIT LOG TABLE
-- ============================================

CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Entity Information
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID NOT NULL,
    
    -- Action Details
    action VARCHAR(50) NOT NULL,
    changes JSONB,
    previous_values JSONB,
    new_values JSONB,
    
    -- User Information
    user_id UUID,
    user_ip INET,
    user_agent TEXT,
    
    -- System Fields
    performed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_audit_entity (entity_type, entity_id),
    INDEX idx_audit_user (user_id),
    INDEX idx_audit_performed (performed_at DESC)
);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply update trigger to all tables with updated_at
CREATE TRIGGER update_contractors_updated_at BEFORE UPDATE ON contractors
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON jobs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON invoices
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Function to calculate distance between two points
CREATE OR REPLACE FUNCTION calculate_distance(
    lat1 DECIMAL, lon1 DECIMAL,
    lat2 DECIMAL, lon2 DECIMAL
)
RETURNS DECIMAL AS $$
BEGIN
    RETURN ST_Distance(
        ST_MakePoint(lon1, lat1)::geography,
        ST_MakePoint(lon2, lon2)::geography
    ) / 1000.0; -- Return in kilometers
END;
$$ LANGUAGE plpgsql;

-- Function to generate unique lead/job numbers
CREATE OR REPLACE FUNCTION generate_lead_number()
RETURNS VARCHAR AS $$
BEGIN
    RETURN 'L' || TO_CHAR(CURRENT_DATE, 'YYMMDD') || '-' || LPAD(NEXTVAL('lead_number_seq')::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql;

CREATE SEQUENCE lead_number_seq START 1;

CREATE OR REPLACE FUNCTION generate_job_number()
RETURNS VARCHAR AS $$
BEGIN
    RETURN 'J' || TO_CHAR(CURRENT_DATE, 'YYMMDD') || '-' || LPAD(NEXTVAL('job_number_seq')::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql;

CREATE SEQUENCE job_number_seq START 1;

-- ============================================
-- VIEWS
-- ============================================

-- Active contractors with metrics
CREATE VIEW active_contractors_view AS
SELECT 
    c.*,
    COUNT(DISTINCT st.postcode) as territory_count,
    COUNT(DISTINCT j.id) as active_jobs,
    AVG(j.customer_rating) as recent_rating
FROM contractors c
LEFT JOIN service_territories st ON c.id = st.contractor_id
LEFT JOIN jobs j ON c.id = j.contractor_id 
    AND j.status NOT IN ('completed', 'cancelled')
    AND j.created_at > CURRENT_DATE - INTERVAL '30 days'
WHERE c.status = 'active'
GROUP BY c.id;

-- Lead distribution priority view
CREATE VIEW lead_distribution_priority AS
SELECT 
    l.id as lead_id,
    c.id as contractor_id,
    c.business_name,
    calculate_distance(l.latitude, l.longitude, c.latitude, c.longitude) as distance_km,
    c.average_rating,
    c.response_time_minutes,
    c.completion_rate,
    CASE 
        WHEN c.membership_tier = 'franchise' THEN 1000
        WHEN c.membership_tier = 'enterprise' THEN 500
        WHEN c.membership_tier = 'professional' THEN 250
        ELSE 100
    END +
    (100 - calculate_distance(l.latitude, l.longitude, c.latitude, c.longitude)) +
    (c.average_rating * 20) +
    (100 - COALESCE(c.response_time_minutes, 120)) +
    (c.completion_rate) as priority_score
FROM leads l
CROSS JOIN contractors c
WHERE c.status = 'active'
    AND calculate_distance(l.latitude, l.longitude, c.latitude, c.longitude) <= c.service_radius_km
    AND l.status = 'new'
ORDER BY priority_score DESC;

-- ============================================
-- INITIAL DATA
-- ============================================

-- Create admin user
INSERT INTO contractors (
    business_name,
    abn,
    email,
    phone,
    membership_tier,
    status,
    street_address,
    suburb,
    state,
    postcode
) VALUES (
    'NRP Admin',
    '12345678901',
    'admin@nrp.com.au',
    '1300000000',
    'franchise',
    'active',
    '1 Admin Street',
    'Brisbane',
    'QLD',
    '4000'
);

-- ============================================
-- PERMISSIONS
-- ============================================

-- Create read-only user for analytics
CREATE USER nrp_analytics WITH PASSWORD 'Analytics2024!';
GRANT CONNECT ON DATABASE nrp_crm TO nrp_analytics;
GRANT USAGE ON SCHEMA public TO nrp_analytics;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO nrp_analytics;

-- Create application user with full permissions
CREATE USER nrp_app WITH PASSWORD 'App2024!';
GRANT ALL PRIVILEGES ON DATABASE nrp_crm TO nrp_app;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO nrp_app;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO nrp_app;