const mongoose = require("mongoose");
const MONGODB_URI = 'mongodb+srv://manojm:passwordtodo@cluster0.yd3okq4.mongodb.net/?retryWrites=true&w=majority'
const Connection = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error : ${error.message}`);
  }
};

module.exports = Connection;
