import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [AuthModule, PrismaModule]
})
export class PostsModule { }
