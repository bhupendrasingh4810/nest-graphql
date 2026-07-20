import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
} from '@nestjs/common';

import { ParkingService } from '../services/parking.service';

import { ParkingLot } from '../entities/parking-lot.entity';

import { CreateParkingLotInput } from '../dto/create-parking-lot.input';

import { UpdateParkingLotInput } from '../dto/update-parking-lot.input';

/**
 * REST Controller.
 *
 * Handles HTTP requests.
 */
@Controller('parking-lots')
export class ParkingController {

    constructor(

        /**
         * Business layer.
         */
        private readonly parkingService: ParkingService,

    ) { }

    /**
     * Create Parking Lot.
     *
     * POST /parking-lots
     */
    @Post()
    async create(

        @Body()
        input: CreateParkingLotInput,

    ): Promise<ParkingLot> {

        return this.parkingService.createParkingLot(
            input,
        );

    }

    /**
     * Get all parking lots.
     *
     * GET /parking-lots
     */
    @Get()
    async findAll(): Promise<ParkingLot[]> {

        return this.parkingService.getParkingLots();

    }

    /**
     * Get one parking lot.
     *
     * GET /parking-lots/1
     */
    @Get(':id')
    async findOne(

        @Param(
            'id',
            ParseIntPipe,
        )
        id: number,

    ): Promise<ParkingLot> {

        return this.parkingService.getParkingLotById(
            id,
        );

    }

    /**
     * Update parking lot.
     *
     * PATCH /parking-lots/1
     */
    @Patch(':id')
    async update(

        @Param(
            'id',
            ParseIntPipe,
        )
        id: number,

        @Body()
        input: UpdateParkingLotInput,

    ): Promise<ParkingLot> {

        /**
         * Always trust URL id.
         */
        input.id = id;

        return this.parkingService.updateParkingLot(
            input,
        );

    }

    /**
     * Delete parking lot.
     *
     * DELETE /parking-lots/1
     */
    @Delete(':id')
    async delete(

        @Param(
            'id',
            ParseIntPipe,
        )
        id: number,

    ): Promise<void> {

        await this.parkingService.deleteParkingLot(
            id,
        );

    }

}