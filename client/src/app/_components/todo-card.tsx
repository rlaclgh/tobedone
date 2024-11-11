import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Todo } from "../_dtos/responses/get-todos.response.dto";
import { Link } from "lucide-react";
import { formatDate } from "../_utils/date";

/* eslint-disable @typescript-eslint/no-empty-object-type */
interface TodoCardProps extends Todo {}

const TodoCard = (props: TodoCardProps) => {
  const { id, title, link, createdAt } = props;
  return (
    <Card className="w-full mt-2 mb-2" key={id}>
      <CardHeader className="flex-row flex justify-between">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{formatDate(new Date(createdAt))}</CardDescription>
        </div>
        <a target="_blank" href={link} rel="noopener noreferrer">
          <Link />
        </a>
      </CardHeader>
    </Card>
  );
};

export default TodoCard;
