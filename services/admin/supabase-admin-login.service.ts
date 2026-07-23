import { createClient } from "@/lib/supabase/supabase";
import { AdminLoginResponse } from "@/lib/types/api/admin"

const supabase = createClient()

export async function adminLogin(
    email: string,
    password: string
): Promise<AdminLoginResponse | null> {
    try {
        if (!email || !password) throw new Error('Email and password are required')

        const emailTrimmed = email.trim()

        const { data, error: signInError } = await supabase.auth.signInWithPassword({
            email: emailTrimmed,
            password,
        })

        if (signInError) {
            // forward the original message for better client feedback
            throw signInError
        }

        if (!data || !data.user) {
            throw new Error('Authentication failed: no user returned')
        }

        const { data: profile, error: profileError } = await supabase
            .from("admin_users")
            .select("role")
            .eq("admin_users_id", data.user.id)
            .single();

        if (profileError) throw profileError;

        if (!profile) {
            await supabase.auth.signOut();
            throw new Error('Profile not found.')
        }

        return { profile }
    } catch (error) {
        console.warn('adminLogin error:', error)
        // rethrow so callers (client) can display the error message
        throw error
    }
}

export const handleLogout = async () => {
    await supabase.auth.signOut()
  }