import { registerEnumType } from '@nestjs/graphql';

/**
 * Types of parking slots.
 */
export enum ParkingSlotType {
    BIKE = 'BIKE',

    CAR = 'CAR',

    ELECTRIC = 'ELECTRIC',

    HANDICAPPED = 'HANDICAPPED',
}

registerEnumType(ParkingSlotType, {
    name: 'ParkingSlotType',
});