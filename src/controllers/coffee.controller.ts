import express, { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";

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

coffeeController.processSignup = async (req: Request, res: Response) => {
    try {
        console.log("processSignup");
        // console.log("body", req.body);

        const newMember: MemberInput = req.body;
        newMember.memberType =  MemberType.COFFEE;

        const memberService = new MemberService();
        const result = await memberService.processSignup(newMember);

        res.send(result);
    } catch (err) {
        console.log("ERROR, processSingup:", err);
        res.send(err);
    }
};

export default coffeeController;