import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';


@Module({
  controllers: [GroupController],
  providers: [PrismaService, GroupService],
})
export class GroupModule {}
