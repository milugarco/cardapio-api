import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';

export class CreateProductDto {
  @ApiProperty({
    example: 'X-Burger',
    description: 'Nome do produto',
    required: true,
  })
  name: string;

  @ApiProperty({
    example: 100,
    description: 'Valor do produto',
    required: true,
  })
  value: Decimal;

  @ApiProperty({
    example: 'Hambuguer',
    description: 'Descrição do produto',
    required: false,
  })
  description?: string;

  @ApiProperty({
    example: 100,
    description: 'Grupo do produto',
    required: true,
  })
  groupsId?: number;

  @ApiProperty({
    example: 100,
    description: 'Impressora do produto',
    required: true,
  })
  configId?: number;
}
