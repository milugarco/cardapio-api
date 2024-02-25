import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupDto {
  @ApiProperty({
    example: 'X-Burger',
    description: 'Nome do grupo',
    required: true,
  })
  name: string;
}
