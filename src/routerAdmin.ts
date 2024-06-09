import express from "express";
import coffeeController from "./controllers/coffee.controller";
const router = express.Router();


router.get("/", coffeeController.goHome);

router.get("/login", coffeeController.getLogin);

router.get("/signup", coffeeController.getSignup);

export default router;