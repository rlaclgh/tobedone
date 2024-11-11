import { RotateCcw } from "lucide-react";
import { invalidateTodo } from "../_apis/todo";

const InvalidateTodo = () => {
  return (
    <RotateCcw
      color="white"
      onClick={async () => {
        await invalidateTodo();
      }}
    />
  );
};

export default InvalidateTodo;
