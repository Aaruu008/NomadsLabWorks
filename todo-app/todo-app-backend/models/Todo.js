const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [50, 'Title cannot be more than 50 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  datetime: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(v);
      },
      message: props => `${props.value} is not a valid datetime format!`
    }
  },
  completed: {
    type: Boolean,
    default: false
  },
  priority: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
  // Removed the user field
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});