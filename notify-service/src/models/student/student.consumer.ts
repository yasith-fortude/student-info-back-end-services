import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { StudentService } from './student.service';

/**
 * Bull queue job consumer for 'student-data-store' queue
 */
@Processor('student-data-store')
export class StudentConsumer {
  constructor(private readonly studentService: StudentService) {}

  @Process() // start processing waiting jobs in queue
  async transcode(job: Job<any>) {
    try {
      console.log(`Job ${job.id} in student-data-store queue is proccesing...`);

      this.studentService.readStudentData(job.data.fileName.toString());

      // const studentData = await this.studentService.save((job.data) as CreateStudentDto); // service method to create a student record in db

      return {};
    } catch (error) {
      console.log(error);
    }
  }

  // @OnGlobalQueueActive()
  // async onActive(jobId: any) {
  //   console.log("Active job id: ", jobId);
  // }
}
