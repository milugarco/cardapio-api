import { ApiProperty } from '@nestjs/swagger';

export class CreateConfigPrinterDto {
  @ApiProperty({
    example: 'Cozinha',
    description: 'Ambient namespace',
  })
  name: string;

  @ApiProperty({
    example: 'PDF to Printer',
    description: 'Name of the printer',
  })
  print: string;
}
