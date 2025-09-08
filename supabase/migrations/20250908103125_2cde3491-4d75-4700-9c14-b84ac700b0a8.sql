-- Ensure updated_at trigger function has proper search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- service_catalog table
CREATE TABLE IF NOT EXISTS public.service_catalog (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code varchar NOT NULL UNIQUE,
  name varchar NOT NULL,
  description text,
  duration_minutes integer NOT NULL DEFAULT 60,
  base_price numeric NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- employee_work_schedules table
CREATE TABLE IF NOT EXISTS public.employee_work_schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
  weekday smallint NOT NULL CHECK (weekday BETWEEN 0 AND 6),
  start_time time NOT NULL,
  end_time time NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- schedule_exceptions table
CREATE TABLE IF NOT EXISTS public.schedule_exceptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
  exception_date date NOT NULL,
  is_available boolean NOT NULL DEFAULT true,
  reason text,
  start_time time,
  end_time time,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.service_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employee_work_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedule_exceptions ENABLE ROW LEVEL SECURITY;

-- Permissive policies (to refine later)
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'service_catalog' AND policyname = 'Allow all on service_catalog'
  ) THEN
    CREATE POLICY "Allow all on service_catalog" ON public.service_catalog FOR ALL USING (true) WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'employee_work_schedules' AND policyname = 'Allow all on employee_work_schedules'
  ) THEN
    CREATE POLICY "Allow all on employee_work_schedules" ON public.employee_work_schedules FOR ALL USING (true) WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'schedule_exceptions' AND policyname = 'Allow all on schedule_exceptions'
  ) THEN
    CREATE POLICY "Allow all on schedule_exceptions" ON public.schedule_exceptions FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_service_catalog_active ON public.service_catalog(is_active);
CREATE INDEX IF NOT EXISTS idx_emp_sched_employee_weekday ON public.employee_work_schedules(employee_id, weekday);
CREATE INDEX IF NOT EXISTS idx_sched_exceptions_employee_date ON public.schedule_exceptions(employee_id, exception_date);

-- updated_at triggers
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'trg_service_catalog_updated_at'
  ) THEN
    CREATE TRIGGER trg_service_catalog_updated_at
    BEFORE UPDATE ON public.service_catalog
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'trg_employee_work_schedules_updated_at'
  ) THEN
    CREATE TRIGGER trg_employee_work_schedules_updated_at
    BEFORE UPDATE ON public.employee_work_schedules
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'trg_schedule_exceptions_updated_at'
  ) THEN
    CREATE TRIGGER trg_schedule_exceptions_updated_at
    BEFORE UPDATE ON public.schedule_exceptions
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;

  -- Also add missing updated_at triggers for core tables if not present
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'trg_employees_updated_at'
  ) THEN
    CREATE TRIGGER trg_employees_updated_at
    BEFORE UPDATE ON public.employees
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'trg_clients_updated_at'
  ) THEN
    CREATE TRIGGER trg_clients_updated_at
    BEFORE UPDATE ON public.clients
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'trg_appointments_updated_at'
  ) THEN
    CREATE TRIGGER trg_appointments_updated_at
    BEFORE UPDATE ON public.appointments
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END $$;

-- Seed default services (idempotent)
INSERT INTO public.service_catalog (code, name, description, duration_minutes, base_price)
VALUES
  ('INIT_ASSESS', 'Initial Assessment', 'Comprehensive initial evaluation and treatment planning.', 60, 120),
  ('FOLLOW_UP', 'Follow-up Session', 'Standard follow-up therapy session.', 45, 90),
  ('MANUAL_TX', 'Manual Therapy', 'Hands-on manual therapy session.', 30, 70)
ON CONFLICT (code) DO NOTHING;

-- Helpful indexes for analytics
CREATE INDEX IF NOT EXISTS idx_appointments_scheduled_start ON public.appointments(scheduled_start);
CREATE INDEX IF NOT EXISTS idx_daily_metrics_date ON public.daily_metrics(metric_date);
