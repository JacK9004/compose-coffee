import express, { Request, Response } from "express";
import { T } from "../libs/types/common";

const coffeeController: T = {};
coffeeController.goHome = (req: Request, res: Response) => {
    try {
        res.send("Home Page");
    } catch (err) {
        console.log("ERROR, goHome:", err);
    }
};

coffeeController.getLogin = (req: Request, res: Response) => {
    try {
        res.send("Login Page");
    } catch (err) {
        console.log("ERROR, getLogin:", err);
    }
};

coffeeController.getSignup = (req: Request, res: Response) => {
    try {
        res.send("Signup Page");
    } catch (err) {
        console.log("ERROR, getSignup:", err);
    }
};

export default coffeeController;