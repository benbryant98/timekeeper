const User = require("./User");
const Daily = require("./Daily");
const Weekly = require("./Weekly");
const Monthly = require("./Monthly");
const Task = require("./Task");

User.hasOne(Monthly, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Monthly.belongsTo(User, {
  foreignKey: "user_id",
});

Monthly.hasMany(Weekly, {
  foreignKey: "monthly_id",
  onDelete: "CASCADE",
});

Weekly.hasMany(Daily, {
  foreignKey: "weekly_id",
  onDelete: "CASCADE",
});

Daily.hasMany(Task, {
  foreignKey: "daily_id",
  onDelete: "CASCADE",
});

//user has one monthly. a monthly will have 4-5 weeklies. and a weekly will have many dailies. all seperate should have their own tables. a daily table with multiple daily objects with own id, title, body and such. weekly needs a link to daily to populate with those tasks. create a task model with body, title, and time or date. that will feed into daily which feeds into weekly which feeds into monthly

module.export = { User, Daily, Weekly, Monthly, Task };
