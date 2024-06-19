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

routerAdmin.get("/logout", coffeeController.logout)
routerAdmin.get("/check-me", coffeeController.checkAuthSession);

/** Product */
/** User */
  
export default routerAdmin;