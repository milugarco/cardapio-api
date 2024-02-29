import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ResponsiveComplementDto } from './responsive-complement.dto';
import { PageInfo } from 'src/utils/pageInfo';

export class ComplementsResponse {
  @ApiProperty({ type: () => [ResponsiveComplementDto] })
  data: ResponsiveComplementDto[];

  @ApiProperty({ type: PageInfo, nullable: true })
  pageInfo?: PageInfo;
}

export class ComplementResponse extends PartialType(ResponsiveComplementDto) {}
