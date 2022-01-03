import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm'
import { getConnectionOptions } from 'typeorm';
import { StudentModule } from './models/student/student.module';

@Module({
  imports: [
    GraphQLModule.forRoot({ // import graphql module
      autoSchemaFile: './schema.gql',
      debug: true, // keep debug tool enabled
      playground: true, // keep playground tool enabled
    }),
    TypeOrmModule.forRootAsync( // import typeOrm module
      {
      useFactory: async () => // check ormconfig.json for options
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
      },
    ),
    StudentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
