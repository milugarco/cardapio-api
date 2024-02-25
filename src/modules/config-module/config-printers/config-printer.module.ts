import { PrismaService } from "src/services/prisma.service";
import { ConfigPrinterController } from "./config-printer.controller";
import { ConfigPrinterService } from "./config-printer.service";
import { Module } from "@nestjs/common";

@Module({
  controllers: [ConfigPrinterController],
  providers: [ConfigPrinterService, PrismaService]
})
export class ConfigPrinterModule {}
