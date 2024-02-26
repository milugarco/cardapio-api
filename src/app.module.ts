import { Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { ProductModule } from './modules/product-module/products/product.module';
import { GroupModule } from './modules/product-module/groups/group.module';
import { ComplementModule } from './modules/product-module/complements/complement.module';
import { ProductComplementsModule } from './modules/product-module/complement-product/product-complement.module';
import { ConfigPrinterModule } from './modules/config-module/config-printers/config-printer.module';
import { GroupService } from './modules/product-module/groups/group.service';
import { ConfigPrinterService } from './modules/config-module/config-printers/config-printer.service';
import { ConfigTableModule } from './modules/config-module/config-tables/config-tables.module';

@Module({
  imports: [ProductModule, GroupModule, ComplementModule, ProductComplementsModule, ConfigPrinterModule, ConfigTableModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
