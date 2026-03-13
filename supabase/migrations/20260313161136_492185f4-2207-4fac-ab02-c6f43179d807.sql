
-- Change default status to approved so new users have immediate access
ALTER TABLE public.profiles ALTER COLUMN status SET DEFAULT 'approved';

-- Update the trigger function to set status as approved
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, cpf, status)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'cpf', ''),
    'approved'
  );
  RETURN NEW;
END;
$function$;
