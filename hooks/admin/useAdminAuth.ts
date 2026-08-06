"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/supabase";
import { AdminUserProfile } from "@/lib/types/admin/adminUserProfiles";

export function useAdminAuth() {
    const router = useRouter();

    const hasChecked = useRef(false);

    const [user, setUser] = useState<AdminUserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (hasChecked.current) return;

        hasChecked.current = true;

        async function checkAdmin() {

            const supabase = createClient();

            const {
                data: { user }
            } = await supabase.auth.getUser();

            if (!user) {
                setLoading(false);
                router.replace("/admin");
                return;
            }

            const { data: profile } =
                await supabase
                    .from("admin_users")
                    .select("*")
                    .eq("admin_users_id", user.id)
                    .single<AdminUserProfile>();

            if (!profile || profile.role !== "ADMIN") {
                setLoading(false);
                router.replace("/admin");
                return;
            }

            setUser(profile);
            setLoading(false);
        }

        checkAdmin();

    }, [router]);


    return {
        user,
        loading
    };
}