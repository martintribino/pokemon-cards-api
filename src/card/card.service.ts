import { Injectable, NotFoundException } from '@nestjs/common';
import { Card } from '../model/card.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) {}

  async create(card: Partial<Card>): Promise<Card> {
    const newCard = this.cardRepository.create(card);
    return this.cardRepository.save(newCard);
  }

  async update(id: number, updateData: Partial<Card>): Promise<Card> {
    const card = await this.cardRepository.preload({
      id,
      ...updateData,
    });
    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
    return this.cardRepository.save(card);
  }

  async findById(id: number): Promise<Card> {
    const card = await this.cardRepository.findOneBy({id});
    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
    return card;
  }

  async findByName(name: string): Promise<Card> {
    const card = await this.cardRepository.findOneBy({name});
    if (!card) {
      throw new NotFoundException(`Card with name ${name} not found`);
    }
    return card;
  }

  async findAll(): Promise<Card[]> {
    return this.cardRepository.find();
  }

  async delete(id: number): Promise<void> {
    const result = await this.cardRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
  }
}
