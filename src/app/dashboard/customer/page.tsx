'use client';

import CustomerTable from "@/app/component/customerTable";

export default function Dashboard() {
  return (
    <div className="flex flex-col h-screen">
   
      <CustomerTable />
    </div>
  );
}