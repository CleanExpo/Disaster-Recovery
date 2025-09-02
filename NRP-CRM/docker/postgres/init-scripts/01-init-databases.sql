-- ============================================
-- NRP CRM DATABASE INITIALIZATION (SIMPLIFIED)
-- ============================================

-- Create additional databases
-- Note: These will fail if databases already exist, which is fine
CREATE DATABASE nrp_leads;
CREATE DATABASE nrp_finance; 
CREATE DATABASE nrp_insurance;

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

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
    
    -- Service Information
    service_radius_km INTEGER DEFAULT 25,
    emergency_available BOOLEAN DEFAULT true,
    after_hours_available BOOLEAN DEFAULT false,
    weekends_available BOOLEAN DEFAULT true,
    
    -- Insurance Information
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
    metadata JSONB DEFAULT '{}'
);

-- Create indexes for contractors table
CREATE INDEX idx_contractors_status ON contractors (status);
CREATE INDEX idx_contractors_membership ON contractors (membership_tier);
CREATE INDEX idx_contractors_postcode ON contractors (postcode);
CREATE INDEX idx_contractors_suburb ON contractors (suburb);

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
-- LEADS TABLE
-- ============================================

CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Lead Source
    source VARCHAR(50) NOT NULL CHECK (source IN ('website', 'phone', 'email', 'api', 'partner', 'insurance')),
    source_details JSONB DEFAULT '{}',
    insurance_company VARCHAR(100),
    claim_number VARCHAR(100),
    
    -- Customer Information
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255),
    customer_phone VARCHAR(20) NOT NULL,
    customer_mobile VARCHAR(20),
    
    -- Property Information
    property_type VARCHAR(50) CHECK (property_type IN ('residential', 'commercial', 'industrial', 'strata')),
    property_address VARCHAR(255) NOT NULL,
    property_suburb VARCHAR(100),
    property_state VARCHAR(3),
    property_postcode VARCHAR(4) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    
    -- Job Details
    service_type VARCHAR(100),
    urgency VARCHAR(20) DEFAULT 'standard' CHECK (urgency IN ('emergency', 'urgent', 'standard', 'scheduled')),
    description TEXT,
    estimated_value DECIMAL(10, 2),
    
    -- Status and Assignment
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'distributed', 'assigned', 'accepted', 'rejected', 'expired', 'completed')),
    assigned_contractor_id UUID,
    assigned_at TIMESTAMP,
    
    -- System Fields
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by UUID,
    updated_by UUID,
    metadata JSONB DEFAULT '{}'
);

-- Create indexes for leads table
CREATE INDEX idx_leads_status ON leads (status);
CREATE INDEX idx_leads_postcode ON leads (property_postcode);
CREATE INDEX idx_leads_urgency ON leads (urgency);
CREATE INDEX idx_leads_created ON leads (created_at DESC);

-- ============================================
-- JOBS TABLE
-- ============================================

CREATE TABLE jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID REFERENCES leads(id),
    contractor_id UUID REFERENCES contractors(id),
    
    -- Job Information
    job_number VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'scheduled', 'in_progress', 'on_hold', 'completed', 'cancelled')),
    priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'emergency')),
    
    -- Scheduling
    scheduled_date DATE,
    scheduled_time TIME,
    estimated_duration_hours INTEGER,
    actual_start_time TIMESTAMP,
    actual_end_time TIMESTAMP,
    
    -- Financial
    quoted_amount DECIMAL(10, 2),
    approved_amount DECIMAL(10, 2),
    actual_amount DECIMAL(10, 2),
    invoice_sent BOOLEAN DEFAULT false,
    invoice_sent_date DATE,
    payment_received BOOLEAN DEFAULT false,
    payment_received_date DATE,
    
    -- Completion Details
    completion_notes TEXT,
    customer_signature_url VARCHAR(500),
    completion_photos JSONB DEFAULT '[]',
    customer_feedback TEXT,
    customer_rating INTEGER CHECK (customer_rating >= 1 AND customer_rating <= 5),
    
    -- System Fields
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by UUID,
    updated_by UUID,
    metadata JSONB DEFAULT '{}'
);

-- Create indexes for jobs table
CREATE INDEX idx_jobs_contractor ON jobs (contractor_id);
CREATE INDEX idx_jobs_status ON jobs (status);
CREATE INDEX idx_jobs_scheduled ON jobs (scheduled_date);
CREATE INDEX idx_jobs_created ON jobs (created_at DESC);

-- ============================================
-- USERS TABLE (for authentication)
-- ============================================

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'contractor', 'staff', 'viewer')),
    contractor_id UUID REFERENCES contractors(id),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for users table
CREATE INDEX idx_users_email ON users (email);
CREATE INDEX idx_users_contractor ON users (contractor_id);

-- ============================================
-- Create default admin user
-- ============================================
INSERT INTO users (email, password_hash, role, first_name, last_name) 
VALUES ('admin@nrp.com.au', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'admin', 'System', 'Administrator');
-- Default password is 'secret123'

-- ============================================
-- Grant permissions
-- ============================================
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO nrp_admin;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO nrp_admin;