"use client";
import Link from "next/link";
// Removed useState import
import { usePathname } from "next/navigation"; // Keep usePathname

function NavigationSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Removed useState for activeTab

  const navItems = [
    // Keep your navItems array the same
    // Ensure paths are accurate for comparison (e.g., exactly '/account', '/account/order-history')
    { name: "Dashboard", path: "/account", icon: "grid" },
    { name: "Order History", path: "/account/order-history", icon: "clock" },
    { name: "Wishlist", path: "/account/wishlist", icon: "heart" }, // Added example path
    { name: "Shopping Cart", path: "/cart", icon: "shopping-bag" }, // Added example path
    { name: "Settings", path: "/account/settings", icon: "settings" },
    { name: "Log-out", icon: "log-out" }, // Log-out might be a button/action, not a link path
  ];

  return (
    <div className=" mx-4 sm:mx-[5%] md:mx-[10%] grid grid-cols-4 min-h-screen py-5">
      {/* Sidebar (1/4 - Adjusted grid from 1/3 based on class) */}
      <div className="bg-white border border-gray-200 p-5 mt-5 col-span-1 max-h-fit rounded-2xl ">
        <h2 className="font-medium text-lg mb-4">Navigation</h2>
        <div className="flex flex-col gap-2">
          {navItems.map((item) => {
            // Determine if the current item is active by comparing its path with the current pathname
            // Make sure item.path exists before comparing
            const isActive = item.path && pathname === item.path;

            // Handle items that don't have a path (like Log-out) - maybe render as button?
            if (!item.path && item.name === "Log-out") {
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    /* Add your logout logic here */
                  }}
                  className="flex items-center gap-3 px-4 py-3 rounded-md transition text-gray-500 hover:bg-gray-100 w-full text-left"
                >
                  {/* SVG icon span */}
                  <span className="w-6 h-6 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       {item.icon === "log-out" && (
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                       )}
                    </svg>
                  </span>
                  <span>{item.name}</span>
                </button>
              );
            }

            // Render Link for items with paths
            return (
              <Link
                // Use item.path, provide a fallback like '#' if path could be undefined,
                // but ensure items intended as links *have* a path.
                href={item.path || "#"}
                key={item.name}
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition ${
                  // Apply active styles if isActive is true
                  isActive
                    ? "bg-green-50 text-green-600 border-l-4 border-green-500 font-medium" // Added font-medium for emphasis
                    : "text-gray-500 hover:bg-gray-100"
                }`}
                // Removed onClick handler
              >
                {/* SVG icon span */}
                <span className="w-6 h-6 flex items-center justify-center">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {/* Conditional rendering for SVG paths based on item.icon */}
                       {item.icon === "grid" && ( <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /> )}
                       {item.icon === "heart" && ( <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /> )}
                       {item.icon === "clock" && ( <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /> )}
                       {item.icon === "shopping-bag" && ( <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /> )}
                       {item.icon === "settings" && ( <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /> )}
                   </svg>
                </span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main Content (3/4) */}
      <div className="col-span-3 pl-5 ">{children}</div> {/* Added pl-5 for spacing */}
    </div>
  );
}

export default NavigationSidebar;