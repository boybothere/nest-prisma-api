import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateGroupPostDto {

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    description: string;


    @IsArray()
    @ArrayNotEmpty()
    @IsNumber({}, { each: true })
    usersId: number[];
}