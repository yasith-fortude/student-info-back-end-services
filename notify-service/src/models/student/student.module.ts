import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { BullModule } from '@nestjs/bull';
import { StudentConsumer } from './student.consumer';
import { EventsModule } from 'src/events/events.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    BullModule.registerQueue(
      { name: 'student-data-store' }, // initialize connection to 'student-data-store' queue
    ),
    EventsModule,
    HttpModule,
  ],
  providers: [StudentService, StudentConsumer],
  controllers: [],
})
export class StudentModule {}
