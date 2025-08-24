import mongoose from 'mongoose';


const employeeSchema = new mongoose.Schema(
{
name: { type: String, required: true },
email: { type: String, required: true, lowercase: true },
role: { type: String, enum: ['admin', 'manager', 'user'], default: 'user' }
},
{ timestamps: true }
);


export default mongoose.model('Employee', employeeSchema);