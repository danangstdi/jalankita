/*
  Warnings:

  - Made the column `noEncryptPassword` on table `admins` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `admins` MODIFY `noEncryptPassword` VARCHAR(8) NOT NULL;
