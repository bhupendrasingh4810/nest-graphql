// ============================================================================
// src/modules/pricing/dto/update-pricing.input.ts
// ============================================================================

import { InputType, PartialType } from '@nestjs/graphql';

import { CreatePricingInput } from './create-pricing.input';

@InputType()
export class UpdatePricingInput extends PartialType(CreatePricingInput) {}
