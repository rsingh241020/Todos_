// src/models/Todo.js
import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    task: { type: String, required: true },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    dueDate: { type: Date }
  },
  { timestamps: true }
);

// Convenience virtual
todoSchema.virtual('isOverdue').get(function () {
  return this.dueDate ? this.status !== 'completed' && this.dueDate < new Date() : false;
});

export default mongoose.model('Todo', todoSchema);