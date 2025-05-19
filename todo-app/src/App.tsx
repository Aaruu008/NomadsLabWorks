import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import LoginPage from './components/LoginPage';
import GetStartedPage from './components/GetStartedPage';
import EditTodo from './components/EditTodo';
import './index.css';
import AccountPage from './components/AccountPage';
import { Todo } from './utils/types';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';


const App: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn && storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogin = (name: string) => {
    localStorage.setItem('username', name);
    localStorage.setItem('isLoggedIn', 'true');
    setUsername(name);
  };

  const addTodo = (todo: {
    title: string;
    description: string;
    deadline: string;
    priority: boolean;
  }) => {
    const storedTodos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');
    const newTodo: Todo = {
      id: Date.now(),
      title: todo.title,
      description: todo.description,
      deadline: todo.deadline,
      priority: todo.priority,
      completed: false
    };
    storedTodos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(storedTodos));
  };

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<GetStartedPage />} />
          <Route path="/login" element={<LoginPage setUsername={handleLogin} />} />
          <Route
            path="/todos"
            element={
              username ? (
                <TodoList username={username} />
              ) : (
                <LoginPage setUsername={handleLogin} />
              )
            }
          />
         
          <Route path="/edit/:id" element={<EditTodo />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/signup" element={<SignUp />} />
           <Route path="/forgot-password" element={<ForgotPassword />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
