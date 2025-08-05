import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) { }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async createPost(@Body() createPostDto: CreatePostDto, @Req() req: any) {
        return await this.postsService.createPost(createPostDto, req.user.id)
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id/my-posts')
    async getMyPosts(@Param('id', ParseIntPipe) id: number) {
        return await this.postsService.getMyPosts(id)
    }

}
