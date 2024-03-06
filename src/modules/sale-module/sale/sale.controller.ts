import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SaleService } from './sale.service';
import { SaleResponse } from './dto/get-sale.dto';
import { CreateSaleDto } from './dto/create-sale.dto';

@ApiTags('Sales')
@Controller('sale')
export class SalesController {
  constructor(private saleService: SaleService) {}

  @Post('v1/sale')
  @ApiOperation({ summary: 'Create a new sale' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: SaleResponse,
  })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error response',
  })
  async create(@Body() createSaleDto: CreateSaleDto): Promise<SaleResponse> {
    try {
      return this.saleService.create(createSaleDto);
    } catch (error) {
      console.log(`Error creating Sale: ${error}`);
      throw new ConflictException(`Error creating Sale: ${error}`);
    }
  }
}
