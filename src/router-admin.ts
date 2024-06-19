import express from "express";
const routerAdmin = express.Router();
import coffeeController from "./controllers/coffee.controller";
import productController from "./controllers/product.controller";

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
routerAdmin.get(
    "/product/all",
    coffeeController.verifyRestaurant,
    productController.getAllProducts
     );
routerAdmin.post(
    "/product/create", 
coffeeController.verifyRestaurant,
productController.createNewProduct
    );

routerAdmin.post(
    "/product/:id",
    coffeeController.verifyRestaurant, 
    productController.updateChosenProduct
    );

/** User */
  
export default routerAdmin;