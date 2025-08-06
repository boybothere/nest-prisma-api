import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { LoginUserType } from './types/login-user.types';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'generated/prisma';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    async createUser(data: Prisma.UserCreateInput) {
        const user = await this.prisma.user.findUnique({
            where: { username: data.username }
        })
        if (user) throw new HttpException('Username already taken', HttpStatus.BAD_REQUEST)
        const newUser = await this.prisma.user.create({
            data: {
                username: data.username,
                password: await this.hashPassword(data.password),
                displayName: data.displayName ?? "",
                userSetting: {
                    create: {
                        notificationsEnabled: true,
                        smsEnabled: true,
                    }
                }
            },
            include: {
                userSetting: true,
                posts: true,
            }
        })
        const { password, ...userDetails } = newUser
        return {
            userDetails,
            message: "User registered successfully"
        }
    }



    async loginUser(data: LoginUserType) {
        const findUser = await this.prisma.user.findUnique({
            where: { username: data.username },
            include: { userSetting: true }
        })
        if (!findUser) throw new NotFoundException("User not found!")
        const passwordMatch = await bcrypt.compare(data.password, findUser.password)
        if (!passwordMatch) throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST)
        const tokens = await this.generateTokens(findUser)
        const user = {
            ...findUser,
            ...tokens,

        }
        const { password, ...userDetails } = user
        return {
            userDetails,
            message: "User logged in successfully"
        }
    }

    private async generateTokens(user) {
        return {
            accessToken: await this.generateAccessToken(user),
            refreshToken: await this.generateRefreshToken(user)
        }
    }

    private async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10)
    }

    private async generateAccessToken(user) {
        const payload = {
            sub: user.id,
            username: user.username,
            displayName: user.displayName ?? ""
        }

        return this.jwtService.sign(payload, {
            secret: this.configService.get<string>('JWT_SECRET')!,
            expiresIn: '30m',
        })
    }

    private async generateRefreshToken(user) {
        const payload = {
            sub: user.id,
            username: user.username,
            displayName: user.displayName ?? ""
        }

        return this.jwtService.sign(payload, {
            secret: this.configService.get<string>('REFRESH_SECRET')!,
            expiresIn: '7d',
        })
    }
}
