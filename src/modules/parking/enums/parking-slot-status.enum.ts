import { registerEnumType } from '@nestjs/graphql';

/**
 * Current slot status.
 */
export enum ParkingSlotStatus {
    AVAILABLE = 'AVAILABLE',

    OCCUPIED = 'OCCUPIED',

    MAINTENANCE = 'MAINTENANCE',

    RESERVED = 'RESERVED',

    OUT_OF_SERVICE = 'OUT_OF_SERVICE',
}

registerEnumType(ParkingSlotStatus, {
    name: 'ParkingSlotStatus',
});