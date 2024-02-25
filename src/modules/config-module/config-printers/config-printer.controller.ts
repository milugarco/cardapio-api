import { Body, ConflictException, Controller, Get, NotFoundException, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ConfigPrinterService } from "./config-printer.service";
import { ConfigPrinterResponse, ConfigPrintersResponse } from "./dto/get-config-printer.dto";
import { CreateConfigPrinterDto } from "./dto/create-config-printer.dto";
import { UpdateConfigPrinterDto } from "./dto/update-config-printer.dto";

@ApiTags('Config Printer')
@Controller('config')
export class ConfigPrinterController {
  constructor(private configPrinterService: ConfigPrinterService) {}

  @Post('v1/config-printer')
  @ApiOperation({ summary: 'Create a new config printer' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: ConfigPrinterResponse,
  })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error response',
  })
  async create(
    @Body() createConfigPrinterDto: CreateConfigPrinterDto,
  ): Promise<ConfigPrinterResponse> {
    try {
      return this.configPrinterService.create(createConfigPrinterDto);
    } catch (error) {
      console.log(`Error creating Config Printer: ${error}`);
      throw new ConflictException(`Error creating Config Printer: ${error}`);
    }
  }

  @Get('v1/config-printer')
  @ApiOperation({ summary: 'Get all config printers' })
  @ApiResponse({
    status: 200,
    type: ConfigPrintersResponse,
  })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error response',
  })
  @ApiQuery({ name: 'print', required: false, example: 'Print to PDF'})
  @ApiQuery({ name: 'name', required: false, example: 'Cozinha'})
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'perPage', required: false, example: 10 })
  async findAll(
    @Query('print') print?: string,
    @Query('name') name?: string,
    @Query('page') page = 1,
    @Query('perPage') perPage = 10,
    ): Promise<ConfigPrintersResponse> {
      try {
        return this.configPrinterService.findAll(print, name, page, perPage);
      } catch (error) {
        console.log(`Error finding Config Printers: ${error}`);
        throw new NotFoundException(`Error finding Config Printers: ${error}`);
      }
    }

    @Get('v1/config-printer/find-one/:id')
    @ApiOperation({ summary: 'Get a config printer by id' })
    @ApiResponse({ status: 200, type: ConfigPrinterResponse })
    @ApiBadRequestResponse({ description: 'bad request' })
    @ApiInternalServerErrorResponse({
      description: 'Internal Server Error response',
    })
    @ApiParam({
      name: 'id',
      example: 1,
      description: 'Config Printer ID',
    })
    async findOne(@Param('id') id: number): Promise<ConfigPrinterResponse> {
      try {
        return this.configPrinterService.findOne(id);
      } catch (error) {
        console.log(`Error finding Config Printer: ${error}`);
        throw new NotFoundException(`Error finding Config Printer: ${error}`);
      }
    }

    @Patch('v1/config-printer/update/:id')
    @ApiOperation({ summary: 'Update a config printer' })
    @ApiResponse({ status: 200, type: ConfigPrinterResponse })
    @ApiBadRequestResponse({ description: 'bad request' })
    @ApiInternalServerErrorResponse({
      description: 'Internal Server Error response',
    })
    @ApiParam({
      name: 'id',
      example: 1,
      description: 'Config Printer ID',
    })
    async update(
      @Param('id') id: number,
      @Body() updateConfigPrinterDto: UpdateConfigPrinterDto,
    ): Promise<ConfigPrinterResponse> {
      try {
        return this.configPrinterService.update(id, updateConfigPrinterDto);
      } catch (error) {
        console.log(`Error updating Config Printer: ${error}`);
        throw new NotFoundException(`Error updating Config Printer: ${error}`);
      }
    }

    @Get('v1/config-printer/find-printers')
    @ApiOperation({ summary: 'Get all printers available' })
    @ApiResponse({ status: 200, type: String })
    @ApiBadRequestResponse({ description: 'bad request' })
    @ApiInternalServerErrorResponse({
      description: 'Internal Server Error response',
    })
    async findPrinters(): Promise<string[]> {
      try {
        return this.configPrinterService.findPrinters();
      } catch (error) {
        console.log(`Error finding Config Printers: ${error}`);
        throw new NotFoundException(`Error finding Config Printers: ${error}`);
      }
    }
}
