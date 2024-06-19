import express, { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { AdminRequest, LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import { Message } from "../libs/Errors";

const memberService = new MemberService();

const coffeeController: T = {};
coffeeController.goHome = (req: Request, res: Response) => {
    try {
        console.log("Home Page");
        res.render("home");
         // send | json | redirect | end | render        
    } catch (err) {
        console.log("ERROR, goHome:", err);
    }
};

coffeeController.getSignup = (req: Request, res: Response) => {
    try {
        console.log("Signup Page");
        res.render("signup");
    } catch (err) {
        console.log("ERROR, getSignup:", err);
    }
};

coffeeController.getLogin = (req: Request, res: Response) => {
    try {
        console.log("Login Page");
        res.render("login");
    } catch (err) {
        console.log("ERROR, getLogin:", err);
    }
};


coffeeController.processSignup = async (
    req: AdminRequest, 
    res: Response
    ) => {
    try {
        console.log("processSignup");
        // console.log("body", req.body);

        const newMember: MemberInput = req.body;
        newMember.memberType = MemberType.COFFEE; 
        const result = await memberService.processSignup(newMember);
        // TODO: SESSIONS AUTHENTICATION

        req.session.member = result;
        req.session.save(function() {
            res.send(result);
        });
       
    } catch (err) {
        console.log("ERROR, processSingup:", err);
        res.send(err);
    }
};

coffeeController.processLogin = async (
    req: AdminRequest, 
    res: Response
    ) => {
    try {
        console.log("processLogin");
        // console.log("body:", req.body);
        const input: LoginInput = req.body;
        const result = await memberService.processLogin(input);
        // TODO: SESSIONS AUTHENTICATION
        req.session.member = result;
        req.session.save(function() {
            res.send(result);
        });

    } catch (err) {
        console.log("ERROR, processLogin:", err);
        res.send(err);
    }
};

coffeeController.checkAuthSession = async (
    req: AdminRequest, 
    res: Response
    ) => {
    try {
        console.log("checkAuthSession");
        if (req.session?.member)
            res.send(`<script> alert("${req.session.member.memberNick}") </script>`);
        else res.send(`<script> alert("${Message.NOT_AUTHENTICATED}") </script>`);
     
    } catch (err) {
        console.log("Error, checkAuthSession:", err);
        res.send(err);
    }
};



export default coffeeController;