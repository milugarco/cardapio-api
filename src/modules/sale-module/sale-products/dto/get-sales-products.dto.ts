import { ApiProperty, PartialType } from '@nestjs/swagger';
import { PageInfo } from 'src/utils/pageInfo';
import { ResponseSaleProductsDto } from './response-sale-products.dto';

export class SaleProductsResponse {
  @ApiProperty({ type: () => [ResponseSaleProductsDto] })
  data: ResponseSaleProductsDto[];

  @ApiProperty({ type: PageInfo, nullable: true })
  pageInfo?: PageInfo;
}

export class SaleProductResponse extends PartialType(ResponseSaleProductsDto) {}
