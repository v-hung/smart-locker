import { createClient } from "@supabase/supabase-js";
import { SUPABASE } from "../configs/supabase.config";

export const supabase = createClient(SUPABASE.URL, SUPABASE.ANON_KEY);
