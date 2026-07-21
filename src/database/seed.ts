import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';

import { UserSeeder } from './seeds/user.seeder';
import { ParkingLotSeeder } from './seeds/parking-lot.seeder';
import { ParkingFloorSeeder } from './seeds/parking-floor.seeder';
import { ParkingSlotSeeder } from './seeds/parking-slot.seeder';
import { PricingSeeder } from './seeds/pricing.seeder';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);

    await app.get(UserSeeder).seed();

    await app.get(ParkingLotSeeder).seed();

    await app.get(ParkingFloorSeeder).seed();

    await app.get(ParkingSlotSeeder).seed();

    await app.get(PricingSeeder).seed();

    console.log('✅ Database seeded successfully');

    await app.close();
}

bootstrap();