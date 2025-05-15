import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import EditTodo from './EditTodo';
import { useNavigate, useLocation } from 'react-router-dom';

export interface Todo {
  id: number;
  title: string;
  description?: string;
  datetime?: string;
  completed: boolean;
  priority?: boolean;
}

interface Props {
  username: string;
}

const TodoList: React.FC<Props> = ({ username }) => {
  const dummyTodos: Todo[] = [
    {
      id: 1,
      title: 'Learn React',
      description: 'Understand basics and hooks',
      datetime: '2025-05-20T18:00',
      completed: false,
      priority: false,
    },
    {
      id: 2,
      title: 'Build a TODO app',
      description: 'Create features and UI',
      datetime: '2025-05-22T14:00',
      completed: false,
      priority: false,
    },
    {
      id: 3,
      title: 'Deploy the app',
      description: 'Publish on hosting platform',
      datetime: '2025-05-25T16:00',
      completed: false,
      priority: false,
    },
    {
      id: 4,
      title: 'Learn TypeScript',
      description: 'Understand types and interfaces',
      datetime: '2025-05-30T10:00',
      completed: false,
      priority: false,
    },
    

   
  ];

  const [todos, setTodos] = useState<Todo[]>([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const currentLocation = useLocation();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
    if (storedTodos.length > 0) {
      setTodos(storedTodos);
    } else {
      setTodos(dummyTodos);
      localStorage.setItem('todos', JSON.stringify(dummyTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (newTodo: {
    title: string;
    description: string;
    deadline: string;
    priority: boolean;
  }) => {
    const newId = todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1;
    const todoToAdd: Todo = {
      id: newId,
      title: newTodo.title,
      description: newTodo.description,
      datetime: newTodo.deadline,
      completed: false,
      priority: newTodo.priority,
    };
    setTodos([...todos, todoToAdd]);
    setAddModalOpen(false);
  };

  const handleTodoCompletion = (id: number) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );
    setTodos(updatedTodos);
  };

  const handleEdit = (todo: Todo) => {
    console.log('Edit todo:', todo);
    navigate(`/edit/${todo.id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('todos');
    window.location.reload();
  };

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navbar */}
      <nav className="flex flex-wrap justify-between items-center px-4 sm:px-6 py-3 shadow-md sticky top-0 bg-white z-10">
        <div className="flex flex-wrap items-center space-x-3 sm:space-x-6">
          <button
            onClick={handleLogout}
            className="text-black hover:text-yellow-400 transition font-semibold"
          >
            Logout
          </button>

          <button
            onClick={() => navigate('/')}
            className={`flex items-center transition ${
              currentLocation.pathname === '/'
                ? 'text-yellow-400'
                : 'text-black hover:text-yellow-400'
            }`}
            title="Home"
            aria-label="Home"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-5H9v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2z" />
            </svg>
            Home
          </button>

          <button
            onClick={() => setAddModalOpen(true)}
            className="text-black hover:text-yellow-400 transition flex items-center"
            title="Add Task"
            aria-label="Add Task"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add
          </button>

          <button
            onClick={() => navigate('/completed')}
            className="text-black hover:text-yellow-400 transition flex items-center"
            title="Completed Tasks"
            aria-label="Completed Tasks"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Tasks
          </button>
        </div>

        <div className="flex-1 max-w-full sm:max-w-md mx-2 sm:mx-4 mt-3 sm:mt-0">
          <input
            type="search"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-yellow-400 focus:ring-2 focus:ring-yellow-400"
            aria-label="Search tasks"
          />
        </div>

        <div className="flex space-x-4 items-center mt-3 sm:mt-0">
          <button
            className="text-black hover:text-yellow-400 transition"
            title="Notifications"
            aria-label="Notifications"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6 6 0 1 0-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9" />
            </svg>
          </button>

          <button
            className="text-black hover:text-yellow-400 transition"
            title="Profile"
            aria-label="Profile"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="7" r="4" />
              <path d="M5.5 21a8.38 8.38 0 0 1 13 0" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Greeting */}
      <section className="px-4 sm:px-6 py-6">
        <h1 className="text-3xl font-semibold mb-1">Hello, {username} 👋</h1>
        <p className="text-gray-600 mb-6">
          Let's get started keeping your tasks organized.
        </p>
      </section>

      {/* Todo list */}
      <section className="px-4 sm:px-6 pb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {filteredTodos.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center">No tasks found.</p>
        ) : (
          filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onTodoCompletion={handleTodoCompletion}
              onEdit={handleEdit}
            />
          ))
        )}
      </section>

      {/* Add Todo Modal */}
      <AddTodo isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} addTodo={addTodo} />
    </div>
  );
};

export default TodoList;
