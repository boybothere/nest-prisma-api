import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class RegisterUserDto {
    @IsNotEmpty({ message: "Username cannot be empty" })
    @IsString({ message: "Username must be a string" })
    @MinLength(5, { message: "Username must be a minimum of length of 5 characters" })
    username: string;

    @IsNotEmpty({ message: "Email cannot be empty" })
    @IsString({ message: "Email must be a string" })
    @IsEmail()
    email: string

    @IsOptional()
    @IsString({ message: "Display Name must be a string" })
    displayName?: string;

    @IsNotEmpty({ message: "Password cannot be empty" })
    @IsString({ message: "Password must be a string" })
    @MinLength(5, { message: "Password must be of minimum length 5" })
    password: string;
}