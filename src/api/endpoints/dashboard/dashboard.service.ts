import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { ResponseDto } from 'src/api/interfaces/response';
import { customMessage, MESSAGE } from '@app/common';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async queryCulture() {
    return await this.prisma
      .$queryRaw`SELECT h.culture_id, h.year, s.name, SUM(f.planting_area) as planting_area
      FROM harvests h
      LEFT JOIN cultures c ON
      c.id = h.culture_id
      LEFT JOIN species s ON
      s.id = c.specie_id
      LEFT JOIN farms f ON
      f.id = h.farm_id
      GROUP BY h.year, h.culture_id, s.name
      ORDER BY h.year desc, s.name`;
  }

  async queryFarm() {
    return await this.prisma.farm.aggregate({
      _count: {
        name: true,
      },
      _sum: {
        total_area: true,
        planting_area: true,
        vegetation_area: true,
      },
    });
  }

  async queryState() {
    return await this.prisma.farm.groupBy({
      by: ['state'],
      _count: {
        name: true,
      },
      _sum: {
        total_area: true,
        planting_area: true,
        vegetation_area: true,
      },
    });
  }

  async dashboard(): Promise<ResponseDto> {
    const farms = await this.queryFarm();
    const cultures = await this.queryCulture();
    const states = await this.queryState();

    const dashboard = {
      farms,
      cultures,
      states,
    };

    if (!dashboard) {
      return customMessage(HttpStatus.NOT_FOUND, `Dashboard ${MESSAGE.NOT_FOUND}`, {});
    }
    return customMessage(HttpStatus.OK, MESSAGE.SUCCESS, dashboard);
  }
}
