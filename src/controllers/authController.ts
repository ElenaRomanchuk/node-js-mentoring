import {Service} from "typedi";
import {AuthService} from "../services/authService";
import {asyncControllerErrorLog} from "../logging/asyncControllerErrorLog";
import {NextFunction, Response} from "express";
import {ValidatedRequest} from "express-joi-validation";
import {LoginRequestSchema} from "../middleware/validation/loginValidation";

@Service()
export class AuthController {
  private authService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  @asyncControllerErrorLog()
  async login(req: ValidatedRequest<LoginRequestSchema>, res: Response, next: NextFunction) {
    const {login, password} = req.body;

    const token = await this.authService.authUser(login, password);

    res.json({ token });
  }
}
