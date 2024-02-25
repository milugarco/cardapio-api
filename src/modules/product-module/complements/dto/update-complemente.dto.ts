import { ApiProperty } from "@nestjs/swagger";
import { Decimal } from "@prisma/client/runtime/library";

export class UpdateComplementDto{
    @ApiProperty({
        description: "Nome do complemento",
        example: "Cheddar",
        required: false
    })
    name?: string;

    @ApiProperty({
        description: "valor do complemento",
        example: 100,
        required: false
    })
    value?: Decimal
}