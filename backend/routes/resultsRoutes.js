const express = require("express");
const router = express.Router();
const Result = require("../models/resultModel");
const Quiz = require("../models/quizModel");

// @route GET /api/results/:userId
// @desc Get all quiz results for a user
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch all results for the user
    const results = await Result.find({ userId }).populate(
      "quizId",
      "title category"
    );

    if (!results || results.length === 0) {
      return res
        .status(404)
        .json({ message: "No results found for this user." });
    }

    res.status(200).json(results);
  } catch (err) {
    console.error("Error fetching results:", err);
    res.status(500).json({ message: "Error fetching results." });
  }
});

// @route GET /api/results/:resultId
// @desc Get result by resultId
router.get("/detail/:resultId", async (req, res) => {
  try {
    const { resultId } = req.params;

    const result = await Result.findById(resultId);

    if (!result) {
      return res.status(404).json({ message: "Result not found." });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching result:", err);
    res.status(500).json({ message: "Error fetching result." });
  }
});

module.exports = router;
