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
        hp: 120,
        abilities: ['Thunder Shock'],
        src: 'https://makepix.b-cdn.net/makepix_88801440-a192-497e-9d69-ae7bdb9e4c76/cute-pikachu-49a585be_0_s.webp',
        weaknesses: ['Ground'],
        resistances: ['Fly', 'Steel'],
      },
      {
        name: 'Charizard',
        type: 'Fire',
        hp: 180,
        src: 'https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/a0c6ba30-ca2b-4a33-b920-0a52f2364e9a/03542ee1-e687-4fa9-9b05-4abafbb3005b.png',
        abilities: ['Flamethrower', 'Fly'],
        weaknesses: ['Water'],
        resistances: ['Grass'],
      },
      {
        name: 'Feraligatr',
        type: 'Water',
        hp: 180,
        src: 'https://static.zerochan.net/Feraligatr.full.3597630.jpg',
        abilities: ['Torrential Heart', 'Hydro Cannon'],
        weaknesses: ['Electric', 'Grass'],
        resistances: ['Fire', 'Steel'],
      },
      {
        name: 'Scizor',
        type: 'Steel',
        hp: 120,
        src: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/70649f20-d31b-4470-adf2-5ad4c2c2eafd/d6za6d5-9eeb9563-d9eb-4744-8f1b-ad1bc024af64.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzcwNjQ5ZjIwLWQzMWItNDQ3MC1hZGYyLTVhZDRjMmMyZWFmZFwvZDZ6YTZkNS05ZWViOTU2My1kOWViLTQ3NDQtOGYxYi1hZDFiYzAyNGFmNjQuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0._Sy1bd1yVXr-Sl3PEd1l9-RHm8dFRUT7SZ5MZ4eOxmU',
        abilities: ['Ekoskeleton', 'Bullet Punch'],
        weaknesses: ['Fire'],
        resistances: ['Bug', 'Psychic'],
      },
    ];

    for (const card of cards) {
      const existingCard = await this.cardService.findByName(card.name);
      if (existingCard) {
        await this.cardService.update(existingCard.id, card);
      } else {
        await this.cardService.create(card);
      }
    }
  }
}

