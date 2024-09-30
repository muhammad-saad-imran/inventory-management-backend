import express, { Express } from "express";
import sequelize from "./database";
import { handleErrors } from "./utils/route.utils";
import "express-async-errors";
import authRouter from "./features/Authorization/auth.route";
import userRouter from "./features/Users/user.route";
import productRouter from "./features/Product/product.route";

export class App {
  private app: Express = express();

  constructor() {
    this.setupApp();
  }

  private setupApp() {
    this.setupMiddlewares();
    this.setupRoutes();
    /** Setup `Error handler` after all middlewares & routes  */
    this.app.use(handleErrors);
  }

  private setupRoutes() {
    this.app.use("/api/auth", authRouter);
    this.app.use("/api/user", userRouter);
    this.app.use("/api/product", productRouter);
  }

  private setupMiddlewares() {
    this.app.use(express.json());
  }

  public async startServer(port: number) {
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
