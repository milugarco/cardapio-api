import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/services/prisma.service";
import { CreateGroupDto } from "./dto/create-group.dto";
import { GroupResponse, GroupsResponse } from "./dto/get-group.dto";
import { Prisma } from "@prisma/client";
import { getPageInfo } from "src/utils/pageInfo";
import { UpdateGroupDto } from "./dto/update-group.dto";

@Injectable()
export class GroupService {
  constructor(private model: PrismaService) {}

  async create(createGroupDto: CreateGroupDto): Promise<GroupResponse> {
    try {
      const { name } = createGroupDto;

      const group = await this.model.groups.create({
        data: {
          name: name,
        },
      });

      return group;
    } catch (error) {
      console.log(`Error creating Group: ${error}`);
      throw new ConflictException(`Error creating Group: ${error}`);
    }
  }

  async findAll(
    name?: string,
    page?: number,
    perPage?: number,
  ): Promise<GroupsResponse> {
    try {
      const where: Prisma.GroupsWhereInput = {};

      if (name) {
        where.name = {
          contains: name,
        };
      }

      const totalCount = await this.model.groups.count({ where });

      const groups = await this.model.groups.findMany({
        where: where,
        skip: (page - 1) * perPage,
        take: Number(perPage),
        include: {
          Product: true,
        },
      });

      const pageInfo = getPageInfo(totalCount, page, perPage);

      const response: GroupsResponse = {
        data: groups,
        pageInfo: pageInfo,
      };

      return response;
    } catch (error) {
      console.log(`Error finding Groups: ${error}`);
      throw new NotFoundException(`Error finding Groups: ${error}`);
    }
  }

  async findOne(id: number): Promise<GroupResponse> {
    try {
      const group = await this.model.groups.findUnique({
        where: {
          id: Number(id),
        },
         include: {
          Product: true,
        },
      });

      return group;
    } catch (error) {
      console.log(`Error finding Group: ${error}`);
      throw new NotFoundException(`Error finding Group: ${error}`);
    }
  }

  async update(
    id: number,
    updateGroupDto: UpdateGroupDto,
  ): Promise<GroupResponse> {
    try {
      const { name } = updateGroupDto;

      const groupExists = await this.findOne(id);

      if (!groupExists) {
        throw new NotFoundException('Group not found');
      }

      const updatedGroup = await this.model.groups.update({
        where: { id: Number(id) },
        data: {
          name: name ? name : groupExists.name,
        },
      });

      return updatedGroup;
    } catch (error) {
      console.log(`Error updating Product: ${error}`);
      throw new Error(`Error updating Product: ${error}`);
    }
  }
}
