-- CreateEnum
CREATE TYPE "status" AS ENUM ('PENDING', 'PROGRESS', 'RESOLVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "roleLevel" AS ENUM ('superAdmin', 'admin', 'faqAdmin');

-- CreateTable
CREATE TABLE "reports" (
    "id" SERIAL NOT NULL,
    "fullname" VARCHAR(255) NOT NULL,
    "whatsapp" VARCHAR(100) NOT NULL,
    "province" VARCHAR(255) NOT NULL,
    "regency" VARCHAR(255) NOT NULL,
    "district" VARCHAR(255) NOT NULL,
    "detail" TEXT NOT NULL,
    "photo" VARCHAR(255) NOT NULL,
    "reportStatus" "status" NOT NULL DEFAULT 'PENDING',
    "reportAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admins" (
    "id" SERIAL NOT NULL,
    "adminId" TEXT NOT NULL,
    "level" "roleLevel" NOT NULL DEFAULT 'admin',
    "access" VARCHAR(4) NOT NULL,
    "registerAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "password" VARCHAR(255) NOT NULL,
    "noEncryptPassword" VARCHAR(8) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logAudits" (
    "logId" SERIAL NOT NULL,
    "adminId" VARCHAR(255) NOT NULL,
    "action" VARCHAR(255) NOT NULL,
    "actionAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "logAudits_pkey" PRIMARY KEY ("logId")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_adminId_key" ON "admins"("adminId");
