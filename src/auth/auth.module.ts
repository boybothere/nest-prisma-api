import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './stratigies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { EventsModule } from 'events/event.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [UsersModule, PrismaModule,
    JwtModule.register({},
    ),
    EventsModule
  ],
  exports: [AuthService]
})
export class AuthModule { }
