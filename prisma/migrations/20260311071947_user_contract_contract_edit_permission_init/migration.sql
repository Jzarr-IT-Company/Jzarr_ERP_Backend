/*
  Warnings:

  - You are about to drop the column `editGranted` on the `contract` table. All the data in the column will be lost.
  - You are about to drop the column `grantedAt` on the `contract` table. All the data in the column will be lost.
  - You are about to drop the column `grantedById` on the `contract` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `activitylog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `contractrevision` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `description` on table `contract` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `activitylog` DROP FOREIGN KEY `ActivityLog_userId_fkey`;

-- DropForeignKey
ALTER TABLE `contract` DROP FOREIGN KEY `Contract_grantedById_fkey`;

-- DropForeignKey
ALTER TABLE `contractrevision` DROP FOREIGN KEY `ContractRevision_changedById_fkey`;

-- DropForeignKey
ALTER TABLE `contractrevision` DROP FOREIGN KEY `ContractRevision_contractId_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_createdBy_fkey`;

-- DropIndex
DROP INDEX `Contract_grantedById_fkey` ON `contract`;

-- DropIndex
DROP INDEX `User_createdBy_fkey` ON `user`;

-- AlterTable
ALTER TABLE `contract` DROP COLUMN `editGranted`,
    DROP COLUMN `grantedAt`,
    DROP COLUMN `grantedById`,
    ADD COLUMN `subAdminStatus` ENUM('PENDING', 'ACCEPTED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    ADD COLUMN `superAdminStatus` ENUM('PENDING', 'ACCEPTED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    MODIFY `description` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `createdBy`,
    ADD COLUMN `createdById` INTEGER NULL;

-- DropTable
DROP TABLE `activitylog`;

-- DropTable
DROP TABLE `contractrevision`;

-- CreateTable
CREATE TABLE `ContractEditPermission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contractId` INTEGER NOT NULL,
    `managerId` INTEGER NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContractEditPermission` ADD CONSTRAINT `ContractEditPermission_contractId_fkey` FOREIGN KEY (`contractId`) REFERENCES `Contract`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContractEditPermission` ADD CONSTRAINT `ContractEditPermission_managerId_fkey` FOREIGN KEY (`managerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
