// ============================================================================
// src/modules/vehicle/controllers/vehicle.controller.ts
// ============================================================================

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';

import { VehicleService } from '../services/vehicle.service';

import { CreateVehicleInput } from '../dto/create-vehicle.input';
import { UpdateVehicleInput } from '../dto/update-vehicle.input';

@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  create(
    @Body()
    dto: CreateVehicleInput,
  ) {
    return this.vehicleService.create(dto);
  }

  @Get()
  findAll() {
    return this.vehicleService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.vehicleService.findOne(id);
  }

  @Get('registration/:number')
  findByRegistration(
    @Param('number')
    number: string,
  ) {
    return this.vehicleService.findByRegistration(number);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    dto: UpdateVehicleInput,
  ) {
    return this.vehicleService.update(id, dto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.vehicleService.remove(id);
  }
}
