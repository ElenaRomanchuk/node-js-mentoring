import {Service} from "typedi";
import  httpErrors  from 'http-errors';
import jsonwebtoken from 'jsonwebtoken';
import {UserService} from "./userService";
import config from '../config';

@Service()
export class AuthService {
    private userService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    async authUser(login: string, password: string) {
        const user = await this.userService.getUserByCredentials(login, password);
        if (!user) {
            throw httpErrors(401, 'Invalid login or password');
        }

        return jsonwebtoken.sign({ login, password }, config.secret, { expiresIn: 3600 })
    }
}
