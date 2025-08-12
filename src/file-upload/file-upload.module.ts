import { Module } from '@nestjs/common';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [CloudinaryModule,
    MulterModule.register({
      storage: memoryStorage()
    }),
    PrismaModule
  ],
  controllers: [FileUploadController],
  providers: [FileUploadService]
})
export class FileUploadModule { }
