import { IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto {

    @IsNotEmpty({ message: "Title cannot be empty" })
    @IsString({ message: "Title must be a string" })
    title: string;

    @IsNotEmpty({ message: "Description cannot be empty" })
    @IsString({ message: "Description must be a string" })
    description: string;

}