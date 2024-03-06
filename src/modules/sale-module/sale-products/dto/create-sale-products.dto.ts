import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { CreateSaleProductComplementsDto } from '../../sale-product-complements/dto/create-sale-product-complements.dto';

export class CreateSaleProductDto {
  @ApiProperty({ type: Number })
  @IsInt()
  @IsNotEmpty()
  productId: number;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  obs?: string;

  @ApiProperty({ type: () => CreateSaleProductComplementsDto })
  createSaleProductComplementsDto?: CreateSaleProductComplementsDto;
}
