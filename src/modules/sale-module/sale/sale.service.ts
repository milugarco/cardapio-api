import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { SaleResponse, SalesResponse } from './dto/get-sale.dto';
import { CreateSaleDto } from './dto/create-sale.dto';
import { Prisma } from '@prisma/client';
import { getPageInfo } from 'src/utils/pageInfo';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Injectable()
export class SaleService {
  constructor(private model: PrismaService) {}

  async create(createSaleDto: CreateSaleDto): Promise<SaleResponse> {
    try {
      const { configTablesId, total } = createSaleDto;

      const tableIsUsed = this.model.sales.findFirst({
        where: {
          configTablesId: configTablesId,
          finished: false,
        },
      });

      if (tableIsUsed) {
        throw new ConflictException('Table is already used');
      }

      const sale = await this.model.sales.create({
        data: {
          configTablesId: configTablesId,
          total: total,
          alreadyPay: 0,
          finished: false,
        },
      });

      return sale;
    } catch (error) {
      console.log(`Error creating Sale: ${error}`);
      throw new ConflictException(`Error creating Sale: ${error}`);
    }
  }

  async findOne(id: number): Promise<SaleResponse> {
    try {
      const sale = await this.model.sales.findUnique({
        where: {
          id: id,
        },
        include: {
          saleProducts: {
            include: {
              SaleProductComplements: true,
            },
          },
          configTables: true,
        },
      });

      return sale;
    } catch (error) {
      console.log(`Error fetching Sale: ${error}`);
      throw new NotFoundException(`Error fetching Sale: ${error}`);
    }
  }

  async findAll(
    finished?: boolean,
    page?: number,
    perPage?: number,
  ): Promise<SalesResponse> {
    try {
      const where: Prisma.SalesWhereInput = {};

      if (finished) {
        where.finished = finished;
      }

      const totalCount: number = await this.model.sales.count({ where });

      const sales = await this.model.sales.findMany({
        where: where,
        skip: (page - 1) * perPage,
        take: Number(perPage),
        include: {
          saleProducts: {
            include: {
              SaleProductComplements: true,
            },
          },
          configTables: true,
        },
      });

      const pageInfo = getPageInfo(totalCount, page, perPage);

      const response: SalesResponse = {
        data: sales,
        pageInfo: pageInfo,
      };

      return response;
    } catch (error) {
      console.log(`Error fetching Sale: ${error}`);
      throw new NotFoundException(`Error fetching Sale: ${error}`);
    }
  }

  async update(
    id: number,
    updateSaleDto: UpdateSaleDto,
  ): Promise<SaleResponse> {
    try {
      const { configTablesId, total, alreadyPay } = updateSaleDto;

      const saleExists = await this.findOne(id);

      if (!saleExists) {
        throw new NotFoundException('Sale not found');
      }

      const updatedSale = await this.model.sales.update({
        where: {
          id: id,
        },
        data: {
          configTablesId: configTablesId
            ? configTablesId
            : saleExists.configTablesId,
          total: total ? total : saleExists.total,
          alreadyPay: alreadyPay ? alreadyPay : saleExists.alreadyPay,
        },
        include: {
          saleProducts: {
            include: {
              SaleProductComplements: true,
            },
          },
          configTables: true,
        },
      });

      return updatedSale;
    } catch (error) {
      console.log(`Error updating sale: ${error}`);
      throw new ConflictException(`Error updating sale: ${error}`);
    }
  }

  async finish(id: number): Promise<SaleResponse> {
    try {
      const saleExists = await this.findOne(id);

      if (!saleExists) {
        throw new NotFoundException('Sale not found');
      }

      if (saleExists.alreadyPay !== saleExists.total) {
        throw new ConflictException(
          'Sale total is different to sale already pay',
        );
      }

      const updatedSale = await this.model.sales.update({
        where: {
          id: id,
        },
        data: {
          finished: true,
        },
        include: {
          saleProducts: {
            include: {
              SaleProductComplements: true,
            },
          },
          configTables: true,
        },
      });

      return updatedSale;
    } catch (error) {
      console.log(`Error finishing sale: ${error}`);
      throw new ConflictException(`Error finishing sale: ${error}`);
    }
  }
}
