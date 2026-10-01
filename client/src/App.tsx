import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { useTodos } from "./hooks/useTodos";

function App() {
  const { todos, isLoading, addTodo, editTodo, toggleTodo, removeTodo } =
    useTodos();

  return (
    <div className="min-h-screen bg-black">
      <main className="mx-auto max-w-2xl px-4 py-10 shadow-md">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-white">TODO App</h1>
        </header>

        <section className="mb-6 bg-gray-800 p-4 shadow-sm">
          <TodoForm onSubmit={addTodo} />
        </section>
        {isLoading ? (
          <p>Loading TODOs...</p>
        ) : (
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onUpdate={editTodo}
            onDelete={removeTodo}
          />
        )}
      </main>
    </div>
  );
}

export default App;
