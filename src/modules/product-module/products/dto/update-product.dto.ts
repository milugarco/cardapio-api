import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';

export class UPdateProductDto {
  @ApiProperty({
    example: 'X-Burger',
    description: 'Nome do produto',
    required: false,
  })
  name?: string;

  @ApiProperty({
    example: 100,
    description: 'Valor do produto',
    required: false,
  })
  value?: Decimal;

  @ApiProperty({
    example: 'Hambuguer',
    description: 'Descrição do produto',
    required: false,
  })
  description?: string;

  @ApiProperty({
    example: 100,
    description: 'Grupo do produto',
    required: false,
  })
  groupsId?: number;

    @ApiProperty({
    example: 100,
    description: 'Impressora do produto',
    required: true,
  })
  configId?: number;
}
