const express = require("express");

const router = express.Router();
const pool = require("../db");

// insert initial title of the course

router.post("/quizname", async (req, res) => {
  try {
    const { quizname } = req.body;

    const isExist = await pool.query(
      "SELECT * FROM quiz_name WHERE name = $1",
      [quizname]
    );

    if (isExist.rows.length > 0) {
      res.json(false);
    } else {
      await pool.query("INSERT INTO quiz_name(name) VALUES($1) RETURNING *", [
        quizname,
      ]);

      res.json(true);
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/quizname", async (req, res) => {
  try {
    // Fetch all quiz names
    const allQuizNameResult = await pool.query("SELECT * FROM quiz_name");
    const allQuizNames = allQuizNameResult.rows;

    // Fetch count of questions for each quiz name
    const quizCounts = await Promise.all(
      allQuizNames.map(async (quiz) => {
        const quizName = quiz.name; // Adjust this according to your table column

        const countResult = await pool.query(
          "SELECT COUNT(*) FROM question WHERE quizname = $1",
          [quizName]
        );
        const count = countResult.rows[0].count;
        return {
          quizName,
          count,
        };
      })
    );

    res.json(quizCounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/submit-question", async (req, res) => {
  try {
    const { question, option1, option2, option3, option4, answer, quizname } =
      req.body;

    const isExist = await pool.query(
      "SELECT * FROM question WHERE question = $1",
      [question]
    );

    if (isExist.rows.length > 0) {
      res.json(false);
    } else {
      await pool.query(
        "INSERT INTO question( quizname,question, option1, option2, option3, option4, answer)  VALUES($1, $2, $3, $4, $5, $6,$7 ) RETURNING *",
        [quizname, question, option1, option2, option3, option4, answer]
      );

      res.json(true);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/questions/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const allQuestion = await pool.query(
      "SELECT * FROM question WHERE quizname=$1",
      [id]
    );

    res.json(allQuestion.rows);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/question-delete", async (req, res) => {
  const { id, quizname } = req.query;

  try {
    await pool.query("DELETE FROM question WHERE id=$1", [id]);

    const restQuestion = await pool.query(
      "SELECT * FROM question WHERE quizname=$1",
      [quizname]
    );

    res.json(restQuestion.rows);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
