import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserIdExistsConstraint } from './validators/validate-user.validator';

@Module({
  controllers: [PostsController],
  providers: [PostsService, UserIdExistsConstraint],
  imports: [PrismaModule]
})
export class PostsModule { }
