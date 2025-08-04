import { Module } from '@nestjs/common';
import { UserSettingController } from './user-setting.controller';
import { UsersModule } from 'src/users/users.module';
import { UserSettingService } from './user-setting.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [UserSettingController],
  imports: [UsersModule, PrismaModule],
  providers: [UserSettingService]
})
export class UserSettingModule { }
