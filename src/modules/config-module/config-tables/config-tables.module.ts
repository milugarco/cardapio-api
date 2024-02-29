import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { ConfigTableService } from './config-tables.service';
import { ConfigTablesController } from './config-tables.controller';

@Module({
  controllers: [ConfigTablesController],
  providers: [ConfigTableService, PrismaService],
})
export class ConfigTableModule {}
