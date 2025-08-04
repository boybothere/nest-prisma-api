import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UserSettingService {
    constructor(private usersService: UsersService,
        private prisma: PrismaService
    ) { }
    async updateUserSettingByUserId(id: number, data: Prisma.UserSettingUpdateInput) {
        const user = await this.usersService.getUsersById(id)
        if (!user) throw new NotFoundException("User Not Found")
        if (!user.userSetting) {
            await this.prisma.userSetting.create({
                data: {
                    notificationsEnabled: false,
                    smsEnabled: false,
                    user: {
                        connect: { id: user.id }
                    }
                }
            })
        }
        const updatedUserSetting = await this.prisma.userSetting.update({
            where: {
                userId: user.id,
            },
            data: {
                notificationsEnabled: data.notificationsEnabled,
                smsEnabled: data.smsEnabled,
            }
        })
        return updatedUserSetting
    }
}
