import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://fjipdxgjstjdvyphlizb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqaXBkeGdqc3RqZHZ5cGhsaXpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA3NTE2NjYsImV4cCI6MjAwNjMyNzY2Nn0.TTc_j2UjaEG6TS0z5MwDmFilHeFKnyvP4RuJk68f85s";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
