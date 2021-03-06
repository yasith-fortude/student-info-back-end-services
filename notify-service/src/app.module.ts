import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './models/student/student.module';
import { BullModule } from '@nestjs/bull';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './src/config/.env',
      isGlobal: true,
    }),
    StudentModule,
    BullModule.forRoot({
      redis: {
        host: process.env.redisHost,
        port: Number(process.env.redisPort),
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
