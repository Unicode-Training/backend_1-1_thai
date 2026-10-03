import status from "http-status";
import { HttpException } from "../exceptions/http.exception.js";
import { prisma } from "../lib/prisma.js";

export const userService = {
    findAll() {
        throw new HttpException("hello", 404);
        return prisma.user.findMany();
    },

    find(id: number) {
        const users = [
            {
                id: 1,
                name: "User 1"
            },
            {
                id: 2,
                name: "User 2"
            }
        ];
        const user = users.find(user => user.id === id);
        if (!user) {
            throw new HttpException("User not found", status.NOT_FOUND);
        }
        return user;
    }
}

//Controller -> Service A -> Service B -> Model

/*

class UserService {
    findByEmail() {

    }
}

class AuthService {
    constructor(userService: UserService) {
       this.userService = userService
    }

    login() {

    }
}

class AuthController {
    constructor(authService:AuthService) {
        this.authService = authService
    }
    login() {
        this.authService.login()
    }
}


const userService = new UserService
const authService = new AuthService(userService)
const authController = new AuthController(authService)

//--> IOC
//--> DI Container: Chứa các phần phụ thuộc (dependency), tự động khởi tạo, tìm nạp
*/