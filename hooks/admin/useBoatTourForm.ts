'use client'

import { useState } from 'react'
import type { BoatTourForm, ItineraryStop, GuestPricing } from '@/lib/types/api/admin'
import type { Package } from '@/lib/types/api/tour_packages'

export function createEmptyBoatTour(status = 'ACTIVE'): BoatTourForm {
    return {
        id: '',
        title: '',
        currency: '$',
        tagline: '',
        description: '',
        duration: '',
        price: '',
        image: '',
        tag: '',
        type: '',
        departures: '',
        departure_details: '',
        group_min: '',
        group_max: '',
        age_level: '',
        fitness: '',
        departure_location: '',
        summary: '',
        details: [''],
        itinerary: [{ title: '', time: '', copy: '' }],
        included: [''],
        gallery: [''],
        guest_pricing: [{ guest_count: '', price: '' }],
        status,
    }
}

export function slugify(value: string) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
}

export function normalizeBoatTour(data: Package | null | undefined, fallback?: BoatTourForm): BoatTourForm {
    if (!data) {
        return fallback ?? createEmptyBoatTour()
    }

    const record = data as unknown as Record<string, unknown>

    const asString = (key: string, fallbackValue = ''): string => {
        const value = record[key]
        return typeof value === 'string' ? value : fallbackValue
    }

    const asStringArray = (key: string): string[] => {
        const value = record[key]
        return Array.isArray(value) && value.every((item) => typeof item === 'string') ? value as string[] : ['']
    }

    const asItineraryStops = (key: string): ItineraryStop[] => {
        const value = record[key]
        const isValidStop = (item: unknown): item is ItineraryStop => {
            return typeof item === 'object' && item !== null && 'title' in item && 'time' in item && 'copy' in item
        }

        return Array.isArray(value) && value.every(isValidStop) ? value as ItineraryStop[] : [{ title: '', time: '', copy: '' }]
    }

    const asGuestPricing = (key: string): GuestPricing[] => {
        const value = record[key]
        const isValidPricing = (item: unknown): item is GuestPricing => {
            return typeof item === 'object' && item !== null && 'guest_count' in item && 'price' in item
        }

        const toFormPricing = (p: unknown): GuestPricing => {
            const rec = p as Record<string, unknown>
            return {
                guest_count: typeof rec.guest_count === 'number' ? String(rec.guest_count) : '',
                price: typeof rec.price === 'number' ? String(rec.price) : '',
            }
        }

        return Array.isArray(value) && value.every(isValidPricing)
            ? value.map(toFormPricing)
            : [{ guest_count: '', price: '' }]
    }

    return {
        id: asString('slug', typeof data.id === 'string' ? data.id : ''),
        title: asString('title'),
        currency: asString('currency', '$'),
        tagline: asString('tagline'),
        description: asString('description'),
        duration: asString('duration'),
        price: record.price !== undefined && record.price !== null ? String(record.price) : '',
        image: asString('image'),
        tag: asString('tag'),
        type: asString('type'),
        departures: asString('departures'),
        departure_details: asString('departure_details'),
        group_min: record.group_min !== undefined && record.group_min !== null ? String(record.group_min) : '',
        group_max: record.group_max !== undefined && record.group_max !== null ? String(record.group_max) : '',
        age_level: asString('age_level'),
        fitness: asString('fitness'),
        departure_location: asString('departure_location'),
        summary: asString('summary'),
        details: asStringArray('details'),
        itinerary: asItineraryStops('itinerary'),
        included: asStringArray('included'),
        gallery: asStringArray('gallery'),
        guest_pricing: asGuestPricing('guest_pricing'),
        status: asString('status', 'ACTIVE'),
    }
}

export function buildBoatTourPayload(tour: BoatTourForm) {
    return {
        ...tour,
        price: Number(tour.price) || 0,
        group_min: Number(tour.group_min) || 0,
        group_max: Number(tour.group_max) || 0,
        guest_pricing: tour.guest_pricing
            .filter((p) => p.guest_count.trim() !== '' && p.price.trim() !== '')
            .map((p) => ({
                guest_count: Number(p.guest_count) || 0,
                price: Number(p.price) || 0,
            })),
        details: tour.details.filter((d) => d.trim() !== ''),
        included: tour.included.filter((d) => d.trim() !== ''),
        gallery: tour.gallery.filter((d) => d.trim() !== ''),
        itinerary: tour.itinerary.filter((s) => s.title.trim() !== '' || s.copy.trim() !== ''),
    }
}

export function useBoatTourForm(initialStatus = 'ACTIVE') {
    const [tour, setTour] = useState<BoatTourForm>(createEmptyBoatTour(initialStatus))
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})

    const update = <K extends keyof BoatTourForm>(field: K, value: BoatTourForm[K]) => {
        setTour((prev) => ({ ...prev, [field]: value }))
        setSaved(false)
    }

    const updateListItem = (field: 'details' | 'included' | 'gallery', index: number, value: string) => {
        const next = [...tour[field]]
        next[index] = value
        update(field, next)
    }

    const addListItem = (field: 'details' | 'included' | 'gallery') => {
        update(field, [...tour[field], ''])
    }

    const removeListItem = (field: 'details' | 'included' | 'gallery', index: number) => {
        const next = tour[field].filter((_, i) => i !== index)
        update(field, next.length ? next : [''])
    }

    const updateGuestPricing = (index: number, key: 'guest_count' | 'price', value: string) => {
        const next = tour.guest_pricing.map((p, i) => (i === index ? { ...p, [key]: value } : p))
        update('guest_pricing', next)
    }

    const addGuestPricing = () => {
        update('guest_pricing', [...tour.guest_pricing, { guest_count: '', price: '' }])
    }

    const removeGuestPricing = (index: number) => {
        const next = tour.guest_pricing.filter((_, i) => i !== index)
        update('guest_pricing', next.length ? next : [{ guest_count: '', price: '' }])
    }

    const updateStop = (index: number, key: keyof ItineraryStop, value: string) => {
        const next = tour.itinerary.map((stop, i) => (i === index ? { ...stop, [key]: value } : stop))
        update('itinerary', next)
    }

    const addStop = () => {
        update('itinerary', [...tour.itinerary, { title: '', time: '', copy: '' }])
    }

    const removeStop = (index: number) => {
        const next = tour.itinerary.filter((_, i) => i !== index)
        update('itinerary', next.length ? next : [{ title: '', time: '', copy: '' }])
    }

    const handleTitleChange = (value: string) => {
        setTour((prev) => ({
            ...prev,
            title: value,
            id: prev.id === '' || prev.id === slugify(prev.title) ? slugify(value) : prev.id,
        }))
        setSaved(false)
    }

    const buildPayload = () => buildBoatTourPayload(tour)

    return {
        tour,
        setTour,
        saving,
        setSaving,
        saved,
        setSaved,
        errors,
        setErrors,
        update,
        updateListItem,
        addListItem,
        removeListItem,
        updateStop,
        addStop,
        removeStop,
        updateGuestPricing,
        addGuestPricing,
        removeGuestPricing,
        handleTitleChange,
        buildPayload,
    }
}
