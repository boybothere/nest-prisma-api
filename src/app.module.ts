import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UserSettingModule } from './user-setting/user-setting.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import * as joi from 'joi';
import { UserIdExistsConstraint } from './posts/validators/validate-user.validator';

@Module({
  imports: [UsersModule, UserSettingModule, PrismaModule, AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        JWT_SECRET: joi.string().required(),
      })
    }),
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
