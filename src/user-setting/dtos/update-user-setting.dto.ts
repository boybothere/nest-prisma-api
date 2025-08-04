import { IsBoolean, IsOptional } from "class-validator"
import { User } from "generated/prisma"

export class UpdateUserSettingDto {

    @IsOptional()
    @IsBoolean()
    smsEnabled?: boolean

    @IsOptional()
    @IsBoolean()
    notificationsEnabled?: boolean


}