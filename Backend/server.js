const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("This is home route");
});

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
