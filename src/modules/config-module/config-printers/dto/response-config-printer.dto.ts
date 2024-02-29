import { ApiProperty } from '@nestjs/swagger';
import { ProductResponse } from 'src/modules/product-module/products/dto/get-product.dto';

export class ResponseConfigPrinterDto {
  @ApiProperty({
    example: 1,
    description: 'Id config printer',
  })
  id: number;

  @ApiProperty({
    example: 'PDF to Printer',
    description: 'Name of the printer',
  })
  print: string;

  @ApiProperty({
    example: 'Bar',
    description: 'Ambient name',
  })
  name: string;

  @ApiProperty({
    type: () => [ProductResponse],
  })
  Products: ProductResponse[];
}
