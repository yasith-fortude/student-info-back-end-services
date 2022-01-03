import { ObjectType, Field, Int } from '@nestjs/graphql';

/**
 * GraphQL student object type 
 */
@ObjectType()
export class Student {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  gender: string;

  @Field(() => String)
  address: string;

  @Field(() => String)
  contact: string;

  @Field(() => String)
  dateOfBirth: string;

  @Field(() => Int)
  age: number;

  @Field(() => Boolean)
  isActive: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Int)
  version: number;
}