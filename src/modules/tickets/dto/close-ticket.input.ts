import {
    Field,
    InputType,
    Int,
} from '@nestjs/graphql';


import {
    IsInt,
    Min,
} from 'class-validator';



@InputType()
export class CloseTicketInput {


    @Field(() => Int)

    @IsInt()

    @Min(1)

    ticketId!: number;

}