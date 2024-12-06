-- CreateTable
CREATE TABLE `logAudits` (
    `logId` INTEGER NOT NULL AUTO_INCREMENT,
    `adminId` VARCHAR(191) NOT NULL,
    `action` VARCHAR(255) NOT NULL,
    `actionAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `logAudits_adminId_key`(`adminId`),
    PRIMARY KEY (`logId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
