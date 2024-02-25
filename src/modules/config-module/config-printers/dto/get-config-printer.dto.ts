import { ApiProperty, PartialType } from "@nestjs/swagger";
import { PageInfo } from "src/utils/pageInfo";
import { ResponseConfigPrinterDto } from "./response-config-printer.dto";

export class ConfigPrintersResponse {
  @ApiProperty({ type: () => [ResponseConfigPrinterDto] })
  data: ResponseConfigPrinterDto[];

  @ApiProperty({ type: PageInfo, nullable: true })
  pageInfo?: PageInfo;
}

export class ConfigPrinterResponse extends PartialType(ResponseConfigPrinterDto) {}
