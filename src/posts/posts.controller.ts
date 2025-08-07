import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PostsService } from './posts.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { CreateGroupPostDto } from './dtos/create-group-post.dto';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) { }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async createPost(@Body() createPostDto: CreatePostDto, @CurrentUser() user) {
        return await this.postsService.createPost(createPostDto, user.id)
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id/my-posts')
    async getMyPosts(@Param('id', ParseIntPipe) id: number, @CurrentUser() user) {
        return await this.postsService.getMyPosts(id, user)
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id/create-group-post')
    createGroupPost(@Body() createGroupPostDto: CreateGroupPostDto,
        @Param('id', ParseIntPipe) id: number,
        @CurrentUser() user: any) {
        return this.postsService.createGroupPost(createGroupPostDto, user, id)
    }
}
