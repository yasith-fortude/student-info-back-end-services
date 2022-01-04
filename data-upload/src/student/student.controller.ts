import {
  Controller,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { StudentService } from './student.service';

/**
 * Student controller where api endpoints defined
 */
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('upload') // post endpoint to upload a file (excel file from dashboard service)
  @UseInterceptors(
    FileInterceptor('file', {
      // used multer to save upload file with a custom name & saving location (inorder to access again to the read file)
      storage: diskStorage({
        destination: './upload',
        filename: function (req, file, cb) {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + '.xlsx');
        },
      }),
    }),
  )
  async uploadSingle(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<object> {
    try {
      await this.studentService.addToQueue(file); // use service layer method to add data to queue

      return {
        success: true,
        status: HttpStatus.CREATED,
        message: 'Upload success.',
      };
    } catch (error) {
      return { success: false, status: error.status, message: error.response };
    }
  }
}
