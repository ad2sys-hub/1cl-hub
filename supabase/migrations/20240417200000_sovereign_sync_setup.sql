-- 1. Enable Extensions
CREATE EXTENSION IF NOT EXISTS "pg_net";

-- 2. Define Tables
-- Partnership Inquiries (from Sponsors Portal)
CREATE TABLE IF NOT EXISTS public.partnership_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity TEXT NOT NULL,
    contact TEXT NOT NULL,
    synergy TEXT NOT NULL,
    value_proposal TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Audit Logs (for EMS tracking)
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    action TEXT NOT NULL,
    initiator TEXT,
    meta JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Profiles (User Identity)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    role TEXT DEFAULT 'staff',
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Enable RLS
ALTER TABLE public.partnership_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public inquiries are insert-only" ON public.partnership_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view all inquiries" ON public.partnership_inquiries FOR SELECT USING (auth.jwt() ->> 'email' LIKE '%@1cl.com');

CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 4. Create Sync Trigger Function
CREATE OR REPLACE FUNCTION public.notify_sovereign_bridge()
RETURNS TRIGGER AS $$
DECLARE
    payload JSONB;
    token TEXT := 'SOVEREIGN_HUB_V1_SECRET'; -- REPLACE WITH YOUR SOVEREIGN_SYNC_TOKEN
BEGIN
    payload := json_build_object(
        'type', TG_OP,
        'table', TG_TABLE_NAME,
        'record', row_to_json(NEW),
        'old_record', CASE WHEN TG_OP = 'UPDATE' THEN row_to_json(OLD) ELSE NULL END,
        'schema', TG_TABLE_SCHEMA
    );

    PERFORM net.http_post(
        url := 'https://hhavnojpqdkdnppipbrg.supabase.co/functions/v1/mongodb-bridge',
        headers := jsonb_build_object(
            'Content-Type', 'application/json',
            'x-sovereign-token', token
        ),
        body := payload
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Attach Triggers
CREATE TRIGGER sync_partnership_inquiry
AFTER INSERT OR UPDATE ON public.partnership_inquiries
FOR EACH ROW EXECUTE FUNCTION public.notify_sovereign_bridge();

CREATE TRIGGER sync_audit_log
AFTER INSERT ON public.audit_logs
FOR EACH ROW EXECUTE FUNCTION public.notify_sovereign_bridge();

CREATE TRIGGER sync_profile
AFTER INSERT OR UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.notify_sovereign_bridge();
