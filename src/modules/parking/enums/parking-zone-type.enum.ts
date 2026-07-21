import { registerEnumType } from '@nestjs/graphql';

/**
 * Different types of parking zones.
 */
export enum ParkingZoneType {
  /**
   * Regular parking.
   */
  STANDARD = 'STANDARD',

  /**
   * VIP parking.
   */
  VIP = 'VIP',

  /**
   * Electric vehicle parking.
   */
  EV = 'EV',

  /**
   * Disabled parking.
   */
  HANDICAPPED = 'HANDICAPPED',

  /**
   * Staff parking.
   */
  STAFF = 'STAFF',
}

/**
 * Register enum with GraphQL.
 */
registerEnumType(ParkingZoneType, {
  name: 'ParkingZoneType',
});
