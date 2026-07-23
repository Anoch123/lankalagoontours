"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Oswald } from "next/font/google";

const oswald = Oswald({
    weight: ["500", "700"],
    subsets: ["latin"],
});

type AlertDialogVariant = "default" | "danger";

type AlertDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description?: string;
    confirmLabel?: string;
    onConfirm?: () => void;
    variant?: AlertDialogVariant;
    /** Hide the cancel button for plain "OK" style alerts */
    hideCancel?: boolean;
};

export default function AlertDialog({
    open,
    onOpenChange,
    title,
    description,
    confirmLabel = "Confirm",
    onConfirm,
    variant = "default",
    hideCancel = false,
}: AlertDialogProps) {
    const confirmRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!open) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onOpenChange(false);
        };
        document.addEventListener("keydown", onKeyDown);

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        confirmRef.current?.focus();

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = originalOverflow;
        };
    }, [open, onOpenChange]);

    if (!open) return null;

    const accent = variant === "danger" ? "#b3452f" : "#c9862f";
    const accentHover = variant === "danger" ? "#c65a3f" : "#e7c16f";

    return createPortal(
        <div
            role="presentation"
            className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0f2e2c]/70 p-6 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
        >
            <div
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="alert-dialog-title"
                aria-describedby={description ? "alert-dialog-description" : undefined}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-sm rounded-2xl border border-[#0f2e2c]/10 bg-[#faf8f3] p-6 shadow-2xl"
            >
                <h2
                    id="alert-dialog-title"
                    className={`${oswald.className} text-lg font-semibold text-[#0f2e2c]`}
                >
                    {title}
                </h2>

                {description && (
                    <p id="alert-dialog-description" className="mt-2 text-sm leading-relaxed text-[#0f2e2c]/60">
                        {description}
                    </p>
                )}

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        ref={confirmRef}
                        type="button"
                        onClick={() => {
                            onConfirm?.();
                            onOpenChange(false);
                        }}
                        style={{ backgroundColor: accent }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = accentHover)}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = accent)}
                        className={`${oswald.className} rounded-full px-5 py-2.5 text-sm font-semibold text-[#fff] transition-transform hover:-translate-y-0.5`}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}