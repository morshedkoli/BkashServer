import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";


interface DashboardCardProps {
    title: string;
    count:number;
    icon: React.ReactElement<LucideIcon>
    color: string;
}

const DashboardCard = ({title, count,icon,color}: DashboardCardProps) => {
    return ( 
        <Card className={`${color} dark:bg-slate-800 p-4 pb-0`}>
            <CardContent>
                <h3 className="text-3xl text-center  mb-4 font-bold text-slate-500 dark:to-slate-200">{title}</h3>

                <div className="flex gap-5 justify-center items-center">
                    {icon}
                    <h3 className="text-5xl font-semibold text-slate-500 dark:text-slate-200">{count}</h3>
                </div>
            </CardContent>

        </Card>
     );
}
 
export default DashboardCard;