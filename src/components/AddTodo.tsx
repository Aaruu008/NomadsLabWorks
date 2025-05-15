import React, { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  addTodo: (todo: {
    title: string;
    description: string;
    deadline: string;
    priority: boolean;
  }) => void;
}

const AddTodo: React.FC<Props> = ({ isOpen, onClose, addTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadlineDate, setDeadlineDate] = useState('');
  const [deadlineTime, setDeadlineTime] = useState('');
  const [priority, setPriority] = useState(false);

  const handleAddTask = () => {
    if (!title.trim()) {
      alert('Task title is required');
      return;
    }

    const deadline = deadlineDate && deadlineTime ? `${deadlineDate} ${deadlineTime}` : '';

    addTodo({
      title,
      description,
      deadline,
      priority,
    });

    // Clear form & close modal
    setTitle('');
    setDescription('');
    setDeadlineDate('');
    setDeadlineTime('');
    setPriority(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="add-task-heading"
    >
      <div
        className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg"
        onClick={(e) => e.stopPropagation()} 
      >
        <h2 id="add-task-heading" className="text-2xl font-semibold mb-4">
          Add Task
        </h2>

        <label className="block mb-2 font-medium" htmlFor="task-title">
          Task Title
        </label>
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-yellow-400 focus:ring-2 focus:ring-yellow-400"
          placeholder="Enter task title"
        />

        <label className="block mb-2 font-medium" htmlFor="task-desc">
          Task Description
        </label>
        <textarea
          id="task-desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-yellow-400 focus:ring-2 focus:ring-yellow-400"
          placeholder="Enter task description"
          rows={3}
        />

        <div className="mb-4">
          <label className="block mb-1 font-medium">Set Deadline</label>
          <div className="flex space-x-2">
            <input
              type="date"
              value={deadlineDate}
              onChange={(e) => setDeadlineDate(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-yellow-400 focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="time"
              value={deadlineTime}
              onChange={(e) => setDeadlineTime(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-yellow-400 focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        <label className="inline-flex items-center mb-6">
          <input
            type="checkbox"
            checked={priority}
            onChange={(e) => setPriority(e.target.checked)}
            className="form-checkbox h-5 w-5 text-yellow-400"
          />
          <span className="ml-2">Set as priority</span>
        </label>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleAddTask}
            className="px-4 py-2 rounded bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
