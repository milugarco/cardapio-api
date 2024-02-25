import { ApiProperty, PartialType } from "@nestjs/swagger";
import { ReponseProductComplementDto } from "./response-product-complement.dto";
import { PageInfo } from "src/utils/pageInfo";

export class ProductComplementsResponse {
  @ApiProperty({ type: () => [ReponseProductComplementDto] })
  data: ReponseProductComplementDto[];

  @ApiProperty({ type: PageInfo, nullable: true })
  pageInfo?: PageInfo;
}

export class ProductComplementResponse extends PartialType(ReponseProductComplementDto) {}
