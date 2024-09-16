import "reflect-metadata";
import "dotenv/config";

import express, { Express } from "express";
import sequelize from "./database";

const app: Express = express();
const { PORT = 3000 } = process.env;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const startServer = async (): Promise<void> => {
  try {
    await sequelize.authenticate(); // Authenticates the database connection
    app.listen(PORT, () => {
      // Starts the server on port
      console.log("Server started on port", PORT);
    });
  } catch (error) {
    console.error(error); // Logs any errors that occur
    process.exit(1); // Exits the process with an error status code
  }
};

startServer();
