import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { CreateStudentInput } from './dto/createStudent.input';
import { UpdateStudentInput } from './dto/updateStudent.input';
import { RemoveStudentInput } from './dto/removeStudent.input';
import { Student } from './student.entity';
import { Student as StudentObjectType } from './student.object';

/**
 * GraphQL resolver layer for student object
 */
@Resolver(() => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Query(() => [StudentObjectType], { name: 'students' }) // get all students
  getStudents(): Promise<any[]> {
    try {
      return this.studentService.findAll(); 
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Mutation(() => StudentObjectType) // create student
  async createStudent(@Args('student') student: CreateStudentInput) {
    try {
      return await this.studentService.create(student);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Mutation(() => [StudentObjectType]) // create multiple students
  async createStudents(@Args({ name: 'students', type: () => [CreateStudentInput] }) students: [CreateStudentInput]) {
    try {
      const data = await this.studentService.bulkCreate(students);
      return data.generatedMaps;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Mutation(() => StudentObjectType) // update a student
  async updateStudent(@Args('student') student: UpdateStudentInput) {
    try {
      return await this.studentService.update(student);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Mutation(() => StudentObjectType) // remove a student
  async removeStudent(@Args('student') student: RemoveStudentInput) {
    try {
      return await this.studentService.updateStudentStatus({ ...student, isActive: false });
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
