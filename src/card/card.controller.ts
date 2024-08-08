import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CardService } from './card.service';
import { Card } from 'src/model/card.entity';
import { BattleService } from 'src/battle/battle.service';

@Controller('cards')
export class CardController {
  constructor(
    private readonly cardService: CardService,
    private readonly battleService: BattleService,
  ) {}

  @Post()
  async create(@Body() createCardDto: Partial<Card>): Promise<Card> {
    return this.cardService.create(createCardDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCardDto: Partial<Card>,
  ): Promise<Card> {
    return this.cardService.update(id, updateCardDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Card> {
    return this.cardService.findById(id);
  }

  @Get()
  async findAll(): Promise<Card[]> {
    return this.cardService.findAll();
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.cardService.delete(id);
  }

  @Get(':id/battle/:opponentId')
  async simulateBattle(
    @Param('id', ParseIntPipe) id: number,
    @Param('opponentId', ParseIntPipe) opponentId: number,
  ): Promise<string> {
    return this.battleService.simulateBattle(id, opponentId);
  }

  @Get(':id/weaknesses-resistances')
  async getWeaknessesAndResistances(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ weaknesses: string[], resistances: string[] }> {
    return this.battleService.getWeaknessesAndResistances(id);
  }
}
