import { PrismaService } from 'src/services/prisma.service';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSaleProductComplementsDto } from './dto/create-sale-product-complements.dto';
import { SaleProductComplementResponse } from './dto/get-sales-product-complements.dto';

@Injectable()
export class SaleProductComplementService {
  constructor(private model: PrismaService) {}

  async create(
    saleId: number,
    createSaleProductComplementsDto: CreateSaleProductComplementsDto,
  ): Promise<SaleProductComplementResponse[]> {
    try {
      const { complementsId, saleProductId } = createSaleProductComplementsDto;

      const saleExists = await this.model.sales.findFirst({
        where: {
          id: Number(saleId),
        },
      });

      if (!saleExists) {
        throw new NotFoundException('Sale not found');
      }

      const saleProductExists = await this.model.saleProducts.findUnique({
        where: {
          id: Number(saleProductId),
        },
      });

      console.log('AQUI', saleProductExists);

      if (!saleProductExists) {
        throw new NotFoundException('Sale product not found');
      }

      const ids = [];

      for (let i = 0; i < complementsId.length; i++) {
        const complementCreate = await this.model.saleProductComplements.create(
          {
            data: {
              complementsId: complementsId[i],
              saleProductId: saleProductId,
            },
          },
        );

        ids.push(complementCreate.id);
      }

      const response = await this.model.saleProductComplements.findMany({
        where: {
          id: { in: ids },
        },
        include: {
          saleProduct: true,
          complements: true,
        },
      });

      return response;
    } catch (error) {
      console.log(`Error creating many complement in product: ${error}`);
      throw new ConflictException(
        `Error creating many complement in product: ${error}`,
      );
    }
  }
}
