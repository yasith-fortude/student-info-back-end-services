import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    BullModule.forRoot({ // initialize bull queue settings
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
    StudentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
