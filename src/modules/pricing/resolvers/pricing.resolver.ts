import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { PricingService } from "../services/pricing.service";
import { ParkingPrice } from "../entities/parking-price.entity";
import { CreatePriceInput } from "../dto/create-price.input";

@Resolver()
export class PricingResolver {


    constructor(
        private readonly pricingService: PricingService
    ) { }



    @Mutation(() => ParkingPrice)
    async createPricing(
        @Args('input') input: CreatePriceInput,
    ): Promise<ParkingPrice> {
        return this.pricingService.create(input);
    }

}