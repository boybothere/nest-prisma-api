import { Module } from '@nestjs/common';
import { UserSettingController } from './user-setting.controller';
import { UsersModule } from 'src/users/users.module';
import { UserSettingService } from './user-setting.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtStrategy } from 'src/auth/stratigies/jwt.strategy';

@Module({
  controllers: [UserSettingController],
  imports: [UsersModule, PrismaModule],
  providers: [UserSettingService, JwtStrategy]
})
export class UserSettingModule { }
