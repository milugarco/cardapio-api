import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateSaleProductComplementsDto {
  @ApiProperty({ type: Number })
  @IsInt()
  @IsNotEmpty()
  saleProductId: number;

  @ApiProperty({ type: [Number] })
  @IsInt()
  @IsNotEmpty()
  complementsId: number[];
}
