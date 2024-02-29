import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { ProductComplementsController } from './product-complement.controller';
import { ProductComplementService } from './product-complement.service';
import { ComplementService } from '../complements/complement.service';
import { ProductService } from '../products/product.service';
import { GroupService } from '../groups/group.service';
import { ConfigPrinterService } from 'src/modules/config-module/config-printers/config-printer.service';

@Module({
  controllers: [ProductComplementsController],
  providers: [
    PrismaService,
    ProductComplementService,
    ComplementService,
    ProductService,
    GroupService,
    ConfigPrinterService,
  ],
})
export class ProductComplementsModule {}
