import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateGroupPostDto {

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    description: string;


    @IsNumber()
    usersId: number;
}