import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { LoggerInterceptor } from 'src/common/interceptors/logger.interceptor';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }


    @Post('register')
    async createUser(@Body() registerUserDto: RegisterUserDto) {
        return await this.authService.createUser(registerUserDto)
    }

    @UseInterceptors(LoggerInterceptor)
    @Post('login')
    async loginUser(@Body() loginUserDto: LoginUserDto) {
        return await this.authService.loginUser(loginUserDto)
    }
}
