const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const goalRouter = require("./Routes/goalsRoutes");
const userRoutes = require("./Routes/userRoutes");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorHandler");
const PORT = process.env.PORT || 5000;

const app = express();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/goals", goalRouter);
app.use("/api/users", userRoutes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
