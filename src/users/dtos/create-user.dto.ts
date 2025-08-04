import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({ message: "Username cannot be empty" })
    @IsString({ message: "Username must be a string" })
    @MinLength(5, { message: "Username must be a minimum of length of 5 characters" })
    username: string;

    @IsOptional()
    @IsString({ message: "Display Name must be a string" })
    displayName?: string;
}