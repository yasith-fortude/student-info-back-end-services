import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './models/student/student.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    StudentModule,
    BullModule.forRoot({ // import bull queue module & config
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
