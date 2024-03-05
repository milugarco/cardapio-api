import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { ProductService } from '../products/product.service';
import { ComplementService } from '../complements/complement.service';
import {
  ProductComplementResponse,
  ProductComplementsResponse,
} from './dto/get-product-complement.dto';
import {
  CreateProductComplementDto,
  CreateProductComplementsDto,
} from './dto/create-product-complement.dto';
import { Prisma } from '@prisma/client';
import { getPageInfo } from 'src/utils/pageInfo';
import { UpdateProductComplementDto } from './dto/update-product-complement.dto';

@Injectable()
export class ProductComplementService {
  constructor(
    private model: PrismaService,
    private productService: ProductService,
    private complementService: ComplementService,
  ) {}

  async create(
    createProductComplementDto: CreateProductComplementDto,
  ): Promise<ProductComplementResponse> {
    try {
      const { complementId, productId } = createProductComplementDto;

      const productExists = await this.productService.findOne(productId);

      if (!productExists) {
        throw new NotFoundException('Product not found or not exist');
      }

      const complementExists = await this.complementService.findOne(
        complementId,
      );

      if (!complementExists) {
        throw new NotFoundException('Complement not found or not exist');
      }

      const productComplementAlreadyExists =
        await this.model.productComplements.findFirst({
          where: {
            productsId: productId,
            complementsId: complementId,
          },
        });

      console.log(productComplementAlreadyExists);

      if (productComplementAlreadyExists) {
        throw new NotFoundException('Product complement already exist');
      }

      const productComplementCreated =
        await this.model.productComplements.create({
          data: {
            productsId: productId,
            complementsId: complementId,
          },
        });

      return productComplementCreated;
    } catch (error) {
      console.log(`Error creating product complement: ${error}`);
      throw new ConflictException(
        `Error creating product complement: ${error}`,
      );
    }
  }

  async createMany(
    createProductComplementsDto: CreateProductComplementsDto,
  ): Promise<ProductComplementResponse[]> {
    try {
      const { productId, complementsId } = createProductComplementsDto;

      const productExists = await this.productService.findOne(productId);

      if (!productExists) {
        throw new NotFoundException('Product not found or does not exist');
      }

      const complementsExistencePromises = complementsId.map(
        async (complementId) => {
          const existingProductComplement = await this.productComplementExist(
            productId,
            complementId,
          );
          return existingProductComplement;
        },
      );

      const complementsExistenceResults = await Promise.all(
        complementsExistencePromises,
      );
      const filteredComplementsId = complementsId.filter(
        (complementId, index) => !complementsExistenceResults[index],
      );

      if (filteredComplementsId.length === 0) {
        throw new ConflictException(
          'All provided complements are already associated with the product',
        );
      }

      await Promise.all(
        filteredComplementsId.map(async (complementId) => {
          await this.model.productComplements.create({
            data: {
              productsId: productId,
              complementsId: complementId,
            },
          });
        }),
      );

      const productComplementsCreated =
        await this.model.productComplements.findMany({
          where: {
            productsId: productId,
            complementsId: {
              in: filteredComplementsId,
            },
          },
        });

      return productComplementsCreated;
    } catch (error) {
      console.log(error);
      throw new ConflictException(error);
    }
  }

  async findOne(id: number): Promise<ProductComplementResponse> {
    try {
      const productComplement = await this.model.productComplements.findUnique({
        where: { id: Number(id) },
      });

      return productComplement;
    } catch (error) {
      console.log(`Error fetching product complement: ${error}`);
      throw new NotFoundException(
        `Error fetching product complement: ${error}`,
      );
    }
  }

  async findAll(
    productId?: number,
    complementId?: number,
    page?: number,
    perPage?: number,
  ): Promise<ProductComplementsResponse> {
    try {
      const where: Prisma.ProductComplementsWhereInput = {};

      if (productId) {
        where.productsId = Number(productId);
      }
      if (complementId) {
        where.complementsId = Number(complementId);
      }

      const totalCount = await this.model.productComplements.count({ where });

      const productComplements = await this.model.productComplements.findMany({
        where: where,
        include: {
          complement: true,
        },
        skip: (page - 1) * perPage,
        take: Number(perPage),
      });

      const pageInfo = getPageInfo(totalCount, page, perPage);

      const response: ProductComplementsResponse = {
        data: productComplements,
        pageInfo: pageInfo,
      };

      return response;
    } catch (error) {
      console.log(`Error fetching product complement: ${error}`);
      throw new NotFoundException(
        `Error fetching product complement: ${error}`,
      );
    }
  }

  async update(
    id: number,
    updateProductComplementDto: UpdateProductComplementDto,
  ): Promise<ProductComplementResponse> {
    try {
      const { complementId } = updateProductComplementDto;

      const productComplementExist = await this.findOne(Number(id));

      if (!productComplementExist) {
        throw new NotFoundException('Product complements not exist');
      }

      const complementExist = await this.complementService.findOne(
        Number(complementId),
      );

      if (!complementExist) {
        throw new NotFoundException('Complement not exist');
      }

      const productComplementAlreadyExist = await this.productComplementExist(
        productComplementExist.productsId,
        complementId,
      );

      if (productComplementAlreadyExist) {
        throw new ConflictException(
          'This complement already exist in the product',
        );
      }

      const productComplementUpdated =
        await this.model.productComplements.update({
          where: { id: Number(id) },
          data: {
            complementsId: complementId,
          },
        });

      return productComplementUpdated;
    } catch (error) {
      console.log(`Error updating product complement: ${error}`);
      throw new ConflictException(
        `Error updating product complement: ${error}`,
      );
    }
  }

  async productComplementExist(
    productId: number,
    complementId: number,
  ): Promise<ProductComplementResponse> {
    try {
      const existingProductComplement =
        await this.model.productComplements.findFirst({
          where: {
            productsId: productId,
            complementsId: complementId,
          },
        });

      return existingProductComplement;
    } catch (error) {
      console.log(`Error fetching product complement: ${error}`);
      throw new NotFoundException(
        `Error fetching product complement: ${error}`,
      );
    }
  }
}
