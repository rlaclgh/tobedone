import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Plus } from "lucide-react";

const Todo = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">
          <Plus />
          <Check /> Mark all as read
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Todo;
