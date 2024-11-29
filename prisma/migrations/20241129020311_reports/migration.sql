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
