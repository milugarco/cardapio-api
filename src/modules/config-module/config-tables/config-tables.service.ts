import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/services/prisma.service";

@Injectable()
export class ConfigTableService{
  constructor(private model: PrismaService) {}

  async create(qtd: number): Promise<string> {
    try {
      let count = 0
      for (let i = 0; i < qtd; i++) {
        const tableExist = await this.model.configTables.findFirst({
          where: {
            name: `Mesa ${i}`,
          }
        })

        if (!tableExist) {
          await this.model.configTables.create({
            data: {
              name: `Mesa ${i}`,
            },
          });

          count++
        }
      }

      return `Create a ${count} tables successfully`;
    } catch (error) {
      console.log(`Error creating config table: ${error}`);
      throw new ConflictException(`Error creating config table: ${error}`);
    }
  }
}
