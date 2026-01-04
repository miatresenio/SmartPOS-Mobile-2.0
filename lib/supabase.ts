import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fqycvddikhlojrzzbacc.supabase.co";
const supabaseAnonKey = "sb_publishable_UXlviIuW3nfuAeC7pkYHvw_a_C0k9UK";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
