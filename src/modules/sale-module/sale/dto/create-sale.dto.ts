import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateSaleDto {
  @ApiProperty({ type: Number })
  @IsInt()
  @IsNotEmpty()
  configTablesId: number;

  @ApiProperty({ type: Number })
  @IsInt()
  @IsNotEmpty()
  total: number;

  /*  @ApiProperty({ type: [CreateSaleProductDto] })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateSaleProductDto)
  saleProducts: CreateSaleProductDto[]; */
}
