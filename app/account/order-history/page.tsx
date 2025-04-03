import OrderRow from "../OrderRow";

export const metadata = {
  title: "Orders",
  description: "Account Orders",
}

export function OrderHistory() {
  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1  gap-6">
          {/* Navigation Sidebar */}
          <div className="md:col-span-1"></div>

          {/* Order History Content */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6">
                <h3 className="font-semibold text-lg">Order History</h3>
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
                      id="#933"
                      date="4 April, 2021"
                      total="$135.00 (5 Products)"
                      status="Processing"
                    />
                    <OrderRow
                      id="#5045"
                      date="27 Mar, 2021"
                      total="$25.00 (1 Product)"
                      status="on the way"
                    />
                    <OrderRow
                      id="#5028"
                      date="20 Mar, 2021"
                      total="$250.00 (4 Products)"
                      status="Completed"
                    />
                    <OrderRow
                      id="#4100"
                      date="19 Mar, 2021"
                      total="$35.00 (1 Products)"
                      status="Completed"
                    />
                    <OrderRow
                      id="#4152"
                      date="18 Mar, 2021"
                      total="$578.00 (13 Products)"
                      status="Completed"
                    />
                    <OrderRow
                      id="#3915"
                      date="10 Mar, 2021"
                      total="$345.00 (7 Products)"
                      status="Completed"
                    />
                    <OrderRow
                      id="#3936"
                      date="5 Mar, 2021"
                      total="$560.00 (2 Products)"
                      status="Completed"
                    />
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 flex justify-center">
                <nav className="flex items-center space-x-1">
                  <button className="px-3 py-1 rounded-md border text-gray-500">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button className="px-3 py-1 rounded-md border bg-green-500 text-white">
                    1
                  </button>
                  <button className="px-3 py-1 rounded-md border text-gray-700">
                    2
                  </button>
                  <button className="px-3 py-1 rounded-md border text-gray-700">
                    3
                  </button>
                  <button className="px-3 py-1 rounded-md border text-gray-500">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;
