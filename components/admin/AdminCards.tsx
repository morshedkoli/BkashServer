"use client"
import { CheckCheck, Hand, RefreshCcw, SquareCheckBig } from "lucide-react";
import DashboardCard from "../dashboard/DashboardCard";
import useSWR from 'swr'



const AdminCards =  () => {
  const fetcher = (url: string) => fetch(url).then(res => res.json());


  const { data:allTransaction, error, isLoading } = useSWR('/api/transection/admin/all', fetcher)
  const { data:pendings } = useSWR('/api/transection/admin/pending', fetcher)
  const { data:accepted } = useSWR('/api/transection/admin/accepted', fetcher)
  const { data:today } = useSWR('/api/transection/admin/todayComplete', fetcher)
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>


  return (
    <div className="flex flex-wrap justify-around items-center gap-2 p-8">

      <DashboardCard
        title="Pending"
        color="bg-red-200"
        count={pendings?.['data'].length}
        icon={<RefreshCcw size={40} strokeWidth={3} />}
      />
      <DashboardCard
        title="Accepted"
        color="bg-orange-300"
        count={accepted?.['data'].length}
        icon={<Hand size={40} strokeWidth={3} />}
      />
      <DashboardCard
        title="Today Complete"
        color="bg-green-200"
        count={today?.['data'].length}
        icon={<CheckCheck size={40} strokeWidth={3} />}
      />
      <DashboardCard
        title="Completed"
        color="bg-green-400"
        count={allTransaction?.['data'].length}
        icon={<SquareCheckBig size={40} strokeWidth={3} />}
      />
    </div>
  );
};






export default AdminCards;