
const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Jenkins Docker CI/CD Backend is working"
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    service: "backend"
  });
});

app.get("/api", (req, res) => {
  res.json({
    message: "Backend API Working"
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});