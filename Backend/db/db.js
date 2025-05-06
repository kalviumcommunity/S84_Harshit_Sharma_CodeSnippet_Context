const mongoose = require("mongoose");
require("dotenv").config();

module.exports = () =>
  mongoose
    .connect(process.env.MONGO_URI)
    .then((conn) => console.log(`MongoDB Connected: ${conn.connection.host}`))
    .catch((err) => {
      console.error(`Error: ${err.message}`);
      process.exit(1);
    });
