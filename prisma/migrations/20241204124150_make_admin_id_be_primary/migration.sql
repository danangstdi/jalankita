-- DropIndex
DROP INDEX `admin_adminId_key` ON `admin`;

-- AlterTable
ALTER TABLE `admin` ADD PRIMARY KEY (`adminId`);
