import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  logging: false, // Disables logging of SQL queries,
});

export default sequelize;
