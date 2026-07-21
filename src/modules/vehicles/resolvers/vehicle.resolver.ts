// ============================================================================
// src/modules/vehicle/resolvers/vehicle.resolver.ts
// ============================================================================

import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { VehicleService } from '../services/vehicle.service';
import { Vehicle } from '../entities/vehicle.entity';

import { CreateVehicleInput } from '../dto/create-vehicle.input';
import { UpdateVehicleInput } from '../dto/update-vehicle.input';

@Resolver(() => Vehicle)
export class VehicleResolver {
  constructor(private readonly vehicleService: VehicleService) {}

  @Query(() => [Vehicle])
  vehicles(): Promise<Vehicle[]> {
    return this.vehicleService.findAll();
  }

  @Query(() => Vehicle)
  vehicle(
    @Args('id', {
      type: () => Int,
    })
    id: number,
  ): Promise<Vehicle> {
    return this.vehicleService.findOne(id);
  }

  @Query(() => Vehicle)
  vehicleByRegistration(
    @Args('registrationNumber')
    registrationNumber: string,
  ): Promise<Vehicle> {
    return this.vehicleService.findByRegistration(registrationNumber);
  }

  @Mutation(() => Vehicle)
  createVehicle(
    @Args('input')
    input: CreateVehicleInput,
  ): Promise<Vehicle> {
    return this.vehicleService.create(input);
  }

  @Mutation(() => Vehicle)
  updateVehicle(
    @Args('id', {
      type: () => Int,
    })
    id: number,

    @Args('input')
    input: UpdateVehicleInput,
  ): Promise<Vehicle> {
    return this.vehicleService.update(id, input);
  }

  @Mutation(() => Boolean)
  deleteVehicle(
    @Args('id', {
      type: () => Int,
    })
    id: number,
  ): Promise<boolean> {
    return this.vehicleService.remove(id);
  }
}
