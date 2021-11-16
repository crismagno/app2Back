require("dotenv").config({ path: `${__dirname}/../.env` });
import { App } from "./app";

const appInstance = new App();
appInstance.start();
