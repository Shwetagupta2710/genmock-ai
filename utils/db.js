import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

// Supabase connection via custom HTTP adapter
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Custom SQL executor for Supabase
const customSql = neon(process.env.NEXT_PUBLIC_SUPABASE_DB_URL || supabaseUrl);

export const db = drizzle(customSql, { schema });
