
ALTER TABLE public.profiles
  ADD COLUMN sex text,
  ADD COLUMN uf text,
  ADD COLUMN birth_date date;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, cpf, status, sex, uf, birth_date)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'cpf', ''),
    'approved',
    NEW.raw_user_meta_data->>'sex',
    NEW.raw_user_meta_data->>'uf',
    CASE WHEN NEW.raw_user_meta_data->>'birth_date' IS NOT NULL 
         THEN (NEW.raw_user_meta_data->>'birth_date')::date 
         ELSE NULL END
  );
  RETURN NEW;
END;
$function$;
