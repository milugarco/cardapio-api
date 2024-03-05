import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { CreateSaleProductDto } from '../../sale-products/dto/create-sale-products.dto';

export class CreateSaleDto {
  @ApiProperty({ type: Number })
  @IsInt()
  @IsNotEmpty()
  configTablesId: number;

  @ApiProperty({ type: Number })
  @IsInt()
  @IsNotEmpty()
  total: number;

  @ApiProperty({ type: [CreateSaleProductDto] })
  saleProducts: CreateSaleProductDto[];
}
