"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/supabase";


export function useAdminAuth() {

    const router = useRouter();

    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        async function checkAdmin() {

            const supabase = createClient();


            const {
                data: {
                    user
                }
            } = await supabase.auth.getUser();


            if (!user) {
                router.replace('/lankalagoon-admin');
                return;
            }


            const { data: profile } =
                await supabase
                    .from("admin_users")
                    .select("*")
                    .eq("admin_users_id", user.id)
                    .single();



            if (!profile || profile.role !== "ADMIN") {
                router.replace('/lankalagoon-admin');
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