import AddTodoDialog from "./add-todo.dialog";

const AddTodo = () => {
  return (
    <div className="fixed bottom-14 h-8 right-auto w-full max-w-[450px] flex justify-end pr-4">
      <div className="w-8 h-8 bg-black rounded-full flex justify-center items-center cursor-pointer">
        <AddTodoDialog />
      </div>
    </div>
  );
};

export default AddTodo;
