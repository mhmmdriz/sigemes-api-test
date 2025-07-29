import { PrismaClient, Review } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

export async function seedReviews(): Promise<void> {
    const reviewData: Review[] = [
        {
            id: 1,
            rentId: 1,
            rating: 5,
            comment: "Kamar messnya bersih dan nyaman, pelayanannya juga ramah. Selain itu fasilitasnya juga lengkap. Sangat puas menginap disini.",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 2,
            rentId: 2,
            rating: 5,
            comment: "Kamar messnya bersih dan nyaman, pelayanannya juga ramah. Selain itu fasilitasnya juga lengkap. Sangat puas menginap disini.",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 3,
            rentId: 3,
            rating: 5,
            comment: "Kamar messnya bersih dan nyaman, pelayanannya juga ramah. Selain itu fasilitasnya juga lengkap. Sangat puas menginap disini.",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 4,
            rentId: 4,
            rating: 5,
            comment: "Gedung adam malik sangat bersih, fasilitas yang diediajukan juga lengkap. Pelayanannya juga ramah.",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];

    for (let i = 0; i < 1000; i++) {
        reviewData.push({
            id: i + 5,
            rentId: i + 5,
            rating: Math.floor(Math.random()*2) + 4,
            comment: "Sangat nyaman dan bagus, saya sangat merekomendasikan tempat ini untuk disewa",
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    await prisma.review.createMany({
        data: reviewData,
    });

    console.log('Reviews seeded successfully');
}