import { ApiProperty } from '@nestjs/swagger';
import { ComplementResponse } from 'src/modules/product-module/complements/dto/get-complement.dto';
import { SaleProductResponse } from '../../sale-products/dto/get-sales-products.dto';

export class ResponseSaleProductComplementsDto {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Number })
  saleProductId: number;

  @ApiProperty({ type: Number })
  complementsId: number;

  @ApiProperty({ type: () => SaleProductResponse })
  saleProduct?: SaleProductResponse;

  @ApiProperty({
    type: () => ComplementResponse,
  })
  complements?: ComplementResponse;
}
