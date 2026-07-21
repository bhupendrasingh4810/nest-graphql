import { registerEnumType } from '@nestjs/graphql';

/**
 * Overall status of a parking lot.
 */
export enum ParkingLotStatus {
  /**
   * Parking lot is operational.
   */
  ACTIVE = 'ACTIVE',

  /**
   * Parking lot is temporarily closed.
   */
  INACTIVE = 'INACTIVE',

  /**
   * Parking lot is under maintenance.
   */
  MAINTENANCE = 'MAINTENANCE',
}

/**
 * Register enum with GraphQL.
 */
registerEnumType(ParkingLotStatus, {
  name: 'ParkingLotStatus',
});
