import TodoFloatings from "../_components/todo-floatings";
import { getTodos } from "../_apis/todo";
import TodoCard from "../_components/todo-card";

const HomePage = async () => {
  const result = await getTodos();
  return (
    <>
      {result.data?.todos.map((todo) => {
        return (
          <TodoCard
            id={todo.id}
            title={todo.title}
            link={todo.link}
            createdAt={todo.createdAt}
            key={todo.id}
          />
        );
      })}
      <TodoFloatings />
    </>
  );
};

export default HomePage;
