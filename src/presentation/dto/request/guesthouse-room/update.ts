import { GuesthouseRoom, RoomType } from "../../../../domain/entity/guesthouse-room";
import { GuesthouseRoomPricingRequest } from "./pricing";

export class UpdateGuesthouseRoomRequest {
    constructor(
        public name: string,
        public type: RoomType,
        public facilities: string,
        public total_slot: number,
        public area_m2: number,
        public room_pricing: GuesthouseRoomPricingRequest[],
    ) { }

    public static toEntity(data: UpdateGuesthouseRoomRequest): GuesthouseRoom {
        return new GuesthouseRoom(
            0,
            0,
            data.name,
            data.type,
            data.facilities,
            data.total_slot,
            data.total_slot,
            data.area_m2,
            data.room_pricing.map(pricing => GuesthouseRoomPricingRequest.toEntity(pricing)),
            [],
        );
    }

}