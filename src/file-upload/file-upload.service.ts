import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { User } from 'generated/prisma';
import { File } from '@prisma/client';

@Injectable()
export class FileUploadService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly cloudinaryService: CloudinaryService
    ) { }

    async uploadFile(file: Express.Multer.File, description: string | undefined, user: User):
        Promise<File> {
        const cloudinaryResponse = await this.cloudinaryService.uploadFile(file)
        const newlyCreatedFile = await this.prisma.file.create({
            data: {
                fileName: file.originalname,
                mimeType: file.mimetype,
                size: file.size,
                url: cloudinaryResponse.secure_url,
                publicId: cloudinaryResponse.public_id,
                description,
                user: {
                    connect: { id: user.id }
                }
            }
        })
        return newlyCreatedFile
    }

    async getAllFilesOfUser(id: number, reqId: number) {
        if (id !== reqId) throw new UnauthorizedException('Unauthorized access')
        return await this.prisma.file.findMany({
            where: { userId: id }
        })
    }
}
