import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { ProductResponse, ProductsResponse } from './dto/get-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { Prisma } from '@prisma/client';
import { getPageInfo } from 'src/utils/pageInfo';
import { UPdateProductDto } from './dto/update-product.dto';
import { GroupService } from '../groups/group.service';
import { ConfigPrinterService } from 'src/modules/config-module/config-printers/config-printer.service';

@Injectable()
export class ProductService {
  constructor(private model: PrismaService, private groupService: GroupService, private configPrinterService: ConfigPrinterService) {}

  async create(createProductDto: CreateProductDto): Promise<ProductResponse> {
    try {
      const { name, value, description, groupsId, configId } = createProductDto;

      if (Number(value) < 0) {
        throw new Error(`Invalid value for product`);
      }

      const groupExist = await this.groupService.findOne(Number(groupsId))

      if (!groupExist) {
        throw new NotFoundException('Group not exist');
      }

      const configPrinterExist = await this.configPrinterService.findOne(Number(configId))

      if (!configPrinterExist) {
        throw new NotFoundException('Config printer not exist');
      }

      const product = await this.model.products.create({
        data: {
          name: name,
          value: value,
          description: description ? description : null,
          groupsId: groupsId,
          configId: configId,
        },
      });

      return product;
    } catch (error) {
      console.log(`Error creating Product: ${error}`);
      throw new ConflictException(`Error creating Product: ${error}`);
    }
  }

  async findAll(
    name?: string,
    groupsId?: number,
    value?: number,
    page?: number,
    perPage?: number,
  ): Promise<ProductsResponse> {
    try {
      const where: Prisma.ProductsWhereInput = {};

      if (name) {
        where.name = {
          contains: name,
        };
      }

      if (groupsId) {
        where.groupsId = Number(groupsId);
      }

      if (value) {
        where.value = value;
      }

      const totalCount = await this.model.products.count({ where });

      const products = await this.model.products.findMany({
        where: where,
        select: {
          id: true,
          name: true,
          value: true,
          description: true,
          groupsId: true,
          configId: true,
          ProductComplements: {
            include: {
              complement: {
                select:  {
                  id: true,
                  name: true,
                  value: true,
                }
              }
            }
          }
        },
        skip: (page - 1) * perPage,
        take: Number(perPage),
      });

      const pageInfo = getPageInfo(totalCount, page, perPage);

      const response: ProductsResponse = {
        data: products,
        pageInfo: pageInfo,
      };

      return response;
    } catch (error) {
      console.log(`Error finding Products: ${error}`);
      throw new NotFoundException(`Error finding Products: ${error}`);
    }
  }

  async findOne(id: number): Promise<ProductResponse> {
    try {
      const product = await this.model.products.findUnique({
        where: {
          id: Number(id),
        },
        select: {
          id: true,
          name: true,
          value: true,
          description: true,
          groupsId: true,
          configId: true,
          ProductComplements: {
            include: {
              complement: {
                select:  {
                  id: true,
                  name: true,
                  value: true,
                }
              }
            }
          }
        },
      });

      return product;
    } catch (error) {
      console.log(`Error finding Product: ${error}`);
      throw new NotFoundException(`Error finding Product: ${error}`);
    }
  }

  async update(
    id: number,
    updateProductDto: UPdateProductDto,
  ): Promise<ProductResponse> {
    try {
      const { name, value, description, groupsId, configId } = updateProductDto;

      const productExists = await this.findOne(id);

      if (!productExists) {
        throw new NotFoundException('Product not found');
      }

      const updatedProduct = await this.model.products.update({
        where: { id: Number(id) },
        data: {
          name: name ? name : productExists.name,
          value: value ? value : productExists.value,
          description: description ? description : productExists.description,
          groupsId: groupsId ? groupsId : productExists.groupsId,
          configId: configId ? configId : productExists.configId,
        },
      });

      return updatedProduct;
    } catch (error) {
      console.log(`Error updating Product: ${error}`);
      throw new Error(`Error updating Product: ${error}`);
    }
  }
}
