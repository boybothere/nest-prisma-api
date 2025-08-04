import { Body, Controller, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { UserSettingService } from './user-setting.service';
import { UpdateUserSettingDto } from './dtos/update-user-setting.dto';

@Controller('user-setting')
export class UserSettingController {
    constructor(private userSettingService: UserSettingService) { }

    @Patch(':id/settings')
    async updateUserSettingByUserId(@Param('id', ParseIntPipe) id: number,
        @Body() updateUserSettingsDto: UpdateUserSettingDto) {
        return await this.userSettingService.updateUserSettingByUserId(id, updateUserSettingsDto)
    }

}
