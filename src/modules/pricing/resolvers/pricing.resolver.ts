import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { PricingService } from '../services/pricing.service';

import { ParkingPrice } from '../entities/parking-price.entity';

import { CreatePricingInput } from '../dto/create-pricing.input';
import { UpdatePricingInput } from '../dto/update-pricing.input';

import { VehicleType } from '../../vehicles/enums/vehicle-type.enum';
import { UseGuards } from '@nestjs/common';
import { GraphqlJwtAuthGuard } from 'src/common/guards/graphql-jwt.guard';
import { GraphqlRolesGuard } from 'src/common/guards/graphql-roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/modules/users/enums/user-role.enum';

@UseGuards(GraphqlJwtAuthGuard, GraphqlRolesGuard)
@Roles(UserRole.ADMIN)
@Resolver(() => ParkingPrice)
export class PricingResolver {
  constructor(private readonly pricingService: PricingService) {}

  @Query(() => [ParkingPrice])
  pricing() {
    return this.pricingService.findAll();
  }

  @Query(() => ParkingPrice)
  pricingByVehicle(
    @Args('vehicleType', {
      type: () => VehicleType,
    })
    vehicleType: VehicleType,
  ) {
    return this.pricingService.findByVehicleType(vehicleType);
  }

  @Mutation(() => ParkingPrice)
  createPricing(
    @Args('input')
    input: CreatePricingInput,
  ) {
    return this.pricingService.create(input);
  }

  @Mutation(() => ParkingPrice)
  updatePricing(
    @Args('id', {
      type: () => Int,
    })
    id: number,

    @Args('input')
    input: UpdatePricingInput,
  ) {
    return this.pricingService.update(id, input);
  }

  @Mutation(() => Boolean)
  deletePricing(
    @Args('id', {
      type: () => Int,
    })
    id: number,
  ) {
    return this.pricingService.remove(id);
  }
}
