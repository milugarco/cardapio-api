import { ApiProperty, PartialType } from '@nestjs/swagger';
import { PageInfo } from 'src/utils/pageInfo';
import { ResponseSaleDto } from './response-sale.dto';

export class SalesResponse {
  @ApiProperty({ type: () => [ResponseSaleDto] })
  data: ResponseSaleDto[];

  @ApiProperty({ type: PageInfo, nullable: true })
  pageInfo?: PageInfo;
}

export class SaleResponse extends PartialType(ResponseSaleDto) {}
