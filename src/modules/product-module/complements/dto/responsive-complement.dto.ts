import { ApiProperty } from "@nestjs/swagger";
import { Decimal } from "@prisma/client/runtime/library";

export class ResponsiveComplementDto{
   @ApiProperty({
     description: "Nome do complemento",
     example: "Cheddar",
    })
    id: number;

    @ApiProperty({
        
        description: "Nome do complemento",
        example: "Cheddar",
        
    })
    name: string;

    @ApiProperty({
        description: "valor do complemento",
        example: 100,
    
    })
    value: Decimal
}