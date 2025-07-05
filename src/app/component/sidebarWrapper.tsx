import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-md p-4 h-screen">
      <h2 className="text-xl font-bold mb-6">Kalavauna Restaurant</h2>
      <ul className="space-y-2">
        <li>
          <Link href="/" className="text-gray-600 hover:text-blue-600">Overview</Link>
        </li>
        <li>
          <Link href="/dashboard" className="text-gray-600 hover:text-blue-600">Customer List</Link>
        </li>
        <li>
          <Link href="/food-menu" className="text-gray-600 hover:text-blue-600">Food Menu</Link>
        </li>
        <li>
          <Link href="/order" className="text-gray-600 hover:text-blue-600">Order</Link>
        </li>
        <li>
          <Link href="/sales" className="text-gray-600 hover:text-blue-600">Sales</Link>
        </li>
        <li>
          <Link href="/wallet" className="text-gray-600 hover:text-blue-600">Wallet</Link>
        </li>
        <li>
          <Link href="/reviews" className="text-gray-600 hover:text-blue-600">Reviews & Rating</Link>
        </li>
        <li>
          <Link href="/advertisement" className="text-gray-600 hover:text-blue-600">Advertisement</Link>
        </li>
      </ul>
    </div>
  );
}