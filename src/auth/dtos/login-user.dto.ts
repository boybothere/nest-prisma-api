import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty({ message: "Email cannot be empty" })
    @IsString({ message: "Email must be a string" })
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string;
}