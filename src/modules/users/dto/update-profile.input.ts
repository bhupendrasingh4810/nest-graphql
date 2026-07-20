import {
    Field,
    InputType,
} from '@nestjs/graphql';


import {
    IsOptional,
    IsString,
    MaxLength,
} from 'class-validator';



@InputType()
export class UpdateProfileInput {


    /**
     * Updated full name.
     */
    @Field({
        nullable: true,
    })
    @IsOptional()
    @IsString()
    @MaxLength(100)
    fullName?: string;



    /**
     * Updated phone number.
     */
    @Field({
        nullable: true,
    })
    @IsOptional()
    @IsString()
    phone?: string;

}