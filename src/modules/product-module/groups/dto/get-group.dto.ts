import { ApiProperty, PartialType } from "@nestjs/swagger";
import { PageInfo } from "src/utils/pageInfo";
import { ResponseGroupDto } from "./response-group.dto";

export class GroupsResponse {
  @ApiProperty({ type: () => [ResponseGroupDto] })
  data: ResponseGroupDto[];

  @ApiProperty({ type: PageInfo, nullable: true })
  pageInfo?: PageInfo;
}

export class GroupResponse extends PartialType(ResponseGroupDto) {}
