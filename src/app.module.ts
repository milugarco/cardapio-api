import { Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { ProductModule } from './modules/product-module/products/product.module';
import { GroupModule } from './modules/product-module/groups/group.module';
import { ComplementModule } from './modules/product-module/complements/complement.module';
import { ProductComplementsModule } from './modules/product-module/complement-product/product-complement.module';
import { ConfigPrinterModule } from './modules/config-module/config-printers/config-printer.module';
import { ConfigTableModule } from './modules/config-module/config-tables/config-tables.module';
import { SaleModule } from './modules/sale-module/sale/sale.module';
import { SaleProductModule } from './modules/sale-module/sale-products/sale-product.module';

@Module({
  imports: [
    ProductModule,
    GroupModule,
    ComplementModule,
    ProductComplementsModule,
    ConfigPrinterModule,
    ConfigTableModule,
    SaleModule,
    SaleProductModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
