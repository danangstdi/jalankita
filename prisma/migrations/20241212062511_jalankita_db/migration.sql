-- CreateTable
CREATE TABLE `reports` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullname` VARCHAR(255) NOT NULL,
    `whatsapp` VARCHAR(100) NOT NULL,
    `province` VARCHAR(255) NOT NULL,
    `regency` VARCHAR(255) NOT NULL,
    `district` VARCHAR(255) NOT NULL,
    `detail` TEXT NOT NULL,
    `photo` VARCHAR(255) NOT NULL,
    `reportStatus` ENUM('PENDING', 'PROGRESS', 'RESOLVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    `reportAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admins` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `adminId` VARCHAR(191) NOT NULL,
    `level` ENUM('superAdmin', 'admin', 'faqAdmin') NOT NULL DEFAULT 'admin',
    `access` VARCHAR(4) NOT NULL,
    `registerAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `password` VARCHAR(255) NOT NULL,
    `passwordNoEncrypt` VARCHAR(8) NOT NULL,

    UNIQUE INDEX `admins_adminId_key`(`adminId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `logAudits` (
    `logId` INTEGER NOT NULL AUTO_INCREMENT,
    `adminId` VARCHAR(255) NOT NULL,
    `action` VARCHAR(255) NOT NULL,
    `actionAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`logId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
