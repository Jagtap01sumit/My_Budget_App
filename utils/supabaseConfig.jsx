import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  "https://msryjtpbzxtnnllitkhl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zcnlqdHBienh0bm5sbGl0a2hsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkxMzY1OTcsImV4cCI6MjAzNDcxMjU5N30.KBUeOtAXHMB8ziuPZbsEoOa21n-Dze91EoAtRKspYBQ"
);
