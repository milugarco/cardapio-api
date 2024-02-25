import { Module } from "@nestjs/common";
import { ComplementController } from "./complement.controller";
import { PrismaService } from "src/services/prisma.service";
import { ComplementService } from "./complement.service";

@Module({
    controllers: [ComplementController],
    providers: [PrismaService, ComplementService],
  })
  export class ComplementModule {}