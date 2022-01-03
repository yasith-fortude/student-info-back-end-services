import { InputType, Field, Int } from '@nestjs/graphql';

/**
 *  Used for both dto & GraphQL input type
 */
@InputType() 
export class UpdateStudentInput {
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

    @Field(() => Date)
    dateOfBirth: Date;
}