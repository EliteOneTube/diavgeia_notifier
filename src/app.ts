import * as dotenv from "dotenv";
dotenv.config();
import Manager from "./lib/Manager";

const manager = new Manager();

manager.start();