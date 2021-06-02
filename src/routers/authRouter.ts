import {Container} from "typedi";
import {AuthController} from "../controllers/authController";
import {Router} from "express";
import {loginValidation} from "../middleware/validation/loginValidation";

const authController = Container.get(AuthController);

export const authRouter = Router();

authRouter.route('/login')
  .post(loginValidation, authController.login.bind(authController));
