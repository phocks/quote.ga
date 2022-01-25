import { createClient } from "@supabase/supabase-js";

// Provide a custom `fetch` implementation as an option
const supabase = createClient(
  "https://pvzwfbhzshfzmwironld.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjQyNDU1OTYxLCJleHAiOjE5NTgwMzE5NjF9.lsCybier2hm830WuR33QvyW3MSbiFK12ciQleP40TsQ",
  {
    fetch: fetch,
  }
);

console.log(supabase);
