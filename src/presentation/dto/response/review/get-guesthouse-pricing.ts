import { GuesthouseRoomPricing } from "../../../../domain/entity/guesthouse-room-pricing";

export class GetGuesthouseRoomPricingResponse {
    constructor(
        public id: number,
        public retribution_type: string,
        public price_per_day: number,
        public is_active: boolean,
    ) {}

    public static fromEntity(guesthouseRoomPricing: GuesthouseRoomPricing | null): GetGuesthouseRoomPricingResponse | undefined {
        if (guesthouseRoomPricing === null || guesthouseRoomPricing === undefined) {
            return undefined;
        }
        return new GetGuesthouseRoomPricingResponse(
            guesthouseRoomPricing.id,
            guesthouseRoomPricing.retributionType,
            guesthouseRoomPricing.pricePerDay,
            guesthouseRoomPricing.isActive,
        );
    }
}