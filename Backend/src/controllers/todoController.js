import { validationResult } from 'express-validator';
import Todo from '../models/Todo.js';


export const myTodos = async (req, res) => {
const docs = await Todo.find({ userId: req.user.id }).sort({ createdAt: -1 });
const enriched = docs.map((d) => ({
...d.toObject(),
isOverdue: d.dueDate ? d.status !== 'completed' && d.dueDate < new Date() : false
}));
res.json(enriched);
};


export const addTodo = async (req, res) => {
const errors = validationResult(req);
if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
const { task, dueDate } = req.body;
const todo = await Todo.create({ userId: req.user.id, task, dueDate });
res.status(201).json(todo);
};


export const markComplete = async (req, res) => {
const { id } = req.params;
const todo = await Todo.findOneAndUpdate(
{ _id: id, userId: req.user.id },
{ status: 'completed' },
{ new: true }
);
if (!todo) return res.status(404).json({ message: 'To‑Do not found' });
res.json(todo);
};


export const deleteTodo = async (req, res) => {
const { id } = req.params;
const todo = await Todo.findOneAndDelete({ _id: id, userId: req.user.id });
if (!todo) return res.status(404).json({ message: 'To‑Do not found' });
res.json({ message: 'To‑Do deleted' });
};