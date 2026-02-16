const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;


mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

const TestSchema = new mongoose.Schema({
  message: String
});

const Test = mongoose.model("Test", TestSchema);

app.get("/", async (req, res) => {
  const data = await Test.find();
  res.json(data);
});

app.post("/add", async (req, res) => {
  const newData = new Test({ message: "Hello DevOps 🚀" });
  await newData.save();
  res.send("Data inserted");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
