import { ConflictException, Controller, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ConfigTableService } from './config-tables.service';

@ApiTags('Config Tables')
@Controller('config')
export class ConfigTablesController {
  constructor(private configTableService: ConfigTableService) {}

  @Post('v1/config-tables')
  @ApiOperation({ summary: 'Create a tables' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error response',
  })
  @ApiQuery({ name: 'qtd', required: false, example: '20' })
  async create(@Query('qtd') qtd?: number): Promise<string> {
    try {
      return await this.configTableService.create(qtd);
    } catch (error) {
      console.log(`Error creating Config tables: ${error}`);
      throw new ConflictException(`Error creating Config tables: ${error}`);
    }
  }
}
