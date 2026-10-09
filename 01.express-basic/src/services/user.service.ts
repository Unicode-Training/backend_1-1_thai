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

        // return Promise.all([
        //     prisma.user.findMany({
        //         ...(select ? { select: selectObject } : {}),
        //         orderBy: {
        //             createdAt: sort === 'latest' ? 'desc' : 'asc'
        //         },
        //         where: {
        //             ...(q ? {
        //                 fullName: {
        //                     contains: q,
        //                     mode: "insensitive"
        //                 }
        //             } : {}),
        //             ...(status ? {
        //                 status
        //             } : {}),
        //         },
        //         take: +limit,
        //         skip: (page - 1) * limit,
        //         include: {
        //             posts: true
        //         }
        //     }),
        //     prisma.user.count({
        //         where: {
        //             ...(q ? {
        //                 fullName: {
        //                     contains: q,
        //                     mode: "insensitive"
        //                 }
        //             } : {}),
        //             ...(status ? {
        //                 status
        //             } : {}),
        //         },
        //     })
        // ]);

        return prisma.user.findMany({
            // select: {
            //     id: true,
            //     fullName: true,
            //     email: true,
            //     _count: {
            //         select: {
            //             posts: true
            //         }
            //     }
            // }
            // where: {
            //     posts: {
            //         none: {}
            //     }
            // },
            include: {
                _count: {
                    select: {
                        posts: true
                    }
                },
                posts: {
                    orderBy: {
                        createdAt: 'desc'
                    },
                    take: 2,

                }
            }
        });
    },

    find(id: number) {
        return prisma.user.findUnique({
            where: { id },
            include: {
                posts: {
                    where: {
                        title: {
                            contains: 'Cervus'
                        }
                    }
                }
            }
        })
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
    },

    async assignPost(id: number) {
        // const postId = 1;
        // return prisma.post.update({
        //     where: {
        //         id: postId
        //     },
        //     data: {
        //         userId: id
        //     }
        // })
        // return prisma.user.update({
        //     where: { id },
        //     data: {
        //         posts: {
        //             connect: {
        //                 id: postId
        //             },
        //             update: {
        //                 where: {
        //                     id: 11,
        //                 },
        //                 data: {
        //                     // title: "Hello anh em 1"
        //                     id: 11
        //                 }
        //             }
        //         }
        //     }
        // });

        return prisma.user.update({
            where: { id },
            data: {
                phones: {
                    // update: {
                    //     phone: "011112"
                    // }
                    upsert: {
                        where: {
                            userId: id
                        },
                        update: {
                            phone: "011112"
                        },
                        create: {
                            phone: "01111"
                        }
                    }
                }
            }
        })
    },

    async updateImages(images: string[], userId: number) {
        //Lấy danh sách các bản ghi trên Db
        const imagesFromDb = await prisma.userImage.findMany({
            where: { userId }
        });


        await prisma.$transaction(async (tx) => {
            if (!images) {
                return;
            }
            //Tìm ảnh cần insert vào data
            const onImageCreate = images.filter((image) => !imagesFromDb.find(val => image === val.url)).map((val) => ({
                url: val,
                userId
            }));

            //Tìm ảnh cần xóa trên DB
            const onImageDelete = imagesFromDb.filter((val) => !images.includes(val.url)).map(val => val.id);

            await tx.userImage.createMany({
                data: onImageCreate,
                skipDuplicates: true
            });

            await tx.userImage.deleteMany({
                where: {
                    id: {
                        in: onImageDelete
                    }
                }
            })
        });

        // await prisma.$transaction([
        //     prisma.userImage.createMany({
        //         data: onImageCreate,
        //         skipDuplicates: true
        //     }),
        //     prisma.userImage.deleteMany({
        //         where: {
        //             id: {
        //                 in: onImageDelete
        //             }
        //         }
        //     })
        // ]);

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

//some -> Có ít nhất 1 điều kiện
//every
//none -> Không có

//Khi user đăng ký tài khoản -> Không có số điện thoại
//Khi user vào cập nhật số điện thoại -> Check xem số điện được tạo chưa?
//- Đã tạo -> Update
//- Chưa tạo -> Thêm mới