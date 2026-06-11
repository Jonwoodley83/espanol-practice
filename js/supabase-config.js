/* ── Supabase client setup ── */
const SUPABASE_URL = 'https://naxoggsmplsdigswnpaw.supabase.co';
const SUPABASE_KEY = 'sb_publishable_MuAtCEX6prDPcO_QjmoYDA_oPPBOLgo';

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Current session state — populated by auth.js */
let currentUser = null;     // supabase auth user
let currentProfile = null;  // row from profiles table (role, username)
