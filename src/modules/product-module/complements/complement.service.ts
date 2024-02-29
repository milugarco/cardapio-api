import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { CreateComplementDto } from './dto/create-complement.dto';
import {
  ComplementResponse,
  ComplementsResponse,
} from './dto/get-complement.dto';
import { Prisma } from '@prisma/client';
import { getPageInfo } from 'src/utils/pageInfo';
import { UpdateComplementDto } from './dto/update-complemente.dto';
import { ResponsiveComplementDto } from './dto/responsive-complement.dto';

@Injectable()
export class ComplementService {
  constructor(private model: PrismaService) {}

  async create(
    createComplementDto: CreateComplementDto,
  ): Promise<ComplementResponse> {
    try {
      const { name, value } = createComplementDto;
      if (Number(value) < 0) {
        throw new ConflictException(`Invalid value for product`);
      }
      const complement = await this.model.complements.create({
        data: {
          name: name,
          value: value,
        },
      });
      return complement;
    } catch (error) {
      console.log(`Error creating complement: ${error}`);
      throw new ConflictException(`Error creating complement: ${error}`);
    }
  }

  async findOne(id: number): Promise<ComplementResponse> {
    try {
      const complement = await this.model.complements.findUnique({
        where: {
          id: Number(id),
        },
      });

      return complement;
    } catch (error) {
      console.log(`Error finding Complement: ${error}`);
      throw new NotFoundException(`Error finding Complement: ${error}`);
    }
  }

  async findAll(
    name?: string,
    value?: number,
    page?: number,
    perPage?: number,
  ): Promise<ComplementsResponse> {
    try {
      const where: Prisma.ComplementsWhereInput = {};

      if (name) {
        where.name = {
          contains: name,
        };
      }
      if (value) {
        where.value = value;
      }

      const totalCount = await this.model.complements.count({ where });

      const complements = await this.model.complements.findMany({
        where: where,
        skip: (page - 1) * perPage,
        take: Number(perPage),
      });

      const pageInfo = getPageInfo(totalCount, page, perPage);

      const response: ComplementsResponse = {
        data: complements,
        pageInfo: pageInfo,
      };

      return response;
    } catch (error) {
      console.log(`Error finding complements: ${error}`);
      throw new NotFoundException(`Error finding complements: ${error}`);
    }
  }
  async update(
    id: number,
    updateComplementDto: UpdateComplementDto,
  ): Promise<ComplementResponse> {
    try {
      const { name, value } = updateComplementDto;

      const complementExists = await this.findOne(id);

      if (!complementExists) {
        throw new NotFoundException('Complement not found');
      }

      const updatedComplement = await this.model.complements.update({
        where: { id: Number(id) },
        data: {
          name: name ? name : complementExists.name,
          value: value ? value : complementExists.value,
        },
      });

      return updatedComplement;
    } catch (error) {
      console.log(`Error updating Complement: ${error}`);
      throw new Error(`Error updating Complement: ${error}`);
    }
  }

  async findIn(ids: number[]): Promise<ResponsiveComplementDto[]> {
    try {
      const response = await this.model.complements.findMany({
        where: {
          id: { in: ids },
        },
      });

      return response;
    } catch (error) {
      console.log(`Error fetching complements: ${error}`);
      throw new NotFoundException(`Error fetching complements: ${error}`);
    }
  }
}
