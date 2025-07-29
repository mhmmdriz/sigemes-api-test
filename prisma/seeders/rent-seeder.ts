import { Rent, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma: PrismaClient = new PrismaClient();

export async function seedRents(): Promise<void> {
    const rentData: Rent[] = [
        {
            id: 1,
            renterId: 2,
            guesthouseRoomPricingId: 1,
            slot: 1,
            startDate: new Date('2025-02-25'),
            endDate: new Date('2025-02-27'),
            renterGender: "laki_laki",
            status: "dikonfirmasi",
            createdAt: new Date(),
            updatedAt: new Date(),
            cityHallPricingId: null,
            checkIn: null,
            checkOut: null
        },
        {
            id: 2,
            renterId: 2,
            guesthouseRoomPricingId: 10,
            slot: 2,
            startDate: new Date('2025-02-25'),
            endDate: new Date('2025-02-27'),
            renterGender: "laki_laki",
            status: "selesai",
            createdAt: new Date(),
            updatedAt: new Date(),
            cityHallPricingId: null,
            checkIn: null,
            checkOut: null
        },
        {
            id: 3,
            renterId: 1,
            guesthouseRoomPricingId: 6,
            slot: 1,
            startDate: new Date('2025-02-28'),
            endDate: new Date('2025-03-01'),
            renterGender: "perempuan",
            status: "dikonfirmasi",
            createdAt: new Date(),
            updatedAt: new Date(),
            cityHallPricingId: null,
            checkIn: null,
            checkOut: null
        },
        {
            id: 4,
            renterId: 1,
            cityHallPricingId: 1,
            slot: 1,
            startDate: new Date('2025-02-25'),
            endDate: new Date('2025-02-27'),
            renterGender: "perempuan",
            status: "selesai",
            createdAt: new Date(),
            updatedAt: new Date(),
            guesthouseRoomPricingId: null,
            checkIn: null,
            checkOut: null
        },
    ];

    for (let i = 0; i < 500; i++) {
        const startDate = new Date(`2024-${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}`);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 1);

        rentData.push({
            id: i + 5,
            renterId: Math.floor(Math.random() * 100) + 5,
            guesthouseRoomPricingId: Math.floor(Math.random() * 24) + 1,
            cityHallPricingId: null,
            slot: Math.floor(Math.random() * 2) + 1,
            startDate: startDate,
            endDate: endDate,
            renterGender: i % 2 === 0 ? "laki_laki" : "perempuan",
            status: "selesai",
            createdAt: new Date(),
            updatedAt: new Date(),
            checkIn: null,
            checkOut: null
        });
    }

    for (let i = 500; i < 1000; i++) {
        const startDate = new Date(`2024-${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}`);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 1);

        rentData.push({
            id: i + 5,
            renterId: Math.floor(Math.random() * 100) + 5,
            cityHallPricingId: Math.floor(Math.random() * 3) + 1,
            guesthouseRoomPricingId: null,
            slot: Math.floor(Math.random() * 2) + 1,
            startDate: startDate,
            endDate: endDate,
            renterGender: i % 2 === 0 ? "laki_laki" : "perempuan",
            status: "selesai",
            createdAt: new Date(),
            updatedAt: new Date(),
            checkIn: null,
            checkOut: null
        });
    }

    await prisma.rent.createMany({
        data: rentData,
    });

}