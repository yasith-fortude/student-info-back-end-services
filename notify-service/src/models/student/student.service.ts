import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import readXlsxFile, * as readXlsxFiles from 'read-excel-file/node';
import { lastValueFrom, map, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { CreateStudentDto as CreateStudentInput } from './dto/createStudent.dto';
import { EventsGateway } from 'src/events/events.gateway';
import moment, * as moments from 'moment';
import { ConfigService } from '@nestjs/config';

/**
 * Student service layer
 */
@Injectable()
export class StudentService {
  constructor(
    private readonly httpService: HttpService,
    private readonly eventsGateway: EventsGateway,
    private readonly configService: ConfigService,
  ) {}

  async readStudentData(fileName: string): Promise<any> {
    let data;
    const studentData: any = [];
    readXlsxFile(`./upload/${fileName}`).then(async (rows) => {
      // read uploaded excel file
      // rows is an array consisting rows of the excel sheet, which each row is an array consists of cells
      rows.map(async (row, rIndex) => {
        data = {};
        if (rIndex !== 0) {
          // ignore heading row
          row.map((cell, cIndex) => {
            cIndex === 0 && (data = { ...data, firstName: cell });
            cIndex === 1 && (data = { ...data, lastName: cell });
            cIndex === 2 && (data = { ...data, dateOfBirth: cell });
            cIndex === 3 && (data = { ...data, gender: cell });
            cIndex === 4 && (data = { ...data, address: cell });
            cIndex === 5 && (data = { ...data, contact: cell.toString() });
          });
          const storeData = data; // create data object

          studentData.push(storeData);
        }
      });
      const students = await this.saveStudentData(studentData);

      let date;
      students.forEach((student: any) => {
        date = moments(student.dateOfBirth.toString(), 'x').format(
          'YYYY-MM-DD',
        );
        // send data using socket 'events' event (broadcast to dashboard service)
        this.eventsGateway.server.emit('events', {
          ...student,
          age: moments().diff(date, 'years'),
          dateOfBirth: date,
        });
      });
    });
  }

  async saveStudentData(
    students: CreateStudentInput[],
  ): Promise<Observable<AxiosResponse<any[], any>>> {
    const CREATE_STUDENTS = `
      mutation CreateStudents(
        $students: [CreateStudentInput!]!,
        ) {
        createStudents(students: $students) {
          id
          firstName
          lastName
          gender
          address
          contact
          dateOfBirth
        }
      }
    `;

    const data = await lastValueFrom(
      this.httpService
        .post(
          this.configService.get<string>('DATA_STORE_GRAPHQL_URL'),
          {
            query: CREATE_STUDENTS,
            variables: { students },
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .pipe(map((response) => response.data)),
    ).catch((error) => {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    });

    return data.data.createStudents;
  }
}
