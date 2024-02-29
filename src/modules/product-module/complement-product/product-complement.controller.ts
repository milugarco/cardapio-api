import {
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductComplementService } from './product-complement.service';
import {
  ProductComplementResponse,
  ProductComplementsResponse,
} from './dto/get-product-complement.dto';
import { ComplementResponse } from '../complements/dto/get-complement.dto';
import {
  CreateProductComplementDto,
  CreateProductComplementsDto,
} from './dto/create-product-complement.dto';
import { UpdateProductComplementDto } from './dto/update-product-complement.dto';

@ApiTags('Product Complements')
@Controller('product-complements')
export class ProductComplementsController {
  constructor(private productComplementsService: ProductComplementService) {}

  @Post('v1/product-complements')
  @ApiOperation({ summary: 'Create a new product complement' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: ProductComplementResponse,
  })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error response',
  })
  async create(
    @Body() createProductComplementDto: CreateProductComplementDto,
  ): Promise<ComplementResponse> {
    try {
      return this.productComplementsService.create(createProductComplementDto);
    } catch (error) {
      console.log(`Error creating Complement: ${error}`);
      throw new ConflictException(`Error creating Complement: ${error}`);
    }
  }

  @Post('v1/product-complements/all')
  @ApiOperation({
    summary: 'Create a new product with have varios complements',
  })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: [ProductComplementResponse],
  })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error response',
  })
  async createMany(
    @Body() createProductComplementsDto: CreateProductComplementsDto,
  ): Promise<ProductComplementResponse[]> {
    try {
      return this.productComplementsService.createMany(
        createProductComplementsDto,
      );
    } catch (error) {
      console.log(`Error creating Complement: ${error}`);
      throw new ConflictException(`Error creating Complement: ${error}`);
    }
  }

  @Get('v1/product-complements')
  @ApiOperation({ summary: 'Get all product complements' })
  @ApiResponse({ status: 200, type: ProductComplementsResponse })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error response',
  })
  @ApiQuery({ name: 'productId', required: false, example: 1 })
  @ApiQuery({ name: 'complementId', required: false, example: 1 })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'perPage', required: false, example: 10 })
  async findAll(
    @Query('productId') productId?: number,
    @Query('complementId') complementId?: number,
    @Query('page') page = 1,
    @Query('perPage') perPage = 10,
  ): Promise<ProductComplementsResponse> {
    try {
      const response = await this.productComplementsService.findAll(
        productId,
        complementId,
        page,
        perPage,
      );
      return response;
    } catch (error) {
      console.error(error);
      throw new NotFoundException(error);
    }
  }

  @Get('v1/product-complements/:id')
  @ApiOperation({ summary: 'Get one product complement' })
  @ApiResponse({ status: 200, type: ProductComplementResponse })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error response',
  })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'Product Complement ID',
  })
  async findOne(@Param('id') id: number): Promise<ProductComplementResponse> {
    try {
      const response = await this.productComplementsService.findOne(id);
      return response;
    } catch (error) {
      console.log(`Error finding complement: ${error}`);
      throw new NotFoundException(`Error finding complement: ${error}`);
    }
  }

  @Patch('v1/product-complement/:id')
  @ApiOperation({ summary: 'Update a complement in product' })
  @ApiResponse({ status: 200, type: ProductComplementResponse })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error response',
  })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'Product complement ID',
  })
  async update(
    @Param('id') id: number,
    @Body() updateProductComplementDto: UpdateProductComplementDto,
  ): Promise<ProductComplementResponse> {
    try {
      const response = await this.productComplementsService.update(
        id,
        updateProductComplementDto,
      );
      return response;
    } catch (error) {
      console.error(error);
      throw new NotFoundException(error);
    }
  }
}
