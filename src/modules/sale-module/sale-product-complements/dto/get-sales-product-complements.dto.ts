import { ApiProperty, PartialType } from '@nestjs/swagger';
import { PageInfo } from 'src/utils/pageInfo';
import { ResponseSaleProductComplementsDto } from './response-sale-product-complements.dto';

export class SaleProductComplementsResponse {
  @ApiProperty({ type: () => [ResponseSaleProductComplementsDto] })
  data: ResponseSaleProductComplementsDto[];

  @ApiProperty({ type: PageInfo, nullable: true })
  pageInfo?: PageInfo;
}

export class SaleProductComplementResponse extends PartialType(
  ResponseSaleProductComplementsDto,
) {}
