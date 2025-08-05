import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getUsersById(@Param('id', ParseIntPipe) id: number) {
        return await this.usersService.getUsersById(id)
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async updateUsernameById(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        return await this.usersService.updateUsernameById(id, updateUserDto)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteUserById(@Param('id', ParseIntPipe) id: number) {
        return await this.usersService.deleteUserById(id)
    }


}
