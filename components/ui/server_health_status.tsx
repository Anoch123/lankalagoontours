import { ServerCrash, RefreshCw, Clock, Wifi, ChevronRight, Database, ShieldCheck, Zap } from "lucide-react"
import { services, stateStyles } from "@/lib/constants/health"

export default function ServerHealthStatus() {

    return (
        <div className="min-h-screen bg-background relative flex items-center justify-center px-6 overflow-hidden app-shell">
            {/* Ambient background grid */}
            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage:
                        "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                }}
            />

            {/* Top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-destructive to-rose-500" />

            <div className="relative w-full max-w-lg flex flex-col items-center text-center">
                {/* Icon with orbiting ring */}
                <div className="relative mb-8 h-24 w-24">
                    <div className="absolute inset-0 rounded-full border border-destructive/20 animate-[spin_8s_linear_infinite]">
                        <span className="absolute -top-1 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-destructive shadow-[0_0_8px_2px] shadow-destructive/50" />
                    </div>
                    <div className="absolute inset-3 rounded-full bg-gradient-to-br from-destructive/20 to-amber-500/10 blur-lg" />
                    <div className="absolute inset-3 flex items-center justify-center rounded-full border border-destructive/20 bg-gradient-to-br from-destructive/10 to-rose-500/5">
                        <ServerCrash className="h-8 w-8 text-destructive" strokeWidth={1.5} />
                    </div>
                </div>

                {/* Copy */}
                <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/10 px-3 py-1 text-xs font-medium tracking-wide text-destructive uppercase mb-4">
                    <Zap className="h-3 w-3" />
                    Connection issue
                </span>
                <h1 className="font-serif text-3xl text-foreground mb-3 text-balance">
                    We're having trouble{" "}
                    <span className="bg-gradient-to-r from-destructive to-rose-500 bg-clip-text text-transparent">
                        connecting
                    </span>
                </h1>
                <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-sm">
                    Our server didn't respond. This is usually temporary —
                    try again in a moment, and if it keeps happening, check
                    back shortly.
                </p>

                {/* Diagnostic panel */}
                <div className="w-full rounded-lg border border-border bg-card divide-y divide-border mb-4 text-left overflow-hidden">
                    {services.map(({ label, icon: Icon, state }) => {
                        const style = stateStyles[state]
                        return (
                            <div
                                key={label}
                                className="flex items-center justify-between px-4 py-3"
                            >
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Icon className="h-4 w-4" />
                                    <span className="text-sm">{label}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="relative flex h-2 w-2">
                                        {state !== "operational" && (
                                            <span
                                                className={`animate-ping absolute inline-flex h-full w-full rounded-full ${style.dot} opacity-75`}
                                            />
                                        )}
                                        <span
                                            className={`relative inline-flex h-2 w-2 rounded-full ${style.dot}`}
                                        />
                                    </span>
                                    <span className={`text-sm font-medium ${style.text}`}>
                                        {style.label}
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>           
            </div>
        </div>
    )
}