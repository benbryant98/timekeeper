const router = require("express").Router();
const Task = require("../../models/Task");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  console.log(req.body);
  console.log(req.session.user_id);
  try {
    const taskData = await Task.create({
      title: req.body.title,
      body: req.body.body,
      date: req.body.date,
      frequency: req.body.frequency,
      user_id: req.session.user_id,
    });

    res.status(200).json(taskData);
    console.log("Task created.");
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const taskData = await Task.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!taskData) {
      res.status(404).json({ message: "Task not found." });
      return;
    }

    res.status(200).json({ message: "Task deleted." });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
