"use client";

import { useEffect, useState, type ReactNode } from "react";
import Loading from "@/components/ui/loading";
import { checkSupabaseHealth } from "@/services/supabase-health.service";
import ServerHealthStatus from "@/components/ui/server_health_status";

export default function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [showServerHealth, setShowServerHealth] = useState(false);

  useEffect(() => {
    async function init() {
      const health = await checkSupabaseHealth();

      if (!health || health.name !== "GoTrue") {
        setLoading(false);
        setShowServerHealth(true);
        return;
      }

      setLoading(false);
    }

    void init();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (showServerHealth) return <ServerHealthStatus />;

  return children;
}