import mongoose from 'mongoose';


export const connectDB = async (uri) => {
try {
mongoose.set('strictQuery', true);
await mongoose.connect(uri, { dbName: uri.split('/').pop() });
console.log('🗄️ MongoDB connected');
} catch (err) {
console.error('Mongo connection error:', err.message);
process.exit(1);
}
};