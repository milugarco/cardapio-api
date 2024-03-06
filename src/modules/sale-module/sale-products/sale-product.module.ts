import { Module } from '@nestjs/common';
import { SaleProductController } from './sale-product.controller';
import { SaleProductService } from './sale-product.service';
import { PrismaService } from 'src/services/prisma.service';
import { SaleProductComplementService } from '../sale-product-complements/sale-product-complement.service';

@Module({
  controllers: [SaleProductController],
  providers: [SaleProductService, PrismaService, SaleProductComplementService],
})
export class SaleProductModule {}
