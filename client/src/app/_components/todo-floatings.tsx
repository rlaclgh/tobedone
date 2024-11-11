"use client";
import AddTodoDialog from "./add-todo.dialog";
import InvalidateTodo from "./invalidate-todo";

const TodoFloatings = () => {
  return (
    <div className="fixed bottom-14 h-8 right-auto w-full max-w-[450px] flex justify-end pr-4 gap-2">
      <div className="w-8 h-8 bg-black rounded-full flex justify-center items-center cursor-pointer">
        <InvalidateTodo />
      </div>
      <div className="w-8 h-8 bg-black rounded-full flex justify-center items-center cursor-pointer">
        <AddTodoDialog />
      </div>
    </div>
  );
};

export default TodoFloatings;
