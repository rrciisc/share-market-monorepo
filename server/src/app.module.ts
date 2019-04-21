import { Module } from '@nestjs/common';
import { MarketController } from './market/market.controller';
import { MarketService } from './market/market.service';

@Module({
  imports: [],
  controllers: [MarketController],
  providers: [MarketService],
})
export class AppModule {}
