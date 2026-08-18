'use client'

import { useEffect, useState } from 'react'
import AdminLayout from '@/components/ui/AdminLayout'
import { boatTourSchema } from "@/lib/validations/boat-tour.schema";
import { useBoatTours } from '@/hooks/admin/useBoatTours'
import { useBoatTourForm, slugify } from '@/hooks/admin/useBoatTourForm'
import { useRouter } from 'next/navigation';

export default function AdminBoatTours() {
    const { tour, saving, setSaving, saved, setSaved, errors, setErrors, update, updateListItem, addListItem, removeListItem, updateStop, addStop, removeStop, updateGuestPricing, addGuestPricing, removeGuestPricing, handleTitleChange, buildPayload } = useBoatTourForm('ACTIVE')
    const [message, setMessage] = useState<string | null>(null);
    const { saveTour } = useBoatTours();
    const router = useRouter();

    useEffect(() => {
        return () => {
            setSaved(false)
        }
    }, [setSaved])

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        setSaving(true);
        setSaved(false);
        setErrors({});


        const payload = buildPayload();


        const validation =
            boatTourSchema.safeParse(payload);



        if (!validation.success) {

            const formattedErrors: Record<string, string> = {};


            validation.error.issues.forEach((error) => {

                const field =
                    error.path[0]?.toString();


                if (field) {
                    formattedErrors[field] = error.message;
                }

            });


            setErrors(formattedErrors);

            setSaving(false);

            return;
        }

        try {

            console.log(
                "Validated payload",
                validation.data
            );

            const response = await saveTour(buildPayload());
            console.log('response ', response);

            if (!response.success) {
                setMessage(response.message);
                setSaving(false);
                return;
            }

            setMessage(response.message);
            router.push("/admin/boat-tours");

            setSaved(true);

        } catch (error) {

            console.error(error);

        }
        finally {

            setSaving(false);

        }

    };

    return (
        <AdminLayout>
            <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
                {/* Header */}
                <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#146B72] mb-1">Boat Tours</p>
                    <h1 className="font-display text-3xl text-[#16302E]">New tour</h1>
                    <p className="text-sm text-[#4A625F] mt-1">
                        Add a lagoon or boat tour listing — this maps directly onto the tour card fields.
                    </p>
                </div>

                {/* Basics */}
                <Section title="Basics">
                    <Field label="Title">
                        <input
                            className={inputClass}
                            value={tour.title}
                            onChange={(e) => handleTitleChange(e.target.value)}
                            placeholder="Lanka Lagoon Mangrove & Wildlife Cruise"
                        />
                        {
                            errors.title &&
                            (
                                <p className="text-xs text-red-500 mt-1">
                                    {errors.title}
                                </p>
                            )
                        }
                    </Field>

                    <Field label="ID / slug" hint="Auto-filled from the title, but you can override it.">
                        <input
                            className={inputClass}
                            value={tour.id}
                            onChange={(e) => update('id', slugify(e.target.value))}
                            placeholder="negombo-lagoon"
                        />
                        {
                            errors.slug &&
                            (
                                <p className="text-xs text-red-500 mt-1">
                                    {errors.slug}
                                </p>
                            )
                        }
                    </Field>

                    <Field label="Tagline">
                        <input
                            className={inputClass}
                            value={tour.tagline}
                            onChange={(e) => update('tagline', e.target.value)}
                            placeholder="Mangroves · Wildlife · Fishing Village"
                        />
                        {
                            errors.tagline &&
                            (
                                <p className="text-xs text-red-500 mt-1">
                                    {errors.tagline}
                                </p>
                            )
                        }
                    </Field>

                    <Field label="Tag" hint="Small badge on the card, e.g. Most booked">
                        <input
                            className={inputClass}
                            value={tour.tag}
                            onChange={(e) => update('tag', e.target.value)}
                            placeholder="Most booked"
                        />
                    </Field>

                    <Field label="Description" full>
                        <textarea
                            className={`${inputClass} min-h-[80px]`}
                            value={tour.description}
                            onChange={(e) => update('description', e.target.value)}
                            placeholder="A slow drift through Negombo's lagoon, canals and mangrove channels."
                        />
                        {
                            errors.description &&
                            (
                                <p className="text-xs text-red-500 mt-1">
                                    {errors.description}
                                </p>
                            )
                        }
                    </Field>

                    <Field label="Summary" full hint="Longer intro shown on the tour detail page.">
                        <textarea
                            className={`${inputClass} min-h-[100px]`}
                            value={tour.summary}
                            onChange={(e) => update('summary', e.target.value)}
                            placeholder="Glide out from the fishing jetty at first light…"
                        />
                    </Field>

                    <Field label="Cover image path" full>
                        <input
                            className={inputClass}
                            value={tour.image}
                            onChange={(e) => update('image', e.target.value)}
                            placeholder="/images/tours/mangrove.jpg"
                        />
                    </Field>
                </Section>

                {/* Pricing & duration */}
                <Section title="Pricing & duration">
                    <Field label="Currency">
                        <input
                            className={inputClass}
                            value={tour.currency}
                            onChange={(e) => update('currency', e.target.value)}
                            placeholder="$"
                        />
                        {
                            errors.currency &&
                            (
                                <p className="text-xs text-red-500 mt-1">
                                    {errors.currency}
                                </p>
                            )
                        }
                    </Field>

                    <Field label="Price">
                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            className={inputClass}
                            value={tour.price}
                            onChange={(e) => update('price', e.target.value)}
                            placeholder="35"
                        />
                        {
                            errors.price &&
                            (
                                <p className="text-xs text-red-500 mt-1">
                                    {errors.price}
                                </p>
                            )
                        }
                    </Field>

                    <Field label="Guest pricing" full hint="Set total price per guest count tier. First entry with guest count &gt; 1 shows as '1–X guests'.">
                        <GuestPricingEditor
                            items={tour.guest_pricing}
                            onChange={(i, key, value) => updateGuestPricing(i, key, value)}
                            onAdd={addGuestPricing}
                            onRemove={(i) => removeGuestPricing(i)}
                        />
                    </Field>

                    <Field label="Duration">
                        <input
                            className={inputClass}
                            value={tour.duration}
                            onChange={(e) => update('duration', e.target.value)}
                            placeholder="3 hrs"
                        />
                        {
                            errors.duration &&
                            (
                                <p className="text-xs text-red-500 mt-1">
                                    {errors.duration}
                                </p>
                            )
                        }
                    </Field>

                    <Field label="Departures">
                        <input
                            className={inputClass}
                            value={tour.departures}
                            onChange={(e) => update('departures', e.target.value)}
                            placeholder="06:30 & 15:30 daily"
                        />
                    </Field>

                    <Field label="Departure Details" hint="E.g. '06:30 AM SUNSET & 15:30 PM DAILY'">
                        <input
                            className={inputClass}
                            value={tour.departure_details}
                            onChange={(e) => update('departure_details', e.target.value)}
                            placeholder="06:30 AM SUNSET & 15:30 PM DAILY"
                        />
                    </Field>
                </Section>

                {/* Logistics */}
                <Section title="Logistics">
                    <Field label="Tour type">
                        <input
                            className={inputClass}
                            value={tour.type}
                            onChange={(e) => update('type', e.target.value)}
                            placeholder="Shared motorboat tour"
                        />
                    </Field>

                    <Field label="Departure location">
                        <input
                            className={inputClass}
                            value={tour.departure_location}
                            onChange={(e) => update('departure_location', e.target.value)}
                            placeholder="Lanka Lagoon Jetty, Negombo"
                        />
                    </Field>

                    <Field label="Group min">
                        <input
                            type="number"
                            min="1"
                            className={inputClass}
                            value={tour.group_min}
                            onChange={(e) => update('group_min', e.target.value)}
                            placeholder="2"
                        />
                    </Field>

                    <Field label="Group max">
                        <input
                            type="number"
                            min="1"
                            className={inputClass}
                            value={tour.group_max}
                            onChange={(e) => update('group_max', e.target.value)}
                            placeholder="12"
                        />
                    </Field>

                    <Field label="Age level">
                        <input
                            className={inputClass}
                            value={tour.age_level}
                            onChange={(e) => update('age_level', e.target.value)}
                            placeholder="All ages welcome"
                        />
                    </Field>

                    <Field label="Fitness level">
                        <input
                            className={inputClass}
                            value={tour.fitness}
                            onChange={(e) => update('fitness', e.target.value)}
                            placeholder="Low — mostly seated"
                        />
                    </Field>
                </Section>

                {/* Details (highlights) */}
                <Section title="Highlights" hint="Short bullet points describing the experience.">
                    <ListEditor
                        items={tour.details}
                        onChange={(i, v) => updateListItem('details', i, v)}
                        onAdd={() => addListItem('details')}
                        onRemove={(i) => removeListItem('details', i)}
                        placeholder="We push off from the jetty while the stilt fishermen are still out…"
                    />
                </Section>

                {/* Included */}
                <Section title="What's included">
                    <ListEditor
                        items={tour.included}
                        onChange={(i, v) => updateListItem('included', i, v)}
                        onAdd={() => addListItem('included')}
                        onRemove={(i) => removeListItem('included', i)}
                        placeholder="Life jackets"
                    />
                </Section>

                {/* Gallery */}
                <Section title="Gallery" hint="Image paths shown on the tour detail page.">
                    <ListEditor
                        items={tour.gallery}
                        onChange={(i, v) => updateListItem('gallery', i, v)}
                        onAdd={() => addListItem('gallery')}
                        onRemove={(i) => removeListItem('gallery', i)}
                        placeholder="/images/tours/mangrove-1.jpg"
                    />
                </Section>

                {/* Itinerary */}
                <Section title="Itinerary" hint="The timed stops shown on the tour timeline.">
                    <div className="space-y-4">
                        {tour.itinerary.map((stop, i) => (
                            <div
                                key={i}
                                className="rounded-2xl border border-[#EDE4D3] bg-[#FBF8F1] p-4 space-y-3"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-xs uppercase tracking-wide text-[#146B72]">
                                        Stop {i + 1}
                                    </span>
                                    {tour.itinerary.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeStop(i)}
                                            className="text-xs text-[#E76F51] hover:text-[#C4573B]"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <input
                                        className={inputClass}
                                        value={stop.title}
                                        onChange={(e) => updateStop(i, 'title', e.target.value)}
                                        placeholder="Depart the jetty"
                                    />
                                    <input
                                        className={inputClass}
                                        value={stop.time}
                                        onChange={(e) => updateStop(i, 'time', e.target.value)}
                                        placeholder="0:00"
                                    />
                                    <input
                                        className={`${inputClass} sm:col-span-1`}
                                        value={stop.copy}
                                        onChange={(e) => updateStop(i, 'copy', e.target.value)}
                                        placeholder="Board and set off along calm morning waters."
                                    />
                                </div>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addStop}
                            className="text-sm text-[#146B72] hover:text-[#0B3D3E] font-medium"
                        >
                            + Add itinerary stop
                        </button>
                    </div>
                </Section>

                {/* Submit */}
                <div className="flex items-center gap-4 pt-2 pb-10">
                    <button
                        type="submit"
                        disabled={saving}
                        className="rounded-full bg-[#E76F51] text-white px-6 py-2.5 text-sm font-medium hover:bg-[#C4573B] transition-colors disabled:opacity-60"
                    >
                        {saving ? 'Saving…' : 'Save tour'}
                    </button>
                    {saved && (
                        <span className="text-sm text-[#588157]">{message}</span>
                    )}
                </div>
            </form>
        </AdminLayout>
    )
}

const inputClass =
    'w-full rounded-xl border border-[#EDE4D3] bg-white px-3.5 py-2.5 text-sm text-[#16302E] placeholder:text-[#A9B8B5] focus:outline-none focus:ring-2 focus:ring-[#146B72]/30 focus:border-[#146B72]'

function Section({
    title,
    hint,
    children,
}: {
    title: string
    hint?: string
    children: React.ReactNode
}) {
    return (
        <div className="rounded-2xl bg-white border border-[#EDE4D3] p-6 shadow-sm">
            <div className="mb-4">
                <h2 className="font-display text-lg text-[#16302E]">{title}</h2>
                {hint && <p className="text-xs text-[#4A625F] mt-0.5">{hint}</p>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
        </div>
    )
}

function Field({
    label,
    hint,
    required,
    full,
    children,
}: {
    label: string
    hint?: string
    required?: boolean
    full?: boolean
    children: React.ReactNode
}) {
    return (
        <label className={`block ${full ? 'sm:col-span-2' : ''}`}>
            <span className="block text-sm font-medium text-[#16302E] mb-1.5">
                {label}
                {required && <span className="text-[#E76F51]"> *</span>}
            </span>
            {children}
            {hint && <span className="block text-xs text-[#4A625F] mt-1">{hint}</span>}
        </label>
    )
}

function ListEditor({
    items,
    onChange,
    onAdd,
    onRemove,
    placeholder,
}: {
    items: string[]
    onChange: (index: number, value: string) => void
    onAdd: () => void
    onRemove: (index: number) => void
    placeholder?: string
}) {
    return (
        <div className="sm:col-span-2 space-y-2">
            {items.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                    <input
                        className={inputClass}
                        value={item}
                        onChange={(e) => onChange(i, e.target.value)}
                        placeholder={placeholder}
                    />
                    {items.length > 1 && (
                        <button
                            type="button"
                            onClick={() => onRemove(i)}
                            className="text-[#E76F51] hover:text-[#C4573B] text-sm px-2"
                            aria-label="Remove"
                        >
                            ✕
                        </button>
                    )}
                </div>
            ))}
            <button
                type="button"
                onClick={onAdd}
                className="text-sm text-[#146B72] hover:text-[#0B3D3E] font-medium"
            >
                + Add
            </button>
        </div>
    )
}

function GuestPricingEditor({
    items,
    onChange,
    onAdd,
    onRemove,
}: {
    items: { guest_count: string; price: string }[]
    onChange: (index: number, key: 'guest_count' | 'price', value: string) => void
    onAdd: () => void
    onRemove: (index: number) => void
}) {
    return (
        <div className="sm:col-span-2 space-y-2">
            {items.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                    <input
                        type="number"
                        min="1"
                        className={inputClass}
                        value={item.guest_count}
                        onChange={(e) => onChange(i, 'guest_count', e.target.value)}
                        placeholder="Guests"
                    />
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        className={inputClass}
                        value={item.price}
                        onChange={(e) => onChange(i, 'price', e.target.value)}
                        placeholder="Price"
                    />
                    {items.length > 1 && (
                        <button
                            type="button"
                            onClick={() => onRemove(i)}
                            className="text-[#E76F51] hover:text-[#C4573B] text-sm px-2"
                            aria-label="Remove"
                        >
                            ✕
                        </button>
                    )}
                </div>
            ))}
            <button
                type="button"
                onClick={onAdd}
                className="text-sm text-[#146B72] hover:text-[#0B3D3E] font-medium"
            >
                + Add pricing tier
            </button>
        </div>
    )
}