const Sequelize = require("sequelize");
require("dotenv").config();

let sequelize;

// change this JAWSDB_URL
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: "localhost",
      dialect: "mysql",
      // leave this alone
      port: 3306,
    }
  );
}

module.exports = sequelize;
