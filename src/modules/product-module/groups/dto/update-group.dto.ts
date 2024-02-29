import { ApiProperty } from '@nestjs/swagger';

export class UpdateGroupDto {
  @ApiProperty({
    example: 'Lanches',
    description: 'Nome do grupo',
    required: true,
  })
  name: string;
}
