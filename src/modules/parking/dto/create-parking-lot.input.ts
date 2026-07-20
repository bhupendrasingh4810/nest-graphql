import {
    Field,
    InputType,
} from '@nestjs/graphql';

import {
    IsLatitude,
    IsLongitude,
    IsNotEmpty,
    IsPostalCode,
    IsString,
    Length,
} from 'class-validator';

/**
 * Input received from GraphQL
 * while creating a parking lot.
 */
@InputType()
export class CreateParkingLotInput {

    /**
     * Parking lot name.
     */
    @Field()
    @IsString()
    @Length(3, 150)
    name!: string;

    /**
     * Unique parking code.
     */
    @Field()
    @IsString()
    @Length(2, 30)
    code!: string;

    /**
     * Address.
     */
    @Field()
    @IsNotEmpty()
    address!: string;

    /**
     * City.
     */
    @Field()
    @IsString()
    @Length(2, 100)
    city!: string;

    /**
     * State.
     */
    @Field()
    @IsString()
    @Length(2, 100)
    state!: string;

    /**
     * Country.
     */
    @Field()
    @IsString()
    @Length(2, 100)
    country!: string;

    /**
     * Postal Code.
     */
    @Field()
    @IsPostalCode('any')
    postalCode!: string;

    /**
     * Latitude.
     */
    @Field()
    @IsLatitude()
    latitude!: number;

    /**
     * Longitude.
     */
    @Field()
    @IsLongitude()
    longitude!: number;
}