const router = require("express").Router();
const { User, Daily, Weekly, Monthly, Task } = require("../models");
const withAuth = require("../utils/auth");

//removed withAuth from routes so that we can use them and see what we're editing

router.get("/", async (req, res) => {
  if (req.session.logged_in) {
    try {
      const monthlyData = await Monthly.findAll({
        include: [{ model: Weekly }, { model: Daily }],
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
  res.render("home");
  // make another handlebars page. when you log on, have a daily, monthly, weekly but if not logged in, personalized info won't be there. maybe find api with important dates.
});

router.get("/profile", async (req, res) => {
  try {
    // Commented this out so that profile would render, need to ensure this sequelize data has a landing spot in the handlebar or it will not render correctly

    // const userData = await User.findbyPk(req.session.user_id, {
    //   attributes: { exclude: ["password"] },
    //   include: [{ model: Monthly }, { model: Weekly }, { model: Daily }],
    // });

    // const user = userData.get({ plain: true });

    res.render("profile");
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

// This is for our login and create an account posts when we are ready for them

// router.post("/login", async (req, res) => {
//   try {
//     const userData = await User.create(req.body);

//     req.session.save(() => {
//       req.session.user_id = userData.id;
//       req.session.logged_in = true;

//       res.status(200).json(userData);
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// router.post("/login", async (req, res) => {
//   try {
//     const userData = await User.findOne({ where: { email: req.body.email } });

//     if (!userData) {
//       res.status(400).json({ message: "Incorrect email. Please try again." });
//       return;
//     }

//     const verifyPass = await userData.checkPassword(req.body.password);

//     if (!verifyPass) {
//       res
//         .status(400)
//         .json({ message: "Incorrect password. Please try again." });
//       return;
//     }

//     req.session.save(() => {
//       req.session.user.id = userData.id;
//       req.session.logged_in = true;

//       res.json({
//         user: userData,
//         message: "You have been successfully logged in!",
//       });
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// router.post("/logout", (req, res) => {
//   if (req.session.logged_in) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });

module.exports = router;
