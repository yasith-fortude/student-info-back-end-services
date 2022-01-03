import { InputType, Field } from '@nestjs/graphql';

/**
 *  Used for both dto & GraphQL input type
 */
@InputType() 
export class CreateStudentInput {
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