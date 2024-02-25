import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/services/prisma.service";
import { ConfigPrinterResponse, ConfigPrintersResponse } from "./dto/get-config-printer.dto";
import { CreateConfigPrinterDto } from "./dto/create-config-printer.dto";
import { Prisma } from "@prisma/client";
import { getPageInfo } from "src/utils/pageInfo";
import { UpdateConfigPrinterDto } from "./dto/update-config-printer.dto";
import { exec } from "child_process";

@Injectable()
export class ConfigPrinterService {
  constructor(private model: PrismaService) {}

  async create(createConfigPrinterDto: CreateConfigPrinterDto): Promise<ConfigPrinterResponse> {
    try {
      const { print, name } = createConfigPrinterDto;

      const configPrinter = await this.model.config.create({
        data: {
          print: print,
          name: name,
        },
      });

      return configPrinter;
    } catch (error) {
      console.log(`Error creating config printer: ${error}`);
      throw new ConflictException(`Error creating config printer: ${error}`);
    }
  }

  async findAll(print?: string, name?: string, page?: number, perPage?: number): Promise<ConfigPrintersResponse> {
    try {
      const where: Prisma.ConfigWhereInput = {};

      if (print) {
        where.print = print;
      }

      if (name) {
        where.name = name;
      }

      const totalCount: number = await this.model.config.count({ where: where });

      const configPrinters = await this.model.config.findMany({
        where: where,
        include: {
          Products: true
        },
        skip: (page - 1) * perPage,
        take: Number(perPage),
      });

      const pageInfo = getPageInfo(totalCount, page, perPage);

      const response: ConfigPrintersResponse = {
        data: configPrinters,
        pageInfo: pageInfo,
      }

      return response;
    } catch (error) {
      console.log(`Error finding config: ${error}`);
      throw new NotFoundException(`Error finding config: ${error}`);
    }
  }

  async findOne(id: number): Promise<ConfigPrinterResponse> {
   try {
    const config = await this.model.config.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        Products: true
      },
    });

    return config;
   } catch (error) {
    console.log(`Error finding config: ${error}`);
    throw new NotFoundException(`Error finding config: ${error}`);
   }
  }

  async update(id: number, updateConfigPrinterDto: UpdateConfigPrinterDto): Promise<ConfigPrinterResponse> {
    try {
      const { print, name } = updateConfigPrinterDto;

      const configPrinterExist = await this.findOne(Number(id));

      if (!configPrinterExist) {
        throw new NotFoundException(`Config printer not found`);
      }

      const configPrinterUpdate = await this.model.config.update({
        where: { id: Number(id) },
        data: {
          print: print ? print : configPrinterExist.print,
          name: name ? name : configPrinterExist.name,
        },
      })

      return configPrinterUpdate;
    } catch (error) {
      console.error(`Error updating config: ${error}`);
      throw new ConflictException(`Error updating config: ${error}`);
    }
  }

  async findPrinters(): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      exec('wmic printer get Name', (error, stdout, stderr) => {
        if (error) {
          reject(new ConflictException(error));
        }

        if (stderr) {
          reject(new ConflictException(stderr));
        }

        const rows = stdout.trim().split('\n');
        const printers = [];

        // A primeira linha contém o cabeçalho, então começamos a iteração a partir da segunda linha.
        for (let i = 1; i < rows.length; i++) {
          printers.push(rows[i].trim());
        }

        if (printers.length <= 0) {
          reject(new NotFoundException('no printer available'));
        }

        resolve(printers);
      });
    });
  }
}
