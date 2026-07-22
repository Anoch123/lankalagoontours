import { Wifi, Database } from "lucide-react";
import { ServiceState } from "../types/health";

export const services = [
  {
    label: "API",
    icon: Wifi,
    state: "down",
  },
  {
    label: "Database",
    icon: Database,
    state: "operational",
  },
] satisfies {
  label: string;
  icon: typeof Wifi;
  state: ServiceState;
}[];


export const stateStyles: Record<ServiceState, {
  dot: string;
  text: string;
  label: string;
}> = {
  operational: {
    dot: "bg-emerald-500",
    text: "text-emerald-600",
    label: "Operational",
  },

  degraded: {
    dot: "bg-amber-500",
    text: "text-amber-600",
    label: "Degraded",
  },

  down: {
    dot: "bg-destructive",
    text: "text-destructive",
    label: "Down",
  },
};