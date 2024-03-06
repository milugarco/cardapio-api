import { Module } from '@nestjs/common';
import { SalesController } from './sale.controller';
import { PrismaService } from 'src/services/prisma.service';
import { SaleService } from './sale.service';
import { SaleProductService } from '../sale-products/sale-product.service';
import { SaleProductComplementService } from '../sale-product-complements/sale-product-complement.service';

@Module({
  controllers: [SalesController],
  providers: [
    PrismaService,
    SaleService,
    SaleProductService,
    SaleProductComplementService,
  ],
})
export class SaleModule {}
