// Dashboard.jsx - Main component to display user profile and recent orders
import Link from "next/link";
import Image from "next/image";
import OrderRow from "./OrderRow";

export const metadata = {
  title: "Account",
  description: "Account page",
}
export default function Dashboard() {
  return (
    <div className="max-h-fit ">
      <div className="container mx-auto px-4 ">
        <div className="grid grid-cols-1 gap-6">
          {/* Navigation Sidebar */}
          <div className="md:col-span-1">
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-2 space-y-6">
            {/* User Profile */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-24 h-24 mb-4">
                  <Image
                    src="/profile-placeholder.jpg"
                    alt="Profile Picture"
                    className="rounded-full object-cover"
                    fill
                  />
                </div>
                <h2 className="text-xl font-semibold">Dianne Russell</h2>
                <p className="text-gray-500 text-sm">Customer</p>
                <button className="mt-2 text-green-500 text-sm font-medium">
                  Edit Profile
                </button>
              </div>

              <div className="space-y-2">
                <h3 className="text-gray-500 uppercase text-xs font-medium tracking-wider">
                  Billing Address
                </h3>
                <h4 className="font-medium">Dianne Russell</h4>
                <p className="text-gray-700 text-sm">
                  4140 Parker Rd, Allentown, New Mexico 31134
                </p>
                <p className="text-gray-700 text-sm">
                  dianne.russell@gmail.com
                </p>
                <p className="text-gray-700 text-sm">(671) 555-0110</p>
                <button className="text-green-500 text-sm font-medium">
                  Edit Address
                </button>
              </div>
            </div>

            {/* Recent Order History */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 flex justify-between items-center">
                <h3 className="font-semibold text-lg">Recent Order History</h3>
                <Link
                  href="/orders"
                  className="text-green-500 text-sm font-medium"
                >
                  View All
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 text-left">
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <OrderRow
                      id="#738"
                      date="8 Sep, 2020"
                      total="$135.00 (5 Products)"
                      status="Processing"
                    />
                    <OrderRow
                      id="#703"
                      date="24 May, 2020"
                      total="$25.00 (1 Product)"
                      status="on the way"
                    />
                    <OrderRow
                      id="#130"
                      date="22 Oct, 2020"
                      total="$250.00 (4 Products)"
                      status="Completed"
                    />
                    <OrderRow
                      id="#561"
                      date="1 Feb, 2020"
                      total="$35.00 (1 Products)"
                      status="Completed"
                    />
                    <OrderRow
                      id="#536"
                      date="21 Sep, 2020"
                      total="$578.00 (13 Products)"
                      status="Completed"
                    />
                    <OrderRow
                      id="#492"
                      date="22 Oct, 2020"
                      total="$345.00 (7 Products)"
                      status="Completed"
                    />
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Navigation Sidebar Component
