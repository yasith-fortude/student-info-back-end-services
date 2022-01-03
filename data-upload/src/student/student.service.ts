import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

/**
 * Student service layer
 */
@Injectable()
export class StudentService {
    constructor( // initialize queue object
        @InjectQueue('student-data-store') private readonly studentDataStoreQueue: Queue,
    ) {}

    async addToQueue(file: Express.Multer.File): Promise<string> {
        await this.studentDataStoreQueue.add({ fileName: file.filename }); // add to queue

        return '';
    }
}
