/*
  Warnings:

  - The primary key for the `admins` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `admins` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `logaudits` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `logId` on the `logaudits` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `reports` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `reports` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- DropIndex
DROP INDEX `logAudits_adminId_key` ON `logaudits`;

-- AlterTable
ALTER TABLE `admins` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `logaudits` DROP PRIMARY KEY,
    MODIFY `logId` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `adminId` VARCHAR(255) NOT NULL,
    ADD PRIMARY KEY (`logId`);

-- AlterTable
ALTER TABLE `reports` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);
