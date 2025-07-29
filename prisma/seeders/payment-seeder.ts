import { Payment, PrismaClient } from '@prisma/client'
import crypto from "crypto";

const prisma: PrismaClient = new PrismaClient()

export async function seedPayments(): Promise<void> {
    const paymentData: Payment[] = [
        {
            id: crypto.randomUUID(),
            rentId: 1,
            amount: 99999,
            method: "bank_transfer",
            status: "dibayar",
            paymentGatewayToken: null,
            paymentTriggeredAt: new Date('2025-01-10'),
            paymentConfirmedAt: new Date('2025-01-10')
        },
        {
            id: crypto.randomUUID(),
            rentId: 2,
            amount: 200000,
            method: "bank_transfer",
            status: "dibayar",
            paymentGatewayToken: null,
            paymentTriggeredAt: new Date('2025-01-15'),
            paymentConfirmedAt: new Date('2025-01-15')
        },
        {
            id: crypto.randomUUID(),
            rentId: 3,
            amount: 300000,
            method: "bank_transfer",
            status: "dibayar",
            paymentGatewayToken: null,
            paymentTriggeredAt: new Date('2025-01-25'),
            paymentConfirmedAt: new Date('2025-01-26')
        },
        {
            id: crypto.randomUUID(),
            rentId: 4,
            amount: 400000,
            method: "bank_transfer",
            status: "dibayar",
            paymentGatewayToken: null,
            paymentTriggeredAt: new Date('2025-01-30'),
            paymentConfirmedAt: new Date('2025-01-31')
        },
    ];

    const startDate = new Date(2016, 9, 1);
    for (let i = 0; i < 1000; i++) {
        const triggeredAt: Date = new Date(startDate);
        triggeredAt.setDate(startDate.getDate() + (i * 3));

        paymentData.push({
            id: crypto.randomUUID(),
            rentId: i + 5,
            amount: Math.floor(Math.random() * 500000) + 10000,
            method: "bank_transfer",
            status: "dibayar",
            paymentGatewayToken: null,
            paymentTriggeredAt: triggeredAt,
            paymentConfirmedAt: triggeredAt
        });
    }

    await prisma.payment.createMany({
        data: paymentData,
    });

    console.log("Payments seeded successfully");
}