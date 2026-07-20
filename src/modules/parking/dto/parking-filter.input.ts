import {
    Field,
    InputType,
} from '@nestjs/graphql';


import {
    IsOptional,
    IsString,
} from 'class-validator';



@InputType()
export class ParkingFilterInput {


    /**
     * Search by address.
     */
    @Field({
        nullable: true,
    })
    @IsOptional()
    @IsString()
    address?: string;



    /**
     * Search by parking name.
     */
    @Field({
        nullable: true,
    })
    @IsOptional()
    @IsString()
    name?: string;

}