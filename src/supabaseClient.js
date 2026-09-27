import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes("your-project") && 
  !supabaseAnonKey.includes("your-anon-key")
);

// Fallback dummy client if unconfigured to prevent unhandled fatal constructor exceptions
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient("https://placeholder.supabase.co", "placeholder-key");

// Initial mock reservations for offline / demo mode
const SEED_STORAGE_KEY = "wandersphere_local_reservations";

export const getLocalReservations = () => {
  try {
    const raw = localStorage.getItem(SEED_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn("Could not read local storage:", e);
  }
  const defaultSeeds = [
    {
      id: 101,
      guest_name: "Elena Rostova",
      email: "elena.r@voyage.io",
      phone: "+1 (555) 234-8901",
      package_name: "Kyoto Autumn Circuit",
      destination: "Japan",
      travelers: 2,
      departure_date: "2026-11-14",
      tier: "Luxury Elite",
      total_price: 6048,
      status: "Confirmed",
      notes: "Vegetarian meals requested, anniversary trip.",
      created_at: new Date(Date.now() - 86400000 * 3).toISOString()
    },
    {
      id: 102,
      guest_name: "Marcus Vance",
      email: "marcus.v@summit.org",
      phone: "+44 20 7946 0912",
      package_name: "Patagonian Fjords & Peaks",
      destination: "Chile",
      travelers: 1,
      departure_date: "2026-12-05",
      tier: "Standard",
      total_price: 2600,
      status: "Confirmed",
      notes: "Bringing own mountaineering boots.",
      created_at: new Date(Date.now() - 86400000 * 6).toISOString()
    },
    {
      id: 103,
      guest_name: "Sofia Alvarez",
      email: "sofia.alvarez@horizon.com",
      phone: "+34 91 123 4567",
      package_name: "Amalfi Coastline Trek",
      destination: "Italy",
      travelers: 3,
      departure_date: "2026-10-20",
      tier: "Backpacker",
      total_price: 3698,
      status: "Confirmed",
      notes: "Early airport pick-up requested.",
      created_at: new Date(Date.now() - 86400000 * 12).toISOString()
    }
  ];
  try {
    localStorage.setItem(SEED_STORAGE_KEY, JSON.stringify(defaultSeeds));
  } catch (err) {
    console.warn("Failed to seed local storage", err);
  }
  return defaultSeeds;
};

export const saveLocalReservations = (reservations) => {
  try {
    localStorage.setItem(SEED_STORAGE_KEY, JSON.stringify(reservations));
  } catch (e) {
    console.warn("Could not save to local storage:", e);
  }
};