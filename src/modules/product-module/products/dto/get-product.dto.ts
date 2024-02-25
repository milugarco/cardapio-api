import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ResponseProductDto } from './response-product.dto';
import { PageInfo } from 'src/utils/pageInfo';

export class ProductsResponse {
  @ApiProperty({ type: () => [ResponseProductDto] })
  data: ResponseProductDto[];

  @ApiProperty({ type: PageInfo, nullable: true })
  pageInfo?: PageInfo;
}

export class ProductResponse extends PartialType(ResponseProductDto) {}
