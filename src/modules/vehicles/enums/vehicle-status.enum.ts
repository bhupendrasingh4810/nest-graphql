import { registerEnumType } from '@nestjs/graphql';

/**
 * Current status of vehicle.
 */
export enum VehicleStatus {
    /**
     * Vehicle can park.
     */
    ACTIVE = 'ACTIVE',

    /**
     * Vehicle is disabled.
     */
    INACTIVE = 'INACTIVE',
}

/**
 * Register GraphQL enum.
 */
registerEnumType(VehicleStatus, {
    name: 'VehicleStatus',
});