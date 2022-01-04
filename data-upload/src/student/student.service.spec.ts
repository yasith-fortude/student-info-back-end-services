import { Test, TestingModule } from '@nestjs/testing';
import { StudentService } from './student.service';
import { Queue } from 'bull';
import { getQueueToken } from '@nestjs/bull';

describe('StudentService', () => {
  let service: StudentService;
  let studentDataStoreQueue: Queue;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentService],
    })
      .overrideProvider(getQueueToken('student-data-store'))
      .useValue({})
      .compile();

    service = module.get<StudentService>(StudentService);
    studentDataStoreQueue = module.get('student-data-store');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addToQueue', () => {
    it('should add a job to queue', () => {
      expect(studentDataStoreQueue.add).toBeCalledTimes(1);
    });
  });
});
