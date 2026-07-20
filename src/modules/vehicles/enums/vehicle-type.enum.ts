import { registerEnumType } from '@nestjs/graphql';

/**
 * Supported vehicle types.
 */
export enum VehicleType {
    BIKE = 'BIKE',

    CAR = 'CAR',

    SUV = 'SUV',

    TRUCK = 'TRUCK',

    BUS = 'BUS',

    ELECTRIC_CAR = 'ELECTRIC_CAR',
}

registerEnumType(VehicleType, {
    name: 'VehicleType',
});