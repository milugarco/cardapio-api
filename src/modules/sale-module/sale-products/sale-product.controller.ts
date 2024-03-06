import {
  Body,
  ConflictException,
  Controller,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { SaleProductService } from './sale-product.service';
import { SaleProductResponse } from './dto/get-sales-products.dto';
import { CreateSaleProductDto } from './dto/create-sale-products.dto';

@ApiTags('Sales Product')
@Controller('sale-product')
export class SaleProductController {
  constructor(private saleProductService: SaleProductService) {}

  @Post('v1/sale/:saleId')
  @ApiOperation({ summary: 'Create a new sale' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: SaleProductResponse,
  })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error response',
  })
  @ApiParam({
    name: 'saleId',
    example: 1,
    description: 'Sale ID',
  })
  async create(
    @Param('saleId') saleId: number,
    @Body() createSaleProductDto: CreateSaleProductDto,
  ): Promise<SaleProductResponse> {
    try {
      return this.saleProductService.create(saleId, createSaleProductDto);
    } catch (error) {
      console.log(`Error creating Sale: ${error}`);
      throw new ConflictException(`Error creating Sale: ${error}`);
    }
  }
}
