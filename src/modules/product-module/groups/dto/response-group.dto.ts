import { ApiProperty } from '@nestjs/swagger';
import { ProductResponse } from '../../products/dto/get-product.dto';

export class ResponseGroupDto {
  @ApiProperty({
    example: 1,
    description: 'Id do produto',
  })
  id: number;

  @ApiProperty({
    example: 'X-Burger',
    description: 'Nome do grupo',
  })
  name: string;

  @ApiProperty({
    type: () => [ProductResponse],
  })
  Product: ProductResponse[];
}
