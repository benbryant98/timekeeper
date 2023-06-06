const router = require("express").Router();
const User = require("../models/User");
const Task = require("../models/Task");
const withAuth = require("../utils/auth");

//removed withAuth from routes so that we can use them and see what we're editing

router.get("/", async (req, res) => {
  //TODO add render for non-personalized calendar info, such as holidays
  if (req.session.logged_in) {
    try {
      const taskData = await Task.findAll({
        where: { user_id: req.session.user_id },
      });
      console.log(taskData);
      res.render("home", {
        tasks: taskData,
        session: req.session,
      });
    } catch (err) {
      res.status(404).json(err);
    }
  } else {
    res.render("home", { logged_in: false });
  }
});

router.get("/profile", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      // include: [{ model: Task }],
    });

    console.log(userData);
    const user = userData.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
