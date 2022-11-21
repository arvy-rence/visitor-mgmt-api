import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://yllnsngeimjvrdbdqihm.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsbG5zbmdlaW1qdnJkYmRxaWhtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2ODY1OTg0NSwiZXhwIjoxOTg0MjM1ODQ1fQ.X77127LDcf9sx3hRZREVK1SVo1HSKsIAA69GFCN0Rwc";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
