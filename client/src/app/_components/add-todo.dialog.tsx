"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import AddTodoForm from "./add-todo.form";
import { useState } from "react";

const AddTodoDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Plus color="white" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Todo 생성</DialogTitle>
          <DialogDescription>Todo를 생성해주세요.</DialogDescription>
        </DialogHeader>
        <AddTodoForm setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default AddTodoDialog;
