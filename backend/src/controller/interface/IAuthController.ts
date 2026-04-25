import { Request,Response } from "express";

export interface IAuthController {
   signup(req: Request, res: Response):Promise<any>;
   verifyOtp(req: Request, res: Response):Promise<any>;
   login(req: Request, res: Response):Promise<any>;
   refresh(req: Request, res: Response):Promise<any>;
   resendOtp(req: Request, res: Response):Promise<any>;
   logout(req: Request, res: Response):Promise<any>;
}