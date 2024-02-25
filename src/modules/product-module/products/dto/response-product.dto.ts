import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';
import { ProductComplementResponse } from '../../complement-product/dto/get-product-complement.dto';

export class ResponseProductDto {
   @ApiProperty({
    example: 1,
    description: 'Id do produto',
  })
  id: number;

  @ApiProperty({
    example: 'X-Burger',
    description: 'Nome do produto',
  })
  name: string;

  @ApiProperty({
    example: 100,
    description: 'Valor do produto',
  })
  value: Decimal;

  @ApiProperty({
    example: 'Hambuguer',
    description: 'Descrição do produto',
  })
  description: string;

  @ApiProperty({
    example: 100,
    description: 'Grupo do produto',
  })
  groupsId: number;

    @ApiProperty({
    example: 100,
    description: 'Impressora do produto',
    required: true,
  })
  configId?: number;

  @ApiProperty({
    type: () => [ProductComplementResponse],
  })
  ProductComplements: ProductComplementResponse[];
}
