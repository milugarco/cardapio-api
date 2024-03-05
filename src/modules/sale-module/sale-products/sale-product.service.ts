import { PrismaService } from 'src/services/prisma.service';
import { CreateSaleProductDto } from './dto/create-sale-products.dto';
import { SaleProductResponse } from './dto/get-sales-products.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { SaleProductComplementService } from '../sale-product-complements/sale-product-complement.service';

export class SaleProductService {
  constructor(
    private model: PrismaService,
    private saleProductComplementService: SaleProductComplementService,
  ) {}

  async create(
    saleId: number,
    createSaleProductDto: CreateSaleProductDto,
  ): Promise<SaleProductResponse> {
    try {
      const { productId, obs, createSaleProductComplementsDto } =
        createSaleProductDto;

      const saleExists = await this.model.sales.findFirst({
        where: {
          id: Number(saleId),
        },
      });

      if (!saleExists) {
        throw new NotFoundException('Sale not found');
      }

      const productExists = await this.model.products.findFirst({
        where: {
          id: Number(productId),
        },
      });

      if (!productExists) {
        throw new NotFoundException('Product not found');
      }

      const product = await this.model.saleProducts.create({
        data: {
          salesId: Number(saleId),
          productsId: productId,
          obs: obs,
          value: Number(productExists.value),
          isPrint: true,
        },
      });

      await this.saleProductComplementService.create(
        saleId,
        createSaleProductComplementsDto,
      );

      return product;
    } catch (error) {
      console.log(`Error creating product in sale: ${error}`);
      throw new ConflictException(`Error creating product in sale: ${error}`);
    }
  }
}
