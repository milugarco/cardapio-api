
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsBoolean, IsOptional, ValidateNested } from 'class-validator';

export class UpdateSaleDto {
  @ApiProperty({ type: Number, required: false })
  @IsInt()
  @IsOptional()
  configTablesId?: number;

  @ApiProperty({ type: Number, required: false })
  @IsInt()
  @IsOptional()
  total?: number;

  @ApiProperty({ type: Number, required: false })
  @IsInt()
  @IsOptional()
  alreadyPay?: number;
}
