import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async getUsersById(id: number) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                userSetting: {
                    select: {
                        smsEnabled: true,
                        notificationsEnabled: true,
                    }
                },
                posts: true
            }
        })
        if (!user) throw new NotFoundException(`User with ID ${id} not found`)
        const { password, ...rest } = user
        return rest
    }



    async updateUsernameById(id: number, data: Prisma.UserUpdateInput) {
        const user = await this.getUsersById(id)
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

    async deleteUserById(id: number) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: { userSetting: true, posts: true },
        })
        if (!user) throw new NotFoundException(`User with given ID ${id} doesn't exist`)
        if (user.userSetting) {
            await this.prisma.userSetting.delete({
                where: { userId: id },
            });
        }
        if (user.posts) {
            await this.prisma.post.deleteMany({
                where: { userId: id },
            });
        }

        await this.prisma.user.delete({ where: { id } })
        return { message: "User deleted successfully" };

    }
}
