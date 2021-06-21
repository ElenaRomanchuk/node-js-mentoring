import {Container} from "typedi";
import {Router} from "express";
import {AuthController} from "../controllers/authController";
import {loginValidation} from "../middleware/validation/loginValidation";

const authController = Container.get(AuthController);

export const authRouter = Router();

authRouter.route('/login')
  .post(loginValidation, authController.login.bind(authController));
