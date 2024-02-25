import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { PrismaService } from 'src/services/prisma.service';
import { ProductService } from './product.service';
import { GroupService } from '../groups/group.service';
import { ConfigPrinterService } from 'src/modules/config-module/config-printers/config-printer.service';

@Module({
  controllers: [ProductController],
  providers: [PrismaService, ProductService, GroupService, ConfigPrinterService],
})
export class ProductModule {}
