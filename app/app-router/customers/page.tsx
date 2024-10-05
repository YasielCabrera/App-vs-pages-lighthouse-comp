import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { getCustomers } from '@/lib/db';

export default async function CustomersPage() {
  const { customers } = await getCustomers();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customers</CardTitle>
        <CardDescription>View all customers and their orders.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 font-bold">This is just a test page</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
          {customers.map((customer) => (
            <Card
              key={customer.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader>
                <CardTitle className="text-lg">{customer.name}</CardTitle>
                <CardDescription>Customer Details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">Email:</span>
                    <span>{customer.email}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">Phone:</span>
                    <span>{customer.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">Orders:</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {customer.orders}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
