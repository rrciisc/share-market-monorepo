import { Module, HttpModule } from '@nestjs/common';
import { MarketController } from './market/market.controller';
import { MarketService } from './market/market.service';

@Module({
  imports: [HttpModule],
  controllers: [MarketController],
  providers: [MarketService],
})
export class AppModule {}
