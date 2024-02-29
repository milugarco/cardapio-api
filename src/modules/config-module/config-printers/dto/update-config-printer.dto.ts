import { ApiProperty } from '@nestjs/swagger';

export class UpdateConfigPrinterDto {
  @ApiProperty({
    example: 'PDF to Printer',
    description: 'Name of the printer',
  })
  print?: string;

  @ApiProperty({
    example: 'Bar',
    description: 'Ambient name',
  })
  name?: string;
}
