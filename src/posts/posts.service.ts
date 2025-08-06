import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) { }

    async createPost(data: { title: string, description: string }, id: number) {
        const newPost = await this.prisma.post.create({
            data: {
                ...data,
                user: {
                    connect: { id }
                }
            }
        })
        return newPost
    }

    async getMyPosts(id: number, user: any) {
        if (id !== user.id) throw new UnauthorizedException("Unauthorized access")
        const posts = await this.prisma.post.findMany({
            where: { userId: id }
        })
        return posts
    }

    async createGroupPost(data: any) {
        const { usersId, ...postData } = data
        const newGroupPost = await this.prisma.groupPosts.create({
            data: {
                ...postData
            },
            include: {
                users: true
            }
        })
        return newGroupPost
    }
}
