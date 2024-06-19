import express, { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { AdminRequest, LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import Errors, { Message } from "../libs/Errors";

const memberService = new MemberService();

const coffeeController: T = {};
coffeeController.goHome = (req: Request, res: Response) => {
    try {
        console.log("goHome");
        res.render("home");
        // send | json | redirect | end | render
    } catch (err) {
        console.log("ERROR, goHome:", err);
        res.redirect("/admin");
    }
};

coffeeController.getSignup = (req: Request, res: Response) => {
    try {
        console.log("getSignup");
        res.render("signup");
    } catch (err) {
        console.log("ERROR, getSignup:", err);
        res.redirect("/admin");
    }
};

coffeeController.getLogin = (req: Request, res: Response) => {
    try {
        console.log("getLogin");
        res.render("login");
    } catch (err) {
        console.log("ERROR, getLogin:", err);
        res.redirect("/admin");
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
        const message = 
        err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
        `<script> alert("${message}"); window.location.replace('admin/signup') </script>`
    );
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
        const message = 
            err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
        res.send(
            `<script> alert("${message}"); window.location.replace('admin/login') </script>`
        );
    }
};

coffeeController.logout = async (
    req: AdminRequest, 
    res: Response
    ) => {
    try {
        console.log("logout");
        req.session.destroy(function () {
            res.redirect("/admin");
        });

    } catch (err) {
        console.log("ERROR, logout:", err);
        res.redirect("/admin");
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