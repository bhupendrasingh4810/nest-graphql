import {
    Body,
    Controller,
    Post,
    UseGuards,
} from '@nestjs/common';


import {
    ParkingAdminService,
} from '../services/parking-admin.service';


import {
    CreateParkingLotInput,
} from '../dto/create-parking-lot.input';


import {
    CreateFloorInput,
} from '../dto/create-parking-floor.input';


import {
    CreateSlotInput,
} from '../dto/create-parking-slot.input';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UserRole } from 'src/modules/users/enums/user-role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';



/**
 * Admin REST APIs.
 */
@Controller(
    'admin/parking',
)
@UseGuards(
    JwtAuthGuard,
    RolesGuard,
)
@Roles(
    UserRole.ADMIN,
)
export class ParkingAdminController {



    constructor(

        private readonly parkingAdminService:
            ParkingAdminService,

    ) { }



    /**
     * Create parking lot.
     *
     * POST
     *
     * /admin/parking
     */
    @Post()
    async createParkingLot(

        @Body()
        input: CreateParkingLotInput,

    ) {


        return this.parkingAdminService
            .createParkingLot(
                input,
            );

    }





    /**
     * Create floor.
     *
     * POST
     *
     * /admin/parking/floor
     */
    @Post(
        'floor',
    )
    async createFloor(

        @Body()
        input: CreateFloorInput,

    ) {


        return this.parkingAdminService
            .createFloor(
                input,
            );

    }





    /**
     * Create slot.
     *
     * POST
     *
     * /admin/parking/slot
     */
    @Post(
        'slot',
    )
    async createSlot(

        @Body()
        input: CreateSlotInput,

    ) {


        return this.parkingAdminService
            .createSlot(
                input,
            );

    }


}