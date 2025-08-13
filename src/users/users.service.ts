import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async getUserToValidate(id: number) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        })
        if (!user) throw new NotFoundException(`User with ID ${id} not found`)
        const { password, ...rest } = user
        return rest
    }
    async getUsersById(id: number, userFromRequest: any) {
        if (id !== userFromRequest.id) throw new UnauthorizedException("Unauthorized access")
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                userSetting: {
                    select: {
                        smsEnabled: true,
                        notificationsEnabled: true,
                    }
                },
                posts: true,
                groupPosts: {
                    select: {
                        groupPost: true
                    }
                },
                files: true
            }
        })
        if (!user) throw new NotFoundException(`User with ID ${id} not found`)
        const { password, ...rest } = user
        return rest
    }



    async updateUsernameById(id: number, data: Prisma.UserUpdateInput, userFromRequest: any) {
        if (id !== userFromRequest.id) throw new UnauthorizedException("Unauthorized access")
        const user = await this.getUsersById(id, userFromRequest)
        if (!user) throw new NotFoundException(`User with given ID ${id} doesn't exist`)
        if (data.username) {
            const findUser = await this.prisma.user.findUnique({
                where: { username: data.username as string }
            })
            if (findUser && findUser.id !== id) throw new HttpException(`Username already taken`, HttpStatus.BAD_REQUEST)
        }

        await this.prisma.user.update({ where: { id }, data })
        return { message: "User details updated successfully" }
    }

    async deleteUserById(id: number, userFromRequest: any) {
        if (id !== userFromRequest.id) throw new UnauthorizedException("Unauthorized access")
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: { userSetting: true, posts: true, groupPosts: true, files: true },
        })
        if (!user) throw new NotFoundException(`User with given ID ${id} doesn't exist`)

        await this.prisma.$transaction(async (tx) => {
            await this.prisma.userSetting.delete({
                where: { userId: id },
            });
            if (user.posts) {
                await this.prisma.post.deleteMany({
                    where: { userId: id },
                });
                if (user.groupPosts) {
                    await this.prisma.usersToGroupPosts.deleteMany({
                        where: { userId: id }
                    })
                }
                if (user.files) {
                    await this.prisma.file.deleteMany({
                        where: { userId: id }
                    })
                }
                await this.prisma.user.delete({ where: { id } })
            }
        })


        return { message: "User deleted successfully" };

    }
}
