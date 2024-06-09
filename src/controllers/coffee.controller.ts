import express, { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";

const coffeeController: T = {};
coffeeController.goHome = (req: Request, res: Response) => {
    try {
        console.log("Home Page");
        res.send("Home Page");
         // send | json | redirect | end | render        
    } catch (err) {
        console.log("ERROR, goHome:", err);
    }
};

coffeeController.getLogin = (req: Request, res: Response) => {
    try {
        console.log("Login Page");
        res.send("Login Page");
    } catch (err) {
        console.log("ERROR, getLogin:", err);
    }
};

coffeeController.getSignup = (req: Request, res: Response) => {
    try {
        console.log("Signup Page");
        res.send("Signup Page");
    } catch (err) {
        console.log("ERROR, getSignup:", err);
    }
};

coffeeController.processLogin = (req: Request, res: Response) => {
    try {
        console.log("processLogin");
        res.send("DONE")
    } catch (err) {
        console.log("ERROR, processLogin:", err);
    }
};

coffeeController.processSignup = (req: Request, res: Response) => {
    try {
        console.log("processSignup");
        res.send("DONE")
    } catch (err) {
        console.log("ERROR, processSingup:", err);
    }
};


export default coffeeController;