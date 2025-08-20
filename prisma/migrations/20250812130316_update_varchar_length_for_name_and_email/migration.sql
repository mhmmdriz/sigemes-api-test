/*
  Warnings:

  - You are about to alter the column `email` on the `admins` table. The data in that column could be lost. The data in that column will be cast from `VarChar(320)` to `VarChar(255)`.
  - You are about to alter the column `fullname` on the `admins` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(60)`.
  - You are about to alter the column `name` on the `city_halls` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(50)`.
  - You are about to alter the column `name` on the `guesthouses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(50)`.
  - You are about to alter the column `email` on the `renters` table. The data in that column could be lost. The data in that column will be cast from `VarChar(320)` to `VarChar(255)`.
  - You are about to alter the column `fullname` on the `renters` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(60)`.

*/
-- AlterTable
ALTER TABLE "admins" ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "fullname" SET DATA TYPE VARCHAR(60);

-- AlterTable
ALTER TABLE "city_halls" ALTER COLUMN "name" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "guesthouses" ALTER COLUMN "name" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "renters" ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "fullname" SET DATA TYPE VARCHAR(60);
