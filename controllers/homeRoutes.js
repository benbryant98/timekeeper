const router = require("express").Router();
const { Daily, Weekly, Monthly, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  if (req.session.logged_in) {
    try {
      const monthlyData = await Monthly.findAll({
        include: [
          //TODO add weekly and daily values to include
        ],
      });

      const tasks = monthlyData.map((task) => task.get({ plain: true }));

      res.render("homepage", {
        tasks,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
    return;
  }

  //TODO add render for non-personalized calendar info, such as holidays
  res.render("login");
});

router.get("/profile", withAuth, async (req, res) => {
  try {
    const userData = await User.findbyPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Monthly }, { model: Weekly }, { model: Daily }],
    });

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
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

module.exports = router;
