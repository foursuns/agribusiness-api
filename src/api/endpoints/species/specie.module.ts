import { Module } from '@nestjs/common';
import { SpecieService } from './specie.service';
import { SpecieController } from './specie.controller';

@Module({
  controllers: [SpecieController],
  providers: [SpecieService],
})
export class SpecieModule {}
