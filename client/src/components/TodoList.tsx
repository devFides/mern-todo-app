import type { Todo, TodoPayload } from "../interfaces/todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => Promise<void>;
  onUpdate: (id: string, payload: TodoPayload) => Promise<boolean>;
  onDelete: (id: string) => Promise<void>;
}

function TodoList({ todos, onToggle, onUpdate, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <p className="py-6 text-center text-gray-500">
        No TODOs yet. Add your first one above.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TodoList;
