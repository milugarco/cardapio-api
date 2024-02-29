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
import { ComplementService } from './complement.service';
import {
  ComplementResponse,
  ComplementsResponse,
} from './dto/get-complement.dto';
import { CreateComplementDto } from './dto/create-complement.dto';
import { UpdateComplementDto } from './dto/update-complemente.dto';
@ApiTags('Complements')
@Controller('complements')
export class ComplementController {
  constructor(private complementService: ComplementService) {}

  @Post('v1/complement')
  @ApiOperation({ summary: 'Create a new complement' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: ComplementResponse,
  })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error response',
  })
  async create(
    @Body() createComplementDto: CreateComplementDto,
  ): Promise<ComplementResponse> {
    try {
      return this.complementService.create(createComplementDto);
    } catch (error) {
      console.log(`Error creating Complement: ${error}`);
      throw new ConflictException(`Error creating Complement: ${error}`);
    }
  }

  @Get('v1/complement')
  @ApiOperation({ summary: 'Get all complements' })
  @ApiResponse({ status: 200, type: ComplementResponse })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error response',
  })
  @ApiQuery({ name: 'name', required: false, example: 'queijo' })
  @ApiQuery({ name: 'value', required: false, example: 1 })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'perPage', required: false, example: 10 })
  async findAll(
    @Query('name') name?: string,
    @Query('value') value?: number,
    @Query('page') page = 1,
    @Query('perPage') perPage = 10,
  ): Promise<ComplementsResponse> {
    try {
      const response = await this.complementService.findAll(
        name,
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

  @Get('v1/complement/:id')
  @ApiOperation({ summary: 'Get one complement' })
  @ApiResponse({ status: 200, type: ComplementResponse })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error response',
  })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'Complement ID',
  })
  async findOne(@Param('id') id: number): Promise<ComplementResponse> {
    try {
      const response = await this.complementService.findOne(id);
      return response;
    } catch (error) {
      console.log(`Error finding complement: ${error}`);
      throw new NotFoundException(`Error finding complement: ${error}`);
    }
  }

  @Patch('v1/complement/:id')
  @ApiOperation({ summary: 'Update a group' })
  @ApiResponse({ status: 200, type: ComplementResponse })
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
    @Body() updateGroupDto: UpdateComplementDto,
  ): Promise<ComplementResponse> {
    try {
      const response = await this.complementService.update(id, updateGroupDto);
      return response;
    } catch (error) {
      console.error(error);
      throw new NotFoundException(error);
    }
  }
}
