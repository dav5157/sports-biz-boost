-- Update employee roles enum to match hierarchy
DROP TYPE IF EXISTS employee_role CASCADE;
CREATE TYPE employee_role AS ENUM ('junior', 'junior_associate', 'associate', 'manager', 'team_leader', 'partner');

-- Update employees table with commission structure
ALTER TABLE employees 
DROP COLUMN IF EXISTS role CASCADE,
ADD COLUMN role employee_role NOT NULL DEFAULT 'junior',
ADD COLUMN commission_rate DECIMAL(5,2) DEFAULT 0.00,
ADD COLUMN fixed_salary DECIMAL(10,2) DEFAULT 0.00;

-- Create employee_hierarchy table for tracking counts
CREATE TABLE employee_hierarchy (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  role employee_role NOT NULL UNIQUE,
  max_count INTEGER NOT NULL,
  current_count INTEGER DEFAULT 0,
  base_commission_rate DECIMAL(5,2) DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert hierarchy data
INSERT INTO employee_hierarchy (role, max_count, base_commission_rate) VALUES
  ('junior', 4, 0.00),
  ('junior_associate', 2, 30.00),
  ('associate', 4, 35.00),
  ('manager', 2, 45.00),
  ('team_leader', 3, 50.00),
  ('partner', 5, 60.00);

-- Create therapist_performance table for detailed tracking
CREATE TABLE therapist_performance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID REFERENCES employees(id) NOT NULL,
  performance_date DATE NOT NULL,
  appointments_count INTEGER DEFAULT 0,
  appointment_hours DECIMAL(8,2) DEFAULT 0.00,
  classes_count INTEGER DEFAULT 0,
  class_hours DECIMAL(8,2) DEFAULT 0.00,
  attendance_rate DECIMAL(5,2) DEFAULT 0.00,
  total_hours DECIMAL(8,2) DEFAULT 0.00,
  unique_clients INTEGER DEFAULT 0,
  retention_factor DECIMAL(5,2) DEFAULT 0.00,
  resources_used TEXT[],
  revenue_generated DECIMAL(12,2) DEFAULT 0.00,
  appointments_booked INTEGER DEFAULT 0,
  revenue_per_session DECIMAL(8,2) DEFAULT 0.00,
  gross_salary DECIMAL(10,2) DEFAULT 0.00,
  hksc_profit DECIMAL(12,2) DEFAULT 0.00,
  actual_hksc_profit DECIMAL(12,2) DEFAULT 0.00,
  profit_per_session DECIMAL(8,2) DEFAULT 0.00,
  commission_earned DECIMAL(10,2) DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(employee_id, performance_date)
);

-- Create alerts table for system notifications
CREATE TABLE system_alerts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  alert_type VARCHAR(50) NOT NULL,
  title VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  severity VARCHAR(20) DEFAULT 'info' CHECK (severity IN ('info', 'warning', 'critical')),
  employee_id UUID REFERENCES employees(id),
  is_resolved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  resolved_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}'
);

-- Create email_reports table for tracking sent reports
CREATE TABLE email_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  report_type VARCHAR(50) NOT NULL,
  recipient_email VARCHAR(255) NOT NULL,
  subject VARCHAR(500) NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  status VARCHAR(20) DEFAULT 'sent' CHECK (status IN ('sent', 'failed', 'pending')),
  report_data JSONB,
  error_message TEXT
);

