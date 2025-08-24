import { validationResult } from 'express-validator';
import Employee from '../models/Employee.js';


export const listEmployees = async (req, res) => {
const { q, role } = req.query;
const filter = {};
if (q) filter.$or = [
{ name: { $regex: q, $options: 'i' } },
{ email: { $regex: q, $options: 'i' } }
];
if (role) filter.role = role;
const docs = await Employee.find(filter).sort({ createdAt: -1 });
res.json(docs);
};


export const createEmployee = async (req, res) => {
const errors = validationResult(req);
if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
const emp = await Employee.create(req.body);
res.status(201).json(emp);
};


export const updateEmployee = async (req, res) => {
const errors = validationResult(req);
if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
const { id } = req.params;
const updated = await Employee.findByIdAndUpdate(id, req.body, { new: true });
if (!updated) return res.status(404).json({ message: 'Employee not found' });
res.json(updated);
};


export const deleteEmployee = async (req, res) => {
const { id } = req.params;
const deleted = await Employee.findByIdAndDelete(id);
if (!deleted) return res.status(404).json({ message: 'Employee not found' });
res.json({ message: 'Employee deleted' });
};