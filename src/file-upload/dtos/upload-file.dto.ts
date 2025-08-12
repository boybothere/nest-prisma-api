import { IsOptional, IsString, MaxLength } from "class-validator";

export class UploadFileDto {
    @IsOptional()
    @IsString()
    @MaxLength(500, { message: 'Description cannot exceed 500 characters' })
    description?: string
}