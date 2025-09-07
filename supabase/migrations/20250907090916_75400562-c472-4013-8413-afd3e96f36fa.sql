-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE employee_role AS ENUM ('junior', 'junior_associate', 'associate', 'manager', 'team_leader', 'partner');
CREATE TYPE appointment_status AS ENUM ('scheduled', 'completed', 'cancelled', 'no_show');
CREATE TYPE appointment_type AS ENUM ('physiotherapy', 'massage', 'gym_session', 'consultation', 'follow_up');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'overdue', 'cancelled');

-- Employees table
CREATE TABLE employees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_code VARCHAR(20) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role employee_role NOT NULL,
    base_salary DECIMAL(10,2) DEFAULT 0,
    commission_rate DECIMAL(5,4) DEFAULT 0,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    hire_date DATE NOT NULL DEFAULT CURRENT_DATE,
    is_active BOOLEAN DEFAULT true,
    specializations TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Clients table
CREATE TABLE clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_code VARCHAR(20) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    date_of_birth DATE,
    medical_notes TEXT,
    insurance_provider VARCHAR(100),
    emergency_contact VARCHAR(100),
    emergency_phone VARCHAR(20),
    first_visit_date DATE,
    last_visit_date DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rooms table
CREATE TABLE rooms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    room_number VARCHAR(10) UNIQUE NOT NULL,
    room_name VARCHAR(50) NOT NULL,
    capacity INTEGER DEFAULT 1,
    equipment TEXT[],
    hourly_cost DECIMAL(8,2) DEFAULT 0,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Appointments table
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    appointment_code VARCHAR(20) UNIQUE NOT NULL,
    client_id UUID NOT NULL REFERENCES clients(id),
    employee_id UUID NOT NULL REFERENCES employees(id),
    room_id UUID REFERENCES rooms(id),
    appointment_type appointment_type NOT NULL,
    status appointment_status DEFAULT 'scheduled',
    scheduled_start TIMESTAMPTZ NOT NULL,
    scheduled_end TIMESTAMPTZ NOT NULL,
    actual_start TIMESTAMPTZ,
    actual_end TIMESTAMPTZ,
    session_notes TEXT,
    base_price DECIMAL(8,2) NOT NULL,
    discount_amount DECIMAL(8,2) DEFAULT 0,
    final_price DECIMAL(8,2) NOT NULL,
    payment_status payment_status DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Daily metrics aggregation table
CREATE TABLE daily_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    metric_date DATE NOT NULL,
    employee_id UUID REFERENCES employees(id),
    room_id UUID REFERENCES rooms(id),
    total_appointments INTEGER DEFAULT 0,
    completed_appointments INTEGER DEFAULT 0,
    cancelled_appointments INTEGER DEFAULT 0,
    no_shows INTEGER DEFAULT 0,
    total_revenue DECIMAL(10,2) DEFAULT 0,
    total_hours_worked DECIMAL(5,2) DEFAULT 0,
    unique_clients INTEGER DEFAULT 0,
    room_utilization_rate DECIMAL(5,4) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(metric_date, employee_id, room_id)
);

-- Financial transactions table
CREATE TABLE financial_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    appointment_id UUID REFERENCES appointments(id),
    transaction_type VARCHAR(50) NOT NULL, -- 'payment', 'refund', 'adjustment'
    amount DECIMAL(10,2) NOT NULL,
    transaction_date TIMESTAMPTZ DEFAULT NOW(),
    payment_method VARCHAR(50), -- 'cash', 'card', 'insurance', 'transfer'
    reference_number VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Employee performance tracking
CREATE TABLE employee_performance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID NOT NULL REFERENCES employees(id),
    performance_date DATE NOT NULL,
    appointments_completed INTEGER DEFAULT 0,
    revenue_generated DECIMAL(10,2) DEFAULT 0,
    hours_worked DECIMAL(5,2) DEFAULT 0,
    client_satisfaction_avg DECIMAL(3,2), -- 1-5 rating
    retention_factor DECIMAL(5,4) DEFAULT 0,
    commission_earned DECIMAL(8,2) DEFAULT 0,
    salary_component DECIMAL(8,2) DEFAULT 0,
    total_compensation DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(employee_id, performance_date)
);

-- Client feedback and ratings
CREATE TABLE client_feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    appointment_id UUID NOT NULL REFERENCES appointments(id),
    client_id UUID NOT NULL REFERENCES clients(id),
    employee_id UUID NOT NULL REFERENCES employees(id),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    feedback_text TEXT,
    would_recommend BOOLEAN,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Equipment usage tracking
CREATE TABLE equipment_usage (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    room_id UUID NOT NULL REFERENCES rooms(id),
    appointment_id UUID REFERENCES appointments(id),
    equipment_name VARCHAR(100) NOT NULL,
    usage_start TIMESTAMPTZ NOT NULL,
    usage_end TIMESTAMPTZ,
    maintenance_cost DECIMAL(8,2) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment_usage ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (for now, allow all operations - will be refined based on auth requirements)
CREATE POLICY "Allow all operations on employees" ON employees FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on clients" ON clients FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on rooms" ON rooms FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on appointments" ON appointments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on daily_metrics" ON daily_metrics FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on financial_transactions" ON financial_transactions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on employee_performance" ON employee_performance FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on client_feedback" ON client_feedback FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on equipment_usage" ON equipment_usage FOR ALL USING (true) WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_appointments_employee_date ON appointments(employee_id, scheduled_start);
CREATE INDEX idx_appointments_client_date ON appointments(client_id, scheduled_start);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_daily_metrics_date ON daily_metrics(metric_date);
CREATE INDEX idx_employee_performance_date ON employee_performance(employee_id, performance_date);
CREATE INDEX idx_financial_transactions_date ON financial_transactions(transaction_date);

-- Create update timestamp function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_employees_updated_at BEFORE UPDATE ON employees FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();