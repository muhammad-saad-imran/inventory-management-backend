import "reflect-metadata";
import "dotenv/config";
import { App } from "./App";

const { PORT = "3000" } = process.env;
const app = new App();

app.startServer(parseInt(PORT));
