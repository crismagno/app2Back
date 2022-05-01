require("dotenv").config({ path: `${__dirname}/../.env` });
import { App } from "./app";

const appInstance: App = new App();
appInstance.start();
