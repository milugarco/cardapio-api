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
import { GroupService } from './group.service';
import { GroupResponse, GroupsResponse } from './dto/get-group.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@ApiTags('Groups')
@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Post('v1/group')
  @ApiOperation({ summary: 'Create a new group' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: GroupResponse,
  })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error response',
  })
  async create(@Body() createGroupDto: CreateGroupDto): Promise<GroupResponse> {
    try {
      return this.groupService.create(createGroupDto);
    } catch (error) {
      console.log(`Error creating Group: ${error}`);
      throw new ConflictException(`Error creating Group: ${error}`);
    }
  }

  @Get('v1/group')
  @ApiOperation({ summary: 'Get all groups' })
  @ApiResponse({ status: 200, type: GroupsResponse })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error response',
  })
  @ApiQuery({ name: 'name', required: false, example: 'Porções' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'perPage', required: false, example: 10 })
  async findAll(
    @Query('name') name?: string,
    @Query('page') page = 1,
    @Query('perPage') perPage = 10,
  ): Promise<GroupsResponse> {
    try {
      const response = await this.groupService.findAll(name, page, perPage);
      return response;
    } catch (error) {
      console.error(error);
      throw new NotFoundException(error);
    }
  }

  @Get('v1/group/:id')
  @ApiOperation({ summary: 'Get one group' })
  @ApiResponse({ status: 200, type: GroupResponse })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error response',
  })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'Group ID',
  })
  async findOne(@Param('id') id: number): Promise<GroupResponse> {
    try {
      const response = await this.groupService.findOne(id);
      return response;
    } catch (error) {
      console.log(`Error finding group: ${error}`);
      throw new NotFoundException(`Error finding group: ${error}`);
    }
  }

  @Patch('v1/group/:id')
  @ApiOperation({ summary: 'Update a group' })
  @ApiResponse({ status: 200, type: GroupResponse })
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
    @Body() updateGroupDto: UpdateGroupDto,
  ): Promise<GroupResponse> {
    try {
      const response = await this.groupService.update(id, updateGroupDto);
      return response;
    } catch (error) {
      console.error(error);
      throw new NotFoundException(error);
    }
  }
}
