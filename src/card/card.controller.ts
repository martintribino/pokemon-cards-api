import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CardService } from './card.service';
import { Card } from 'src/model/card.entity';
import { BattleService } from 'src/battle/battle.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('cards')
@UseGuards(JwtAuthGuard)
export class CardController {
  constructor(
    private readonly cardService: CardService,
    private readonly battleService: BattleService,
    private readonly jwtService: JwtService,
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
  async getAllCards(
    @Query('type') type?: string,
    @Query('name') name?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{ data: Card[], total: number }> {
    return this.cardService.getAllCards(type, name, page, limit);
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
