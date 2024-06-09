import express from "express";
const routerAdmin = express.Router();
import coffeeController from "./controllers/coffee.controller";

/** Restaurant */
routerAdmin.get("/", coffeeController.goHome);
routerAdmin
    .get("/login", coffeeController.getLogin)
    .post("/login", coffeeController.processLogin);
routerAdmin
    .get("/signup", coffeeController.getSignup)
    .post("/signup", coffeeController.processSignup);

/** Product */
/** User */
  
export default routerAdmin;