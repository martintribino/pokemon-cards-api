import { BadRequestException, Injectable } from '@nestjs/common';
import { CardService } from 'src/card/card.service';

@Injectable()
export class BattleService {
  constructor(private readonly cardService: CardService) {}

  async simulateBattle(attackerId: number, defenderId: number): Promise<{ message: string, defeat: boolean }> {

    if (attackerId === defenderId) {
      throw new BadRequestException(`Attacker and defender must be different`);
    }

    const attacker = await this.cardService.findById(attackerId);
    const defender = await this.cardService.findById(defenderId);

    if (!attacker || !defender) {
      throw new BadRequestException(`Card not found`);
    }

    const isWeak = defender.weaknesses.includes(attacker.type);
    const isResistant = defender.resistances.includes(attacker.type);

    let damageMultiplier = 1;
    if (isWeak) damageMultiplier = 2;
    if (isResistant) damageMultiplier = 0.5;
    const damage = attacker.hp * damageMultiplier;
    const defeat = damage >= defender.hp;
    const message = defeat
      ? `${attacker.name.toUpperCase()} defeats ${defender.name.toUpperCase()}`
      : `${attacker.name.toUpperCase()} does not defeat ${defender.name.toUpperCase()}`;
    return { message, defeat }
  }
}