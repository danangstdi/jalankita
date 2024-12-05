-- CreateTable
CREATE TABLE `admin` (
    `adminId` VARCHAR(12) NOT NULL,
    `level` ENUM('superAdmin', 'admin', 'faqAdmin') NOT NULL DEFAULT 'admin',
    `access` VARCHAR(4) NOT NULL,
    `registerAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `password` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `admin_adminId_key`(`adminId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
