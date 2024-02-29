import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductComplementDto {
  @ApiProperty({
    description: 'Id do complemento',
    example: 1,
  })
  complementId: number;
}
