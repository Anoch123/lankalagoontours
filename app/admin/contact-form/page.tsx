"use client";

import { useEffect, useMemo, useState } from "react";
import AdminLayout from "@/components/ui/AdminLayout";
import { useContactForms } from "@/hooks/admin/useContactForm";
import { ContactForm } from "@/lib/types/api/contact_forms";

function formatDate(dateString: string) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export default function AdminContactForms() {
    const [contactedCustomers, setContactedCustomers] = useState<ContactForm[]>([]);
    const [query, setQuery] = useState("");
    const { loadContactForms, loading } = useContactForms();

    useEffect(() => {
        const loadAllContactForms = async () => {
            const response = await loadContactForms();
            if (response) {
                setContactedCustomers(response as ContactForm[]);
            }
        };

        loadAllContactForms();
    }, []);

    const filtered = useMemo(() => {
        if (!query.trim()) return contactedCustomers;
        const q = query.toLowerCase();
        return contactedCustomers.filter((contactForm) => {
            const matchesName = contactForm.name?.toString().toLowerCase().includes(q);
            const matchesEmail = contactForm.email?.toString().toLowerCase().includes(q);
            const matchesCountry = contactForm.country?.toString().toLowerCase().includes(q);
            return matchesName || matchesEmail || matchesCountry;
        });
    }, [contactedCustomers, query]);

    return (
        <AdminLayout>
            <div className="p-6 max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Contact Forms
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {contactedCustomers.length} contact forms
                        </p>
                    </div>

                    <div className="relative w-full sm:w-72">
                        <svg
                            className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
                            />
                        </svg>
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search name, email or country"
                            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300"
                        />
                    </div>
                </div>

                {loading && (
                    <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
                        Loading customers…
                    </div>
                )}

                {!loading && filtered.length === 0 && (
                    <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
                        <p className="text-sm font-medium text-gray-900">
                            No contact forms match that search
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                            Try a different name, email or country.
                        </p>
                    </div>
                )}

                <div className="space-y-4">
                    {filtered.map((contactForm, index) => {
                        return (
                            <div
                                key={contactForm.id || `contactForm-${index}`}
                                className="rounded-xl border border-gray-200 bg-white overflow-hidden"
                            >
                                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-semibold text-gray-900">
                                            {contactForm.name}
                                        </span>
                                        <span
                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
                                                contactForm.read
                                                    ? "bg-gray-100 text-gray-600 ring-gray-500/20"
                                                    : "bg-sky-50 text-sky-700 ring-sky-600/20"
                                            }`}
                                        >
                                            {contactForm.read ? "Read" : "New"}
                                        </span>
                                    </div>

                                    <span className="text-xs text-gray-400">
                                        {formatDate(contactForm.created_at)}
                                    </span>
                                </div>

                                <div className="divide-y divide-gray-100">
                                    <div className="px-5 py-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-600">
                                        <span>
                                            <span className="text-gray-400">Email: </span>
                                            {contactForm.email}
                                        </span>
                                        <span>
                                            <span className="text-gray-400">Phone: </span>
                                            {contactForm.phone || "—"}
                                        </span>
                                        <span>
                                            <span className="text-gray-400">Country: </span>
                                            {contactForm.country || "—"}
                                        </span>
                                    </div>

                                    {contactForm.message && (
                                        <div className="px-5 py-3">
                                            <p className="text-sm text-gray-700">{contactForm.message}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AdminLayout>
    );
}