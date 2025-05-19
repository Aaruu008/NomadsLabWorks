const Todo = require('../models/Todo');

// Get all todos
exports.getAllTodos = async (req, res) => {
   try {
    const todos = await Todo.find();
    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Create a new todo
exports.createTodo = async (req, res) => {
  const { title, description, deadline, priority } = req.body;
  
  try {
    const todoData = {
      title,
      description,
      priority: priority || false,
      completed: false
    };

    if (deadline) {
      // Convert space to T if needed
      const formattedDeadline = deadline.includes(' ') 
        ? deadline.replace(' ', 'T') 
        : deadline;
      
      // Validate the format
      const isoRegex = /^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}$/;
      if (!isoRegex.test(deadline)) {
        return res.status(400).json({
          success: false,
          error: 'Deadline must be in YYYY-MM-DD HH:MM or YYYY-MM-DDTHH:MM format'
        });
      }
      
      todoData.datetime = formattedDeadline;
    }

    const todo = await Todo.create(todoData);
    res.status(201).json({
      success: true,
      data: todo
    });
  } catch (err) {
    console.error('Creation error:', err);
    res.status(500).json({
      success: false,
      error: process.env.NODE_ENV === 'development' ? err.message : 'Server Error'
    });
  }
};


// Update a todo
exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, datetime, completed, priority } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, description, datetime, completed, priority },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Toggle todo completion status
exports.toggleTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    todo.completed = !todo.completed;
    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};