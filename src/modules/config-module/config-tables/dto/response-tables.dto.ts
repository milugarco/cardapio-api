import { ApiProperty } from '@nestjs/swagger';

export class ResponseConfigTablesDto {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Number })
  name: string;
}
