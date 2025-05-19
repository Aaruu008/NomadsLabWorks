import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';

interface Todo {
  id: number;
  title: string;
  description?: string;
  datetime?: string;
  completed: boolean;
  priority?: boolean;
}

const EditTodo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [datetime, setDatetime] = useState('');
  const [completed, setCompleted] = useState(false);
  const [priority, setPriority] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const storedTodos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');
    const todo = storedTodos.find((t) => t.id === Number(id));
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description || '');
      setDatetime(todo.datetime || '');
      setCompleted(todo.completed);
      setPriority(todo.priority || false);
    } else {
      navigate('/todos');
    }
  }, [id, navigate]);

 // Update handleUpdate to use API:
const handleUpdate = async () => {
  if (!title.trim()) {
    setErrorMessage('You have removed the Title, please add it.');
    setTimeout(() => setErrorMessage(''), 3000);
    return;
  }

  try {
    await api.put(`/todos/${id}`, {
      title: title.trim(),
      description: description.trim(),
      datetime,
      completed,
      priority
    });
    
    localStorage.setItem('editSuccessMessage', 'Your task was successfully updated!');
    navigate('/todos');
  } catch (error) {
    console.error('Error updating todo:', error);
  }
};

  return (
    <div className="edit-todo-container max-w-md mx-auto p-6 mt-10 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Edit Task #{id}</h2>

      {/* Error message */}
      {errorMessage && (
        <div className="mb-4 text-red-600 bg-red-100 px-4 py-2 rounded text-sm font-medium animate-pulse">
          {errorMessage}
        </div>
      )}

      <label className="block mb-2 font-medium" htmlFor="title">
        Title <span className="text-yellow-500">*</span>
      </label>
      <input
        id="title"
        type="text"
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-yellow-400 focus:ring-2 focus:ring-yellow-400"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
      />

      <label className="block mb-2 font-medium" htmlFor="description">
        Description
      </label>
      <textarea
        id="description"
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-yellow-400 focus:ring-2 focus:ring-yellow-400"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task description"
        rows={3}
      />

      <label className="block mb-2 font-medium" htmlFor="datetime">
        Deadline Date & Time
      </label>
      <input
        id="datetime"
        type="datetime-local"
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-yellow-400 focus:ring-2 focus:ring-yellow-400"
        value={datetime}
        onChange={(e) => setDatetime(e.target.value)}
      />

      <div className="flex items-center mb-4 space-x-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => setCompleted(!completed)}
            className="w-5 h-5 text-yellow-400 focus:ring-yellow-400"
          />
          <span>Completed</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={priority}
            onChange={() => setPriority(!priority)}
            className="w-5 h-5 text-yellow-400 focus:ring-yellow-400"
          />
          <span>High Priority</span>
        </label>
      </div>

      <button
        onClick={handleUpdate}
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded transition"
      >
        Update Task
      </button>
    </div>
  );
};

export default EditTodo;
