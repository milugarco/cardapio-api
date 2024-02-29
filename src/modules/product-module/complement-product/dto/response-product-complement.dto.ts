import { ApiProperty } from '@nestjs/swagger';
import { ComplementResponse } from '../../complements/dto/get-complement.dto';

export class ReponseProductComplementDto {
  @ApiProperty({
    description: 'Id do produto',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Id do produto',
    example: 1,
  })
  productsId: number;

  @ApiProperty({
    description: 'Id do complemento',
    example: 1,
  })
  complementsId: number;

  @ApiProperty({
    type: () => ComplementResponse,
  })
  complement: ComplementResponse;
}
