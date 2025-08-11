import { Injectable, UnauthorizedException } from '@nestjs/common';
import { create } from 'domain';
import { User } from 'generated/prisma';
import { connect } from 'http2';
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

    async createGroupPost(data: any, user: any, id: number) {
        if (id !== user.id) throw new UnauthorizedException('Unauthorized access')
        const { usersId, ...postData } = data
        const allUserIds = [...usersId, user.id]
        const newGroupPost = await this.prisma.groupPosts.create({
            data: {
                ...postData,
                users: {
                    create: allUserIds.map(userId => ({
                        user: {
                            connect: {
                                id: userId
                            }
                        }
                    }))
                }
            }, include: {
                users: {
                    select: {
                        user: {
                            select: {
                                username: true,
                                displayName: true,
                            }
                        }
                    }
                }
            }
        })
        return newGroupPost
    }

    async getMyGroupPosts(id: number, user: User) {
        if (id !== user.id) throw new UnauthorizedException('Unauthorized access')
        const findGroupPostIds = await this.prisma.usersToGroupPosts.findMany({
            where: { userId: id }
        })
        const postsIds = [...findGroupPostIds.map(post => post.groupPostId)]
        return await this.prisma.groupPosts.findMany({
            where: { id: { in: postsIds } }
        })
    }

}
