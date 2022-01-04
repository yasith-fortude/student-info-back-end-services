import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateStudentInput } from './dto/createStudent.input';
import { RemoveStudentDto } from './dto/removeStudent.dto';
import { UpdateStudentInput } from './dto/updateStudent.input';
import { Student } from './student.entity';
import { StudentService } from './student.service';

// student db table mock data
const studentTableDataMock = [
  {
    id: 1,
    firstName: 'Jane',
    lastName: 'Edurosa',
    gender: 'Male',
    address: 'VDSF, BD, BSD',
    contact: '0768654943',
    dateOfBirth: '2000-04-04',
    isActive: true,
    createdAt: '2021-12-06',
    updatedAt: '2021-12-06',
    version: 0,
  },
];

/** Typescript - to check object type is CreateStudentInput */
function isObjectCreateStudentInput(object: any): object is CreateStudentInput {
  return object;
}
/** Typescript - to check object type is UpdateStudentInput */
function isObjectUpdateStudentInput(object: any): object is UpdateStudentInput {
  return object;
}
/** Typescript - to check object type is RemoveStudentDto */
function isObjectRemoveStudentDto(object: any): object is RemoveStudentDto {
  return object;
}

describe('StudentService', () => {
  let service: StudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentService],
    })
      .useMocker((token) => {
        // to get user mock repository methods
        if (token === getRepositoryToken(Student)) {
          return {
            query: jest.fn(() => studentTableDataMock),
            findOne: jest.fn((id: number) => ({
              ...studentTableDataMock[0],
              id,
            })),
            delete: jest.fn((id: number) =>
              studentTableDataMock.filter((e) => e.id !== id),
            ),
            createQueryBuilder: jest.fn(
              (students: [CreateStudentInput]) => students,
            ),
            save: jest.fn(
              (
                student:
                  | CreateStudentInput
                  | UpdateStudentInput
                  | RemoveStudentDto,
              ) => {
                if (isObjectCreateStudentInput(student)) {
                  return { ...studentTableDataMock[0], ...student };
                }
                if (isObjectUpdateStudentInput(student)) {
                  return { ...studentTableDataMock[0], ...student };
                }
                if (isObjectRemoveStudentDto(student)) {
                  return { ...studentTableDataMock[0], ...student };
                }
              },
            ),
          };
        }
      })
      .compile();

    service = module.get<StudentService>(StudentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /** test 'findAll' service method */
  describe('findAll', () => {
    it('should get the list of students', async () => {
      expect(await service.findAll()).toEqual(studentTableDataMock);
    });
  });

  /** test 'findOne' service method */
  describe('findOne', () => {
    it('should get a student by id', async () => {
      expect(await service.findOne(1)).toEqual(studentTableDataMock[0]);
    });
  });

  /** test 'remove' service method */
  describe('remove', () => {
    it('should remove a student by id', async () => {
      expect(await service.remove(1)).toEqual(
        studentTableDataMock.filter((e) => e.id !== 1),
      );
    });
  });

  /** test 'create' service method */
  describe('create', () => {
    it('should create a student', async () => {
      expect(
        await service.create({
          firstName: 'Jane',
          lastName: 'Edurosa',
          gender: 'Male',
          address: 'VDSF, BD, BSD',
          contact: '0768654943',
          dateOfBirth: new Date('2000-04-04'),
        }),
      ).toEqual(studentTableDataMock[0]);
    });
  });

  /** test 'bulkCreate' service method */
  describe('bulkCreate', () => {
    it('should create students', async () => {
      expect(
        await service.bulkCreate([
          {
            firstName: 'Jane',
            lastName: 'Edurosa',
            gender: 'Male',
            address: 'VDSF, BD, BSD',
            contact: '0768654943',
            dateOfBirth: new Date('2000-04-04'),
          },
        ]),
      ).toEqual({
        firstName: 'Jane',
        lastName: 'Edurosa',
        gender: 'Male',
        address: 'VDSF, BD, BSD',
        contact: '0768654943',
        dateOfBirth: new Date('2000-04-04'),
      });
    });
  });

  /** test 'update' service method */
  describe('update', () => {
    it('should update a student', async () => {
      expect(
        await service.update({
          id: 1,
          firstName: 'Jane',
          lastName: 'Edurosa',
          gender: 'Male',
          address: 'VDSF, BD, BSD',
          contact: '0768654943',
          dateOfBirth: new Date('2000-04-04'),
        }),
      ).toEqual(studentTableDataMock[0]);
    });
  });

  /** test 'updateStudentStatus' service method */
  describe('updateStudentStatus', () => {
    it('should update status of a student', async () => {
      expect(
        await service.updateStudentStatus({
          id: 1,
          isActive: false,
        }),
      ).toEqual({ ...studentTableDataMock[0], isActive: false });
    });
  });
});
