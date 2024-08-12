import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CardService } from './card.service';
import { Card } from 'src/model/card.entity';
import { BattleService } from 'src/battle/battle.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCardDto } from 'src/auth/dto/create-card.dto';

@ApiTags('cards')
@ApiBearerAuth('access-token')
@Controller('cards')
@UseGuards(JwtAuthGuard)
export class CardController {
  constructor(
    private readonly cardService: CardService,
    private readonly battleService: BattleService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new pokemon card' })
  @ApiResponse({ status: 201, description: 'The card has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async create(@Body() createCardDto: CreateCardDto): Promise<Card> {
    return this.cardService.create(createCardDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a specific pokemon card by ID' })
  @ApiResponse({ status: 200, description: 'Card updated.' })
  @ApiResponse({ status: 404, description: 'Card not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCardDto: CreateCardDto,
  ): Promise<Card> {
    return this.cardService.update(id, updateCardDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific pokemon card by ID' })
  @ApiResponse({ status: 200, description: 'Card found.' })
  @ApiResponse({ status: 404, description: 'Card not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Card> {
    return this.cardService.findById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve pokemon cards by query' })
  @ApiResponse({ status: 200, description: 'Cards found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiQuery({ name: "type", type: String, required: false })
  @ApiQuery({ name: "name", type: String, required: false })
  async getAllCards(
    @Query('type') type?: string,
    @Query('name') name?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{ data: Card[], total: number }> {
    return this.cardService.getAllCards(type, name, page, limit);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific pokemon card by ID' })
  @ApiResponse({ status: 200, description: 'Card deleted.' })
  @ApiResponse({ status: 404, description: 'Card not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.cardService.delete(id);
  }

  @Get(':id/battle/:opponentId')
  @ApiOperation({ summary: 'Battle between pokemon cards' })
  @ApiResponse({ status: 200, description: 'Battle succeded' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Cards not found.' })
  async simulateBattle(
    @Param('id', ParseIntPipe) id: number,
    @Param('opponentId', ParseIntPipe) opponentId: number,
  ): Promise<{ message: string, defeat: boolean }> {
    return this.battleService.simulateBattle(id, opponentId);
  }
}
