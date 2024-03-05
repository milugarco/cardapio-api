import { ApiProperty } from '@nestjs/swagger';
import { ResponseConfigTablesDto } from 'src/modules/config-module/config-tables/dto/response-tables.dto';
import { SaleProductResponse } from '../../sale-products/dto/get-sales-products.dto';

export class ResponseSaleDto {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Number })
  configTablesId: number;

  @ApiProperty({ type: Number })
  total: number;

  @ApiProperty({ type: Number, required: false })
  alreadyPay: number;

  @ApiProperty({ type: Boolean })
  finished: boolean;

  @ApiProperty({
    type: () => ResponseConfigTablesDto,
  })
  configTables?: ResponseConfigTablesDto;

  @ApiProperty({
    type: () => [SaleProductResponse],
  })
  saleProducts?: SaleProductResponse[];
}
