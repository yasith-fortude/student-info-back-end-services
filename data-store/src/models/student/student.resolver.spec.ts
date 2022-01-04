import { Test, TestingModule } from '@nestjs/testing';
import { CreateStudentInput } from './dto/createStudent.input';
import { RemoveStudentInput } from './dto/removeStudent.input';
import { UpdateStudentInput } from './dto/updateStudent.input';
import { StudentResolver } from './student.resolver';
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

describe('StudentResolver', () => {
  let resolver: StudentResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentResolver,
        {
          provide: StudentService,
          useFactory: () => ({
            findAll: jest.fn(() => studentTableDataMock),
            create: jest.fn((student: CreateStudentInput) => {
              return {
                ...studentTableDataMock[0],
                id: 1,
                ...student,
              };
            }),
            bulkCreate: jest.fn((students: [CreateStudentInput]) => students),
            update: jest.fn((student: UpdateStudentInput) => {
              return {
                ...studentTableDataMock[0],
                ...student,
              };
            }),
            updateStudentStatus: jest.fn((student: RemoveStudentInput) => {
              return {
                ...studentTableDataMock[0],
                ...student,
              };
            }),
          }),
        },
      ],
    }).compile();

    resolver = module.get<StudentResolver>(StudentResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  /** test 'getStudents' resolver method */
  describe('getStudents', () => {
    it('should get the list of students', async () => {
      expect(await resolver.getStudents()).toEqual(studentTableDataMock);
    });
  });

  /** test 'createStudent' resolver method */
  describe('createStudent', () => {
    it('should create a student', async () => {
      expect(
        await resolver.createStudent({
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

  /** test 'createStudents' resolver method */
  describe('createStudents', () => {
    it('should create students', async () => {
      expect(
        await resolver.createStudents([
          {
            firstName: 'Jane',
            lastName: 'Edurosa',
            gender: 'Male',
            address: 'VDSF, BD, BSD',
            contact: '0768654943',
            dateOfBirth: new Date('2000-04-04'),
          },
        ]),
      ).toEqual([
        {
          firstName: 'Jane',
          lastName: 'Edurosa',
          gender: 'Male',
          address: 'VDSF, BD, BSD',
          contact: '0768654943',
          dateOfBirth: new Date('2000-04-04'),
        },
      ]);
    });
  });

  /** test 'updateStudent' resolver method */
  describe('updateStudent', () => {
    it('should update a student', async () => {
      expect(
        await resolver.updateStudent({
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

  /** test 'removeStudent' resolver method */
  describe('removeStudent', () => {
    it('should remove a student', async () => {
      expect(
        await resolver.removeStudent({
          id: 1,
        }),
      ).toEqual(studentTableDataMock[0]);
    });
  });
});
