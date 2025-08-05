import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UserSettingService } from './user-setting/user-setting.service';
import { UserSettingModule } from './user-setting/user-setting.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [UsersModule, UserSettingModule, PrismaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, UserSettingService],
})
export class AppModule { }
