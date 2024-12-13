/*
  Warnings:

  - You are about to drop the column `passwordNoEncrypt` on the `admins` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `admins` DROP COLUMN `passwordNoEncrypt`;
