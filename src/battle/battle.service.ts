import { Injectable } from '@nestjs/common';
import { CardService } from 'src/card/card.service';

@Injectable()
export class BattleService {
  constructor(private readonly cardService: CardService) {}

  async simulateBattle(attackerId: number, defenderId: number): Promise<string> {
    const attacker = await this.cardService.findById(attackerId);
    const defender = await this.cardService.findById(defenderId);

    const isWeak = defender.weaknesses.includes(attacker.type);
    const isResistant = defender.resistances.includes(attacker.type);

    let damageMultiplier = 1;
    if (isWeak) damageMultiplier = 2;
    if (isResistant) damageMultiplier = 0.5;
    // Assuming a base damage of 50
    const damage = 50 * damageMultiplier;

    return damage >= defender.hp
      ? `${attacker.name} defeats ${defender.name}`
      : `${attacker.name} does not defeat ${defender.name}`;
  }

  async getWeaknessesAndResistances(cardId: number): Promise<{ weaknesses: string[], resistances: string[] }> {
    const card = await this.cardService.findById(cardId);
    return {
      weaknesses: card.weaknesses,
      resistances: card.resistances,
    };
  }
}