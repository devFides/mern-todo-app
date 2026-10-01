import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { useTodos } from "./hooks/useTodos";
import Notification from "./components/Notification";
import Spinner from "./components/Spinner";

function App() {
  const {
    todos,
    isLoading,
    notice,
    setNotice,
    loadTodos,
    addTodo,
    editTodo,
    toggleTodo,
    removeTodo,
  } = useTodos();

  const completedCount = todos.filter((todo) => todo.done).length;

  return (
    <div className="min-h-screen bg-black">
      {notice && (
        <Notification
          type={notice.type}
          message={notice.message}
          onDismiss={() => setNotice(null)}
          onRetry={notice.persistent ? loadTodos : undefined}
          autoDismissMs={notice.persistent ? 0 : 3000}
        />
      )}
      <main className="mx-auto max-w-2xl px-4 py-10 shadow-md">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-white">TODO App</h1>
          {!isLoading && todos.length > 0 && (
            <p className="mt-1 text-sm font-semibold text-orange">
              {completedCount} of {todos.length} completed
            </p>
          )}
        </header>

        <section className="mb-6 bg-gray-800 p-4 shadow-sm">
          <TodoForm onSubmit={addTodo} />
        </section>

        {isLoading ? (
          <Spinner label="Loading TODOs..." />
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
