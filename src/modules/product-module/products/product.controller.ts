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
import { ProductService } from './product.service';
import { ProductResponse, ProductsResponse } from './dto/get-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UPdateProductDto } from './dto/update-product.dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('v1/product')
  @ApiOperation({ summary: 'Create a new product' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: ProductResponse,
  })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error response',
  })
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductResponse> {
    try {
      return this.productService.create(createProductDto);
    } catch (error) {
      console.log(`Error creating Product: ${error}`);
      throw new ConflictException(`Error creating Product: ${error}`);
    }
  }

  @Get('v1/product')
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, type: ProductsResponse })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error response',
  })
  @ApiQuery({ name: 'name', required: false, example: 'X-Burger' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'perPage', required: false, example: 10 })
  @ApiQuery({ name: 'groupsId', required: false, example: 1 })
  @ApiQuery({ name: 'value', required: false, example: 10 })
  async findAll(
    @Query('name') name?: string,
    @Query('page') page = 1,
    @Query('perPage') perPage = 10,
    @Query('groupsId') groupsId?: number,
    @Query('value') value?: number,
  ): Promise<ProductsResponse> {
    try {
      const response = await this.productService.findAll(
        name,
        groupsId,
        value,
        page,
        perPage,
      );
      return response;
    } catch (error) {
      console.error(error);
      throw new NotFoundException(error);
    }
  }

  @Get('v1/product/:id')
  @ApiOperation({ summary: 'Get one product' })
  @ApiResponse({ status: 200, type: ProductResponse })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error response',
  })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'Product ID',
  })
  async findOne(@Param('id') id: number): Promise<ProductResponse> {
    try {
      const response = await this.productService.findOne(id);
      return response;
    } catch (error) {
      console.log(`Error finding Product: ${error}`);
      throw new NotFoundException(`Error finding Product: ${error}`);
    }
  }

  @Patch('v1/product/:id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({ status: 200, type: ProductResponse })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error response',
  })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'Product ID',
  })
  async update(
    @Param('id') id: number,
    @Body() uPdateProductDto: UPdateProductDto,
  ): Promise<ProductResponse> {
    try {
      const response = await this.productService.update(id, uPdateProductDto);
      return response;
    } catch (error) {
      console.error(error);
      throw new NotFoundException(error);
    }
  }
}
