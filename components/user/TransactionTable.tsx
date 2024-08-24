import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Button } from "../ui/button";


interface transactionProps {
  id: string;
  number: string;
  amount: number;
  firstBalance: number;
  lastBalance: number;
  senderNumber: string;
  transectionId: string;
  type: string;
  status: string;

}


const TransactionTable: React.FC<{ transaction: transactionProps[] }> = ({transaction}) => {
  

  
  return ( 
        <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Number</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead >Status</TableHead>
            <TableHead >Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        
            { transaction?.map(trans=>(
              
              <TableRow key={trans.id}> 
              <TableCell className="font-semibold">
             {trans.number}
              </TableCell>
              <TableCell>
                <Input
                readOnly
                  defaultValue={trans.type}
                />
              </TableCell>
              <TableCell>
               
                <Input
                readOnly
                  type="number"
                  defaultValue={trans.amount}
                />
              </TableCell>
            
             <TableCell>
              <Button variant={trans.status==="pending"?'destructive':"outline"}>{trans.status}</Button>
             </TableCell>
             <TableCell>
             <Button>Details</Button>
             </TableCell>
            
            </TableRow>
            ))}
      
        </TableBody>
      </Table>
     );
}
 
export default TransactionTable;