// src/seed/seed.service.ts

import { Injectable } from '@nestjs/common';
import { CardService } from '../card/card.service';

@Injectable()
export class SeedService {
  constructor(private readonly cardService: CardService) {}

  async seed(): Promise<void> {
    const cards = [
      {
        name: 'Pikachu',
        type: 'Electric',
        hp: 60,
        abilities: ['Thunder Shock'],
        weaknesses: ['Ground'],
        resistances: ['Flying', 'Steel'],
      },
      {
        name: 'Charizard',
        type: 'Fire',
        hp: 180,
        abilities: ['Flamethrower', 'Fly'],
        weaknesses: ['Water'],
        resistances: ['Grass', 'Fairy'],
      },
      {
        name: 'Feraligatr',
        type: 'Water',
        hp: 180,
        abilities: ['Torrential Heart', 'Hydro Cannon'],
        weaknesses: ['Electric', 'Grass'],
        resistances: ['Fire', 'Steel'],
      },
      {
        name: 'Scizor',
        type: 'Steel',
        hp: 120,
        abilities: ['Ekoskeleton', 'Bullet Punch'],
        weaknesses: ['Fire'],
        resistances: ['Bug', 'Normal', 'Psychic'],
      },
    ];

    for (const card of cards) {
      const existingCard = await this.cardService.findByName(card.name);
      if (!existingCard) {
        await this.cardService.create(card);
      }
    }
  }
}

