import { BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { File } from 'node:buffer';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileDto } from './dtos/upload-file.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'generated/prisma';

@Controller('files')
export class FileUploadController {
    constructor(private readonly fileUploadService: FileUploadService) {

    }

    @Post('upload')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Body() uploadFileDto: UploadFileDto,
        @CurrentUser() user: User
    ): Promise<any> {
        if (!file) throw new BadRequestException('File is not uploaded')

        return this.fileUploadService.uploadFile(file, uploadFileDto.description, user)
    }

    @Get(':id/all-files')
    @UseGuards(JwtAuthGuard)
    getAllFilesOfUser(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: User) {
        return this.fileUploadService.getAllFilesOfUser(id, user.id)
    }
}