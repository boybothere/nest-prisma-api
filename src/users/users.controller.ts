import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getUsersById(@Param('id', ParseIntPipe) id: number,
        @CurrentUser() user: any) {
        return await this.usersService.getUsersById(id, user)
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async updateUsernameById(@Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto,
        @CurrentUser() user: any) {
        return await this.usersService.updateUsernameById(id, updateUserDto, user)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteUserById(@Param('id', ParseIntPipe) id: number,
        @CurrentUser() user: any) {
        return await this.usersService.deleteUserById(id, user)
    }


}
