import { ApiProperty } from '@nestjs/swagger';
import { ProductResponse } from 'src/modules/product-module/products/dto/get-product.dto';
import { SaleProductComplementResponse } from '../../sale-product-complements/dto/get-sales-product-complements.dto';

export class ResponseSaleProductsDto {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Number })
  productsId: number;

  @ApiProperty({ type: Number })
  salesId: number;

  @ApiProperty({ type: Number, required: false })
  obs: string;

  @ApiProperty({ type: Boolean })
  value: number;

  @ApiProperty({
    type: Boolean,
  })
  isPrint: boolean;

  @ApiProperty({
    type: () => ProductResponse,
  })
  products?: ProductResponse;

  @ApiProperty({ type: () => [SaleProductComplementResponse] })
  SaleProductComplements?: SaleProductComplementResponse[];
}
