import { Injectable } from '@nestjs/common';
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

    async getMyPosts(id: number) {
        const posts = await this.prisma.post.findMany({
            where: { userId: id }
        })
        return posts
    }
}
