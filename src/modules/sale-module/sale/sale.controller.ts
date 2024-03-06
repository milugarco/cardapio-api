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
import { SaleService } from './sale.service';
import { SaleResponse, SalesResponse } from './dto/get-sale.dto';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

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

  @Get('v1/sale')
  @ApiOperation({ summary: 'Get all sales' })
  @ApiResponse({ status: 200, type: SalesResponse })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error response',
  })
  @ApiQuery({ name: 'finished', required: false, example: false })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'perPage', required: false, example: 10 })
  async findAll(
    @Query('finished') finished?: boolean,
    @Query('page') page = 1,
    @Query('perPage') perPage = 10,
  ): Promise<SalesResponse> {
    try {
      return this.saleService.findAll(finished, page, perPage);
    } catch (error) {
      console.log(`Error fetching sales: ${error}`);
      throw new NotFoundException(`Error fetching sales: ${error}`);
    }
  }

  @Get('v1/sale/:id')
  @ApiOperation({ summary: 'Get one sale' })
  @ApiResponse({ status: 200, type: SaleResponse })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'Sale ID',
  })
  async findOne(@Param('id') id: number): Promise<SaleResponse> {
    try {
      return this.saleService.findOne(id);
    } catch (error) {
      console.log(`Error fetching sale: ${error}`);
      throw new NotFoundException(`Error fetching sale: ${error}`);
    }
  }

  @Patch('v1/sale/:id')
  @ApiOperation({ summary: 'Update a sale' })
  @ApiResponse({ status: 200, type: SaleResponse })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'Sale ID',
  })
  async update(
    @Param('id') id: number,
    @Body() updateSaleDto: UpdateSaleDto,
  ): Promise<SaleResponse> {
    try {
      return this.saleService.update(id, updateSaleDto);
    } catch (error) {
      console.log(`Error updating sale: ${error}`);
      throw new NotFoundException(`Error updating sale: ${error}`);
    }
  }

  @Patch('v1/sale/finish/:id')
  @ApiOperation({ summary: 'Finish a sale' })
  @ApiResponse({ status: 200, type: SaleResponse })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'Sale ID',
  })
  async finish(@Param('id') id: number): Promise<SaleResponse> {
    try {
      return this.saleService.finish(id);
    } catch (error) {
      console.log(`Error updating sale: ${error}`);
      throw new NotFoundException(`Error updating sale: ${error}`);
    }
  }
}
