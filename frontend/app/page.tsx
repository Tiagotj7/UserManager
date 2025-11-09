import Image from "next/image";

import UserTable from '@/components/UserTable'

export default function Home() {
  return (
    <main className="p-6">
      <UserTable />
    </main>
  )
}

