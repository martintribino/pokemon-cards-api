import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from '../model/card.entity';
import { BattleService } from 'src/battle/battle.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Card])],
  providers: [CardService, BattleService, JwtService],
  controllers: [CardController],
  exports: [CardService, BattleService],
})
export class CardModule {}
