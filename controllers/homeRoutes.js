const router = require("express").Router();
const User = require("../models/User");
const Task = require("../models/Task");
const withAuth = require("../utils/auth");

//removed withAuth from routes so that we can use them and see what we're editing

router.get("/", async (req, res) => {
  // if (req.session.logged_in) {
  //   try {
  //     const monthlyData = await Monthly.findAll({
  //       include: [{ model: Weekly }, { model: Daily }],
  //     });

  //     const tasks = monthlyData.map((task) => task.get({ plain: true }));

  //     res.render("home", {
  //       tasks,
  //       logged_in: req.session.logged_in,
  //     });
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  //   return;
  // }

  //TODO add render for non-personalized calendar info, such as holidays
  console.log(req.session);
  res.render("home");
  // make another handlebars page. when you log on, have a daily, monthly, weekly but if not logged in, personalized info won't be there. maybe find api with important dates.
});

router.get("/profile", async (req, res) => {
  try {
    // Commented this out so that profile would render, need to ensure this sequelize data has a landing spot in the handlebar or it will not render correctly

    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });

    const user = userData.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    const userData = await User.findByPk(req.session.userId, {
      attributes: { exclude: ["password"] },
      include: [{ model: Task }],
    });

    const user = userData.get({ plain: true });

    console.log(user);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

module.exports = router;
