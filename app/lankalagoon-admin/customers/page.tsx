import AdminLayout from "@/components/ui/AdminLayout";

export default function AdminCustomers() {
    return (
        <AdminLayout>
            <div className="p-6">
                <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
                <p className="mt-2 text-sm text-gray-600">View all your customers here.</p>
            </div>
        </AdminLayout>
    )
}