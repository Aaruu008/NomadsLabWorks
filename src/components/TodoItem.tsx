import React, { useState } from 'react';
import { Todo } from './TodoList';
import Confetti from 'react-confetti';

interface Props {
  todo: Todo;
  onTodoCompletion: (id: number) => void;
  onEdit?: (todo: Todo) => void;
}

const TodoItem: React.FC<Props> = ({ todo, onTodoCompletion, onEdit }) => {
  const [animateComplete, setAnimateComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const dateTime = todo.datetime ? new Date(todo.datetime) : null;
  const formattedDate = dateTime
    ? dateTime.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : '';
  const formattedTime = dateTime
    ? dateTime.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  const handleCheckboxChange = () => {
    setAnimateComplete(true);
    setShowConfetti(true);

    setTimeout(() => {
      setShowConfetti(false);
      setAnimateComplete(false);
      onTodoCompletion(todo.id);
    }, 1000); 
  };

  return (
    <div
      className={`relative border rounded-lg p-4 shadow-md transition-all duration-500 ease-in-out transform 
        ${todo.priority ? 'border-yellow-400' : 'border-gray-300'} 
        hover:border-yellow-500 hover:shadow-lg cursor-pointer 
        ${animateComplete ? 'scale-95 opacity-70 bg-green-100' : ''}
      `}
      role="listitem"
      aria-label={`Task: ${todo.title}`}
    >
      {/* Confetti */}
      {showConfetti && (
        <Confetti
          recycle={false}
          numberOfPieces={150}
          width={window.innerWidth}
          height={window.innerHeight}
        />
      )}

      {/* Title with strikethrough if completed */}
      <h2
        className={`text-lg font-semibold mb-1 transition-all duration-500 ${
          todo.completed ? 'line-through text-gray-400' : ''
        }`}
      >
        {todo.title}
      </h2>

      {/* Description */}
      {todo.description && (
        <p className="text-gray-600 mb-4 line-clamp-3">{todo.description}</p>
      )}

      {/* Bottom row with checkbox, date/time and edit button */}
      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2 text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleCheckboxChange}
            className="w-5 h-5 text-yellow-400 focus:ring-yellow-400"
            aria-label={`Mark ${todo.title} as completed`}
          />
          <span>
            {formattedDate} {formattedTime}
          </span>
        </label>

        {onEdit && (
          <button
            onClick={(e) => {
              e.stopPropagation(); 
              onEdit(todo);
            }}
            className="text-yellow-400 hover:text-yellow-600 transition"
            aria-label={`Edit ${todo.title}`}
            title="Edit Task"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
