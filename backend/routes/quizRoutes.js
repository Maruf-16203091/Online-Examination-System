// routes/quizRoutes.js
const express = require("express");
const router = express.Router();

// Example route for quizzes
router.get("/quizzes", (req, res) => {
  res.json([{ id: 1, name: "Sample Quiz" }]);
});

module.exports = router;
