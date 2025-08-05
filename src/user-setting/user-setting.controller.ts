import { Body, Controller, Get, Param, ParseIntPipe, Patch, Req, UseGuards } from '@nestjs/common';
import { UserSettingService } from './user-setting.service';
import { UpdateUserSettingDto } from './dtos/update-user-setting.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user-setting')
export class UserSettingController {
    constructor(private userSettingService: UserSettingService) { }


    @Get('profile')
    @UseGuards(JwtAuthGuard)
    getProfile(@Req() req) {
        return req.user;  // 👈 This is the object returned from validate()
    }


    @UseGuards(JwtAuthGuard)
    @Patch(':id/settings')
    async updateUserSettingByUserId(@Param('id', ParseIntPipe) id: number,
        @Body() updateUserSettingsDto: UpdateUserSettingDto) {
        return await this.userSettingService.updateUserSettingByUserId(id, updateUserSettingsDto)
    }

}
