"use client";

import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const UserAction = ({ data }) => {
  const router = useRouter();

  const activeUser = async (id) => {
    try {
      const response = await fetch(`/api/users/active?userId=${id}`);
      const result = await response.json();
      if (result.status === "success") {
        toast.success(`${result["data"]}`)
        router.push("/admin/users");

      } else{
        toast.error(`${result["data"]}`)

      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deactiveUser = async (id) => {
    try {
      const response = await fetch(`/api/users/deactive?userId=${id}`);
      const result = await response.json();
      if (result.status === "success") {
        toast.success(`${result["data"]}`)
        router.push("/admin/users");

        
      } else{
        toast.error(`${result["data"]}`)

      }
    } catch (error) {
      toast.error("You are logged in successfully.")
    }
  };

  return (
    <CardContent className="font-bold flex flex-col">
      <p>{data?.["active"] ? "Activated" : "Deactivated"} </p>
      {data?.["active"] ? (
        <Button variant="destructive" onClick={() => deactiveUser(data["id"])}>
          Deactive
        </Button>
      ) : (
        <Button onClick={() => activeUser(data["id"])}>Active</Button>
      )}
    </CardContent>
  );
};

export default UserAction;