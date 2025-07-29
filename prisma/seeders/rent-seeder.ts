import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma: PrismaClient = new PrismaClient();

export async function seedRents(): Promise<void> {

    const rentData: Prisma.RentCreateManyInput[] = [
        {
            renterId: 2,
            guesthouseRoomPricingId: 1,
            slot: 1,
            cityHallPricingId: null,
            startDate: new Date('2025-02-25'),
            endDate: new Date('2025-02-27'),
            renterGender: "laki_laki",
            status: "dikonfirmasi",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            renterId: 2,
            guesthouseRoomPricingId: 10,
            cityHallPricingId: null,
            slot: 2,
            startDate: new Date('2025-02-25'),
            endDate: new Date('2025-02-27'),
            renterGender: "laki_laki",
            status: "selesai",

        },
        {
            renterId: 1,
            guesthouseRoomPricingId: 6,
            cityHallPricingId: null,
            slot: 1,
            startDate: new Date('2025-02-28'),
            endDate: new Date('2025-03-01'),
            renterGender: "perempuan",
            status: "dikonfirmasi",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            renterId: 1,
            guesthouseRoomPricingId: null,
            cityHallPricingId: 1,
            slot: 1,
            startDate: new Date('2025-02-25'),
            endDate: new Date('2025-02-27'),
            renterGender: "perempuan",
            status: "selesai",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];

    const initialDate = new Date(2016, 9, 1);

    for (let i = 0; i < 1000; i++) {
        const startDate: Date = new Date(initialDate);
        startDate.setDate(initialDate.getDate() + (i * 3));
        const endDate: Date = new Date(startDate);
        endDate.setDate(endDate.getDate() + 1);

        rentData.push({
            renterId: Math.floor(Math.random() * 100) + 5,
            guesthouseRoomPricingId: i % 2 === 0 ? Math.floor(Math.random() * 24) + 1 : null,
            cityHallPricingId: i % 2 === 0 ? null : Math.floor(Math.random() * 3) + 1,
            slot: Math.floor(Math.random() * 2) + 1,
            startDate: startDate,
            endDate: endDate,
            renterGender: i % 2 === 0 ? "laki_laki" : "perempuan",
            status: "selesai",
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    await prisma.rent.createMany({
        data: rentData,
    });

    console.log("Rents seeded successfully");
}