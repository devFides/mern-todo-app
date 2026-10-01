const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("API running"));

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server on port ${PORT}`));
});
