import {

    Field,

    InputType,

    Float,

} from '@nestjs/graphql';


import {

    IsEnum,

    IsNumber,

} from 'class-validator';
import { VehicleType } from 'src/modules/vehicles/enums/vehicle-type.enum';


@InputType()
export class CreatePriceInput {


    @Field(
        () => VehicleType,
    )
    @IsEnum(
        VehicleType,
    )
    vehicleType!: VehicleType;



    @Field(
        () => Float,
    )
    @IsNumber()
    hourlyRate!: number;


}