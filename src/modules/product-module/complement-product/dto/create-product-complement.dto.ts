import { ApiProperty } from "@nestjs/swagger";

export class CreateProductComplementDto{
    @ApiProperty({
        description: "Id do produto",
        example: 1,
    })
    productId: number;

    @ApiProperty({
        description: "Id do complemento",
        example: 1,
    })
    complementId: number;
}

export class CreateProductComplementsDto{
    @ApiProperty({
        description: "Id do produto",
        example: 1,
    })
    productId: number;

    @ApiProperty({
        description: "Id do complemento",
        example: [1, 2, 3],
    })
    complementsId: number[];
}
