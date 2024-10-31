// app/components/Sidebar.tsx
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="bg-blue-600 w-64 p-4">
      <h1 className="font-bold mb-4">WeCommmit</h1>
      <ul className="space-y-4"> {/* Added space-y-4 for more spacing between items */}
        <li>
          <Link href="/dashboard" className="text-white hover:underline">DashBoard</Link>
        </li>
        <li>
          <Link href="/teams/teamlist" className="text-white hover:underline">Team List</Link>
        </li>
      </ul>
    </aside>
  );
}
