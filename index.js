const express = require("express");
const cors = require("cors");
const router = require("./routes/routes"); // Direct import of the router

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/api", router); // Prefix routes with /api

// Fallback route for unknown endpoints
app.use((req, res) => {
  res.status(404).send({ message: "Route not found" });
});

const port = process.env.PORT || 4500;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing server...");
  server.close(() => {
    console.log("Server closed");
  });
});
