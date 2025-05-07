const express = require("express");
require("dotenv").config();
const app = express();
const connectDB = require("./db/db");
const snippetRoutes = require("./routes/snippets.js");
connectDB();
app.use(express.json());

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("This is home route");
});

app.use("/api/snippets", snippetRoutes);

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
