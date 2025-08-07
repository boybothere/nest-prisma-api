import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ValidateUserId } from "../decorators/validate-user.decorator";

export class CreateGroupPostDto {

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    description: string;


    @IsArray()
    @ArrayNotEmpty()
    @IsNumber({}, { each: true })
    @ValidateUserId()
    usersId: number[];
}