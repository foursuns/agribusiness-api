import { Module } from '@nestjs/common';
import { CultureService } from './cultures/culture.service';
import { CultureController } from './cultures/culture.controller';
import { ProducerController } from './producers/producer.controller';
import { ProducerService } from './producers/producer.service';
import { SpecieController } from './species/specie.controller';
import { SpecieService } from './species/specie.service';
import { FarmController } from './farms/farm.controller';
import { FarmService } from './farms/farm.service';
import { HarvestController } from './harvests/harvest.controller';
import { HarvestService } from './harvests/harvest.service';
import { DashboardController } from './dashboard/dashboard.controller';
import { DashboardService } from './dashboard/dashboard.service';

@Module({
  controllers: [
    CultureController,
    DashboardController,
    FarmController,
    HarvestController,
    ProducerController,
    SpecieController,
  ],
  providers: [
    CultureService,
    DashboardService,
    FarmService,
    HarvestService,
    ProducerService,
    SpecieService,
  ],
})
export class AgriculturalModule {}
