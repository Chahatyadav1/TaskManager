const express = require("express");
const taskRoutes = require("./routes/task.routes");

const app = express();

app.use(express.json());
app.use("/api/tasks", taskRoutes);

module.exports = app;
