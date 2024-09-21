import express, { Express } from "express";
import sequelize from "./database";
import { handleErrors } from "./utils/helpers.utils";

export class App {
  app: Express = express();

  constructor() {
    this.loadModules();
    this.setupMiddlewares();
    this.setupRoutes();
  }

  private loadModules() {
    /**
     * loads all controllers, services, routes, etc..
     */
  }

  private setupRoutes() {
    /**
     * Regsiter and use routers from each routes
     */
  }

  private setupMiddlewares() {
    this.app.use(express.json());
    this.app.use(handleErrors);

    // Only for testing, to be removed after develop
    this.app.get("/", (req, res) => {
      res.send("Hello, World!");
    });
  }

  async startServer(port: number) {
    try {
      await sequelize.authenticate(); // Authenticates the database connection
      this.app.listen(port, () => {
        // Starts the server on port
        console.log("Server started on port", port);
      });
    } catch (error) {
      console.error(error); // Logs any errors that occur
      process.exit(1); // Exits the process with an error status code
    }
  }
}
