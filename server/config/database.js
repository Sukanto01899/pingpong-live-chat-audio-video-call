const mongoose = require("mongoose");

const connectDB = async () => {
  console.log(process.env.MONGODB_URI)
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/PingPong",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }


   // Graceful shutdown
  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('🔌 MongoDB disconnected on app termination');
    process.exit(0);
  });
};


//  || "mongodb://127.0.0.1:27017/PingPong"
module.exports = connectDB;