-- Create reporting_config table for email settings
CREATE TABLE reporting_config (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  report_type VARCHAR(50) NOT NULL UNIQUE,
  schedule_cron VARCHAR(50) NOT NULL,
  recipient_emails TEXT[] NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  last_sent TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert default reporting schedules
INSERT INTO reporting_config (report_type, schedule_cron, recipient_emails) VALUES
  ('daily_performance', '0 8 * * *', ARRAY['admin@hksc.com']),
  ('weekly_summary', '0 9 * * 1', ARRAY['admin@hksc.com', 'manager@hksc.com']),
  ('monthly_financial', '0 10 1 * *', ARRAY['admin@hksc.com', 'finance@hksc.com']),
  ('alert_digest', '0 18 * * *', ARRAY['admin@hksc.com']);

-- Enable RLS on all new tables
ALTER TABLE employee_hierarchy ENABLE ROW LEVEL SECURITY;
ALTER TABLE therapist_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE reporting_config ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (allow all for now, can be restricted later)
CREATE POLICY "Allow all on employee_hierarchy" ON employee_hierarchy FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on therapist_performance" ON therapist_performance FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on system_alerts" ON system_alerts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on email_reports" ON email_reports FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on reporting_config" ON reporting_config FOR ALL USING (true) WITH CHECK (true);

-- Create update triggers for timestamp fields
CREATE TRIGGER update_employee_hierarchy_updated_at
  BEFORE UPDATE ON employee_hierarchy
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_therapist_performance_updated_at
  BEFORE UPDATE ON therapist_performance
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reporting_config_updated_at
  BEFORE UPDATE ON reporting_config
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to calculate employee commission rate
CREATE OR REPLACE FUNCTION calculate_commission_rate(emp_role employee_role)
RETURNS DECIMAL(5,2)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN CASE emp_role
    WHEN 'junior' THEN 0.00
    WHEN 'junior_associate' THEN 30.00
    WHEN 'associate' THEN 35.00
    WHEN 'manager' THEN 45.00
    WHEN 'team_leader' THEN 50.00
    WHEN 'partner' THEN 60.00
    ELSE 0.00
  END;
END;
$$;

-- Create function to update employee hierarchy counts
CREATE OR REPLACE FUNCTION update_hierarchy_counts()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Update counts based on active employees
  UPDATE employee_hierarchy SET current_count = (
    SELECT COUNT(*) FROM employees WHERE role = employee_hierarchy.role AND is_active = true
  );
  RETURN NULL;
END;
$$;

-- Create trigger to maintain hierarchy counts
CREATE TRIGGER maintain_hierarchy_counts
  AFTER INSERT OR UPDATE OR DELETE ON employees
  FOR EACH STATEMENT EXECUTE FUNCTION update_hierarchy_counts();

-- Create indexes for performance
CREATE INDEX idx_therapist_performance_employee_date ON therapist_performance(employee_id, performance_date);
CREATE INDEX idx_therapist_performance_date ON therapist_performance(performance_date);
CREATE INDEX idx_system_alerts_severity ON system_alerts(severity) WHERE is_resolved = false;
CREATE INDEX idx_system_alerts_employee ON system_alerts(employee_id) WHERE is_resolved = false;
CREATE INDEX idx_email_reports_type_date ON email_reports(report_type, sent_at);

-- Update existing employees with commission rates
UPDATE employees SET 
  commission_rate = calculate_commission_rate(role),
  fixed_salary = CASE WHEN role = 'junior' THEN 36000.00 ELSE 0.00 END;

-- Seed some sample employees for each role
INSERT INTO employees (employee_code, full_name, email, role, commission_rate, fixed_salary, hire_date) VALUES
  ('J001', 'Junior Therapist 1', 'junior1@hksc.com', 'junior', 0.00, 36000.00, CURRENT_DATE - INTERVAL '6 months'),
  ('J002', 'Junior Therapist 2', 'junior2@hksc.com', 'junior', 0.00, 36000.00, CURRENT_DATE - INTERVAL '4 months'),
  ('JA001', 'Junior Associate 1', 'ja1@hksc.com', 'junior_associate', 30.00, 0.00, CURRENT_DATE - INTERVAL '1 year'),
  ('A001', 'Associate Therapist 1', 'assoc1@hksc.com', 'associate', 35.00, 0.00, CURRENT_DATE - INTERVAL '2 years'),
  ('A002', 'Associate Therapist 2', 'assoc2@hksc.com', 'associate', 35.00, 0.00, CURRENT_DATE - INTERVAL '18 months'),
  ('M001', 'Manager 1', 'manager1@hksc.com', 'manager', 45.00, 0.00, CURRENT_DATE - INTERVAL '3 years'),
  ('TL001', 'Team Leader 1', 'tl1@hksc.com', 'team_leader', 50.00, 0.00, CURRENT_DATE - INTERVAL '4 years'),
  ('P001', 'Partner 1', 'partner1@hksc.com', 'partner', 60.00, 0.00, CURRENT_DATE - INTERVAL '5 years');