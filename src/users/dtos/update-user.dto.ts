import { IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    @IsString({ message: "Username must be a string" })
    username?: string;

    @IsOptional()
    @IsString({ message: "Display Name must be a string" })
    displayName?: string;
}