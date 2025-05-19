import React, { useState, useEffect, useRef } from 'react';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios'; // 
import api from '../api/axios';
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
  const colors = [
  "bg-red-400", "bg-green-400", "bg-blue-400", "bg-purple-400", "bg-yellow-400",
  "bg-pink-400", "bg-teal-400", "bg-orange-400", "bg-indigo-400",
];

function getRandomColor(seed: string): string {
  const hash = Array.from(seed).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
}

  const [todos, setTodos] = useState<Todo[]>([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const currentLocation = useLocation();
  const [animateTabs, setAnimateTabs] = useState(false);
  const allCount = todos.length;
const completedCount = todos.filter(todo => todo.completed).length;
const pendingCount = todos.filter(todo => !todo.completed).length;
 const [successMessage, setSuccessMessage] = useState('');
const [showAccountPanel, setShowAccountPanel] = useState(false);
const accountRef = useRef<HTMLDivElement>(null);

const usernames = localStorage.getItem("username") || "Guest";
const avatarBg = getRandomColor(username);
const firstLetter = username.charAt(0).toUpperCase();



 const [showTaskTabs, setShowTaskTabs] = useState(() => {
  return localStorage.getItem('showTaskTabs') === 'true';
});

 const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>(() => {
  const savedFilter = localStorage.getItem('filter');
  return savedFilter === 'pending' || savedFilter === 'completed' ? savedFilter : 'all';
});
useEffect(() => {
  function handleClickOutside(event: MouseEvent) {
    if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
      setShowAccountPanel(false);
    }
  }

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);

  useEffect(() => {
  localStorage.setItem('showTaskTabs', showTaskTabs.toString());
}, [showTaskTabs]);

useEffect(() => {
  localStorage.setItem('filter', filter);
}, [filter]);
   useEffect(() => {
  if (showTaskTabs) {
    setAnimateTabs(true);
    const timer = setTimeout(() => setAnimateTabs(false), 500); // animation duration
    return () => clearTimeout(timer);
  }
}, [showTaskTabs, filter]);
  useEffect(() => {
  if (successMessage) {
    const timer = setTimeout(() => setSuccessMessage(''), 4000);
    return () => clearTimeout(timer);
  }
}, [successMessage]);

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
   useEffect(() => {
  const message = localStorage.getItem('editSuccessMessage');
  if (message) {
    setSuccessMessage(message);
    localStorage.removeItem('editSuccessMessage');

    setTimeout(() => {
      setSuccessMessage('');
    }, 2000);
  }
}, []);

  const addTodo = async (newTodo: {
  title: string;
  description: string;
  deadline: string;
  priority: boolean;
}) => {
  try {
    // Format the deadline before sending
    const formattedDeadline = newTodo.deadline.includes('T') 
      ? newTodo.deadline 
      : newTodo.deadline.replace(' ', 'T');

    const response = await api.post('/todos', {
      title: newTodo.title,
      description: newTodo.description,
      deadline: formattedDeadline, // Send pre-formatted value
      priority: newTodo.priority
    });
    
    // ... rest of your success handling
  } catch (error) {
    console.error('Full error:', error);
    if (typeof error === 'object' && error !== null && 'response' in error) {
      const err = error as { response: { data: { error?: string } } };
      console.error('Backend response:', err.response.data);
      setSuccessMessage(err.response.data.error || 'Failed to add task');
    } else {
      setSuccessMessage('Network error - could not reach server');
    }
  }
};
 const fetchTodos = async () => {
  try {
    const response = await api.get('/todos');
    return response.data.data.map((todo: any) => ({
      id: todo._id,
      title: todo.title,
      description: todo.description,
      datetime: todo.datetime,
      completed: todo.completed,
      priority: todo.priority
    }));
  } catch (error) {
    console.error('Error fetching todos:', error);
    return [];
  }
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

  const filteredTodos = todos
  .filter(todo =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  });


  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navbar */}
      <nav className="flex items-center px-4 py-3 shadow-md sticky top-0 bg-white z-10">
        {/* MOBILE VIEW ICONS (Top Left) */}
        <div className="sm:hidden flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigate('/account')}
              className="text-black hover:text-yellow-400 transition"
              title="Profile"
              aria-label="Profile">

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
          <div className="flex items-center space-x-2">
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
              title="Search"
              aria-label="Search"
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
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>
        </div>

        {/* LEFT SIDE (Desktop Buttons) */}
        <div className="hidden sm:flex items-center space-x-4">
          <button
              onClick={handleLogout}
              className="text-white bg-gradient-to-r from-yellow-400 to-orange-400 px-4 py-1.5 rounded-full shadow hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold"
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
            onClick={() => setShowTaskTabs(true)}
            className="text-black hover:text-yellow-400 transition flex items-center"
            title="Tasks"
            aria-label="Tasks">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24">
           <polyline points="20 6 9 17 4 12" />
          </svg>
  Task</button>
        </div>
        

        

        {/* CENTER - Search Input (Hidden on mobile, Centered & Shorter on Desktop) */}
        <div className="hidden sm:flex justify-center w-full">
  <div className="relative w-full max-w-md">
    <input
      type="search"
      placeholder="Search tasks..."
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      className="w-full rounded-full pl-10 pr-4 py-2 bg-white text-black shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-400 transition-all"
      aria-label="Search tasks"
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  </div>
</div>


        {/* RIGHT SIDE (Notification and Account Icons on Desktop) */}
        <div className="hidden sm:flex items-center space-x-4">
          {/* Notification Icon */}
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

          {/* Account Icon */}
          <button
  onClick={() => setShowAccountPanel(!showAccountPanel)}
  className="w-8 h-8 rounded-full flex items-center justify-center font-semibold text-white shadow hover:opacity-90 transition duration-200"
  style={{ backgroundColor: '#facc15' }} // optional: yellow-400 fallback
  title="Profile"
  aria-label="Profile"
>
  {usernames.charAt(0).toUpperCase()}
</button>

        </div>
      </nav>
      {showAccountPanel && (
    <div className="absolute right-0 mt-2 w-64 bg-white/80 backdrop-blur-md rounded-xl shadow-xl p-4 animate-fade-slide-down z-50">
      <p className="text-center font-semibold text-gray-800">{username}</p>
      <p className="text-center text-sm text-gray-500 mb-3">{username.toLowerCase()}@gmail.com</p>

      <div className="border-t border-gray-200 my-2"></div>

      {["Edit profile", "About us", "Privacy policy", "Settings"].map((item) => (
        <button
          key={item}
          className="block w-full text-left text-sm px-4 py-2 hover:bg-gray-100 rounded-md transition"
        >
          {item}
        </button>
      ))}

      <button
        onClick={handleLogout}
        className="w-full text-sm text-yellow-500 mt-3 hover:underline"
      >
        Logout
      </button>
    
    </div>
  
)}


      {/* Greeting */}
      {!showTaskTabs && (
      <section className="px-4 sm:px-6 py-6">
        <h1 className="text-3xl font-semibold mb-1">Hello, {username} 👋</h1>
        <p className="text-gray-600 mb-6">
          Let's get started keeping your tasks organized.
        </p>
      </section>)}
      {successMessage && (
  <div className="fixed top-16 left-1/2 transform -translate-x-1/2 bg-green-100 text-green-800 px-6 py-3 rounded-full shadow-md z-50 transition-all">
    {successMessage}
  </div>
)}

      {showTaskTabs && (
  <>
    {/* Back Button */}
    <div className="flex items-center mb-4 px-4 sm:px-6">
      <button
        onClick={() => {
          setShowTaskTabs(false);
          setFilter('all');
          localStorage.setItem('filter', 'all');
        }}
        className="flex items-center text-gray-600 hover:text-yellow-500 transition"
        aria-label="Back"
        title="Back"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Back
      </button>
    </div>

    {/* Tabs */}
    <div className="flex justify-center mb-6">
      <div className="flex space-x-6 border-b border-gray-200 text-sm sm:text-base font-semibold">
        <button
          onClick={() => setFilter('all')}
          className={`pb-2 transition ${
            filter === 'all'
              ? 'text-yellow-500 border-b-2 border-yellow-500'
              : 'text-gray-500 hover:text-yellow-500'
          }`}
        >
          All tasks ({allCount})
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`pb-2 transition ${
            filter === 'pending'
              ? 'text-yellow-500 border-b-2 border-yellow-500'
              : 'text-gray-500 hover:text-yellow-500'
          }`}
        >
          Pending ({pendingCount})
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`pb-2 transition ${
            filter === 'completed'
              ? 'text-yellow-500 border-b-2 border-yellow-500'
              : 'text-gray-500 hover:text-yellow-500'
          }`}
        >
          Completed ({completedCount})
        </button>
      </div>
    </div>
  </>
)}



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
      <AddTodo isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} addTodo={addTodo} onSuccessMessage={setSuccessMessage}/>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md flex justify-around py-2 sm:hidden">
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
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-5H9v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2z" />
          </svg>
        </button>

        <button
          onClick={() => setAddModalOpen(true)}
          className="text-black hover:text-yellow-400 transition flex items-center"
          title="Add Task"
          aria-label="Add Task"
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
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>

        <button
          onClick={() => navigate('/completed')}
          className="text-black hover:text-yellow-400 transition flex items-center"
          title="Completed Tasks"
          aria-label="Completed Tasks"
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
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TodoList