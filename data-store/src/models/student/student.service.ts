import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentInput } from './dto/createStudent.input';
import { UpdateStudentInput } from './dto/updateStudent.input';
import { RemoveStudentDto } from './dto/removeStudent.dto';

/**
 * Student service layer component to access db methods (query postgre db using typeOrm methods)
 */
@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  findAll(): Promise<any[]> {
    return this.studentRepository.query(
      `SELECT *, EXTRACT(YEAR FROM AGE("dateOfBirth")) AS "age", TO_CHAR("dateOfBirth", 'YYYY-MM-DD') as "dateOfBirth" FROM student WHERE "isActive" = true ORDER BY id ASC`,
    );
  }

  async findOne(id: number): Promise<Student> {
    return await this.studentRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.studentRepository.delete(id);
  }

  async create(student: CreateStudentInput): Promise<any> {
    return await this.studentRepository.save(student);
  }

  async bulkCreate(students: [CreateStudentInput]): Promise<any> {
    return await this.studentRepository
      .createQueryBuilder()
      .insert()
      .into(Student)
      .values(students)
      .returning('*')
      .execute();
  }

  async update(student: UpdateStudentInput): Promise<any> {
    return await this.studentRepository.save(student);
  }

  async updateStudentStatus(student: RemoveStudentDto): Promise<any> {
    return await this.studentRepository.save(student);
  }
}
