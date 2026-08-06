'use client'

import { useEffect, useState } from 'react'
import AdminLayout from '@/components/ui/AdminLayout'
import { useBoatTours } from '@/hooks/admin/useBoatTours'
import { Package } from '@/lib/types/api/tour_packages'

export default function AdminBoatTours() {
    const [tours, setTours] = useState<Package[]>([]);
    const { listTour, loading } = useBoatTours();

    useEffect(() => {

        const loadBoatTours = async () => {
            const response = await listTour();

            if (response) {
                setTours(response as Package[]);
            }
        }

        loadBoatTours();

    }, [])

    if (loading) {
        return (
            <AdminLayout>
                <div className="p-6 text-center">
                    Loading tours...
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">Boat Tours</h1>
                    <a href='/admin/boat-tours/create' className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                        + Add Tour
                    </a>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Duration
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Price
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Group
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {tours.map((tour) => (
                                <tr key={tour.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {tour.title}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {tour.duration}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {tour.currency} {tour.price}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        Min : {tour.group_min} - Max : {tour.group_max}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${tour.status === 'active'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                                }`}
                                        >
                                            {tour.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                                        <a href={`/admin/boat-tours/${tour.id}`} className="text-blue-600 hover:text-blue-800">
                                            Edit
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {tours.length === 0 && (
                        <div className="text-center py-12 text-gray-500 text-sm">
                            No tours found.
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    )
}