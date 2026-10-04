import status from "http-status";
import { HttpException } from "../exceptions/http.exception.js";
import { prisma } from "../lib/prisma.js";
import { User } from "../prisma/generated/prisma/client.js";
import { UserQuery } from "../types/user.type.js";

export const userService = {
    findAll({ q = "", status, sort = 'latest', page = 1, limit = 10, select = "" }: UserQuery) {
        // return prisma.user.findMany({
        //     // omit: {
        //     //     password: true
        //     // },
        //     orderBy: {
        //         createdAt: 'desc'
        //     },
        //     // where: {
        //     //     OR: [
        //     //         {
        //     //             fullName: {
        //     //                 contains: 'hoàng',
        //     //                 mode: "insensitive"
        //     //             }
        //     //         },
        //     //         {
        //     //             email: {
        //     //                 contains: 'hoàng',
        //     //                 mode: "insensitive"
        //     //             }
        //     //         }
        //     //     ],
        //     //     status: "ACTIVE"
        //     // },
        //     take: 10,
        //     skip: 5,
        //     select: {
        //         id: true,
        //         fullName: true
        //     }
        // });
        //WHERE status='ACTIVE' AND (name ILIKE '%abc%' OR email ILIKE '%abc%')
        //Cursor Pagination

        const selectObject = select.split(',').filter(val => val).reduce((acc, cur) => {
            acc[cur.trim()] = true;
            return acc;
        }, {} as { [key: string]: boolean });

        return Promise.all([
            prisma.user.findMany({
                ...(select ? { select: selectObject } : {}),
                orderBy: {
                    createdAt: sort === 'latest' ? 'desc' : 'asc'
                },
                where: {
                    ...(q ? {
                        fullName: {
                            contains: q,
                            mode: "insensitive"
                        }
                    } : {}),
                    ...(status ? {
                        status
                    } : {}),
                },
                take: +limit,
                skip: (page - 1) * limit
            }),
            prisma.user.count({
                where: {
                    ...(q ? {
                        fullName: {
                            contains: q,
                            mode: "insensitive"
                        }
                    } : {}),
                    ...(status ? {
                        status
                    } : {}),
                },
            })
        ]);
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
    },

    async create(body: User) {
        try {
            return await prisma.user.create({
                data: body,
                omit: {
                    password: true
                }
            })
        } catch (error) {
            console.log(error);
            throw new HttpException("Lỗi server khi thêm user")
        }
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

//Băm token

Tyler Rutherford
yler Rutherford
ler Rutherford --> userId
er Rutherford

//keyword: ler

//Table users
//Table posts

//Tìm ra các users có title của post là abc
*/

//Model User
// - id
// - name
//1-1
//Phone
// - id
// - phone
// - userId