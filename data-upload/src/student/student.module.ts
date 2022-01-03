import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.registerQueue( // register 'student-data-store' queue
      { name: 'student-data-store' },
    ),
  ],
  controllers: [StudentController],
  providers: [StudentService]
})
export class StudentModule {}
