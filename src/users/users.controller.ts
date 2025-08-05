import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }


    @Get(':id')
    async getUsersById(@Param('id', ParseIntPipe) id: number) {
        return await this.usersService.getUsersById(id)
    }

    @Patch(':id')
    async updateUsernameById(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        return await this.usersService.updateUsernameById(id, updateUserDto)
    }

    @Delete(':id')
    async deleteUserById(@Param('id', ParseIntPipe) id: number) {
        return await this.usersService.deleteUserById(id)
    }


}
