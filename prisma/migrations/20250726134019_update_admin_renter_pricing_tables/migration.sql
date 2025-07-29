/*
  Warnings:

  - You are about to drop the column `createdAt` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `renters` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `renters` table. All the data in the column will be lost.
  - You are about to drop the `city_hall_pricing` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `guesthouse_room_pricing` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updated_at` to the `admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `renters` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "city_hall_pricing" DROP CONSTRAINT "city_hall_pricing_city_hall_id_fkey";

-- DropForeignKey
ALTER TABLE "guesthouse_room_pricing" DROP CONSTRAINT "guesthouse_room_pricing_guesthouse_room_id_fkey";

-- DropForeignKey
ALTER TABLE "rents" DROP CONSTRAINT "rents_city_hall_pricing_id_fkey";

-- DropForeignKey
ALTER TABLE "rents" DROP CONSTRAINT "rents_guesthouse_room_pricing_id_fkey";

-- AlterTable
ALTER TABLE "admins" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "profile_picture" SET DEFAULT 'http://localhost:8080/uploads/profile-pictures/default-picture.png';

-- AlterTable
ALTER TABLE "renters" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "profile_picture" SET DEFAULT 'http://localhost:8080/uploads/profile-pictures/default-picture.png';

-- DropTable
DROP TABLE "city_hall_pricing";

-- DropTable
DROP TABLE "guesthouse_room_pricing";

-- CreateTable
CREATE TABLE "city_hall_pricings" (
    "id" SERIAL NOT NULL,
    "city_hall_id" INTEGER NOT NULL,
    "activity_type" VARCHAR(50) NOT NULL,
    "facilities" TEXT NOT NULL,
    "price_per_day" DOUBLE PRECISION NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "city_hall_pricings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guesthouse_room_pricings" (
    "id" SERIAL NOT NULL,
    "guesthouse_room_id" INTEGER NOT NULL,
    "retribution_type" VARCHAR(100) NOT NULL,
    "price_per_day" DOUBLE PRECISION NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "guesthouse_room_pricings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "city_hall_pricings" ADD CONSTRAINT "city_hall_pricings_city_hall_id_fkey" FOREIGN KEY ("city_hall_id") REFERENCES "city_halls"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guesthouse_room_pricings" ADD CONSTRAINT "guesthouse_room_pricings_guesthouse_room_id_fkey" FOREIGN KEY ("guesthouse_room_id") REFERENCES "guesthouse_rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rents" ADD CONSTRAINT "rents_guesthouse_room_pricing_id_fkey" FOREIGN KEY ("guesthouse_room_pricing_id") REFERENCES "guesthouse_room_pricings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rents" ADD CONSTRAINT "rents_city_hall_pricing_id_fkey" FOREIGN KEY ("city_hall_pricing_id") REFERENCES "city_hall_pricings"("id") ON DELETE SET NULL ON UPDATE CASCADE;
