import { Gender, PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma: PrismaClient = new PrismaClient()

export async function seedRenters(): Promise<void> {
    const hashedPassword: string = await bcrypt.hash('password', 10)
    const renterData = [
        {
            fullname: "Alice Jones",
            email: "alice@prisma.io",
            password: hashedPassword,
            emailVerified: true,
            phoneNumber: "1234567890",
            gender: Gender.perempuan,
        },
        {
            fullname: "Bob Smith",
            email: "bob@prisma.io",
            password: hashedPassword,
            emailVerified: true,
            phoneNumber: "1234567890",
            gender: Gender.laki_laki,
        },
        {
            fullname: "Charlie Brown",
            email: "charlie@prisma.io",
            password: hashedPassword,
            emailVerified: false,
            phoneNumber: "1234567890",
            gender: Gender.laki_laki,
        },
        {
            fullname: "David Johnson",
            email: "david@prisma.io",
            password: hashedPassword,
            emailVerified: true,
            phoneNumber: "1234567890",
            gender: Gender.laki_laki,
        },
    ]

    for (let i = 0; i < 100; i++) {
        renterData.push({
            fullname: `Renter ${i + 1}`,
            email: `renter${i + 1}@prisma.io`,
            password: hashedPassword,
            emailVerified: true,
            phoneNumber: `123456789${i}`,
            gender: i % 2 === 0 ? Gender.laki_laki : Gender.perempuan,
        })
    }

    await prisma.renter.createMany({
        data: renterData,
    });

    console.log("Renters Seeded Successfully");
}