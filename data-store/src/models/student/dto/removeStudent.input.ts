import { InputType, Field, Int } from '@nestjs/graphql';

/**
 *  GraphQL input type
 */
@InputType() 
export class RemoveStudentInput {
    @Field(() => Int)
    id: number;
}