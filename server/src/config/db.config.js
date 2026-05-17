// ============================================
// db.config.js - MongoDB Connection
// ============================================

import mongoose from 'mongoose'; // Mongoose ODM (MongoDB: Database Connection)

// Using async/await pattern (JS Essentials: Async/Await)
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error('MONGODB_URI is not defined in your .env file');
    }

    if (mongoURI.includes('@cluster.mongodb.net')) {
      throw new Error(
        'MONGODB_URI still uses the placeholder host "cluster.mongodb.net". Replace it with your real MongoDB Atlas host, for example "cluster0.xxxxx.mongodb.net", or use a local MongoDB URI.'
      );
    }

    const conn = await mongoose.connect(mongoURI); // Mongoose connection (MongoDB: Database Connection)
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
