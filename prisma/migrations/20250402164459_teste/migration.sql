-- DropForeignKey
ALTER TABLE `orderitems` DROP FOREIGN KEY `OrderItems_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `orderitems` DROP FOREIGN KEY `OrderItems_productId_fkey`;

-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `Orders_userId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_userId_fkey`;

-- DropForeignKey
ALTER TABLE `reviews` DROP FOREIGN KEY `Reviews_productId_fkey`;

-- DropForeignKey
ALTER TABLE `reviews` DROP FOREIGN KEY `Reviews_userId_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_profileId_fkey`;

-- AlterTable
ALTER TABLE `user` MODIFY `birthday` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderitems` ADD CONSTRAINT `orderitems_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderitems` ADD CONSTRAINT `orderitems_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_cpf_key` TO `user_cpf_key`;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_email_key` TO `user_email_key`;
