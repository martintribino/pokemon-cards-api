import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsEnum, IsInt, IsString, Max, Min, MinLength } from "class-validator";

enum PokemonType {
  Bug = 'Bug',
  Fire = 'Fire',
  Fly = 'Fly',
  Grass = 'Grass',
  Ground = 'Ground',
  Electric = 'Electric',
  Psychic = 'Psychic',
  Steel = 'Steel',
  Water = 'Water',
}

export class CreateCardDto {

  @ApiProperty({ description: 'The name of the Pokemon card' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ description: 'The type of the Pokemon' })
  @IsEnum(PokemonType, { message: 'Type must be one of the specified Pokemon types' })
  type: string;

  @ApiProperty({ description: 'The HP of the Pokemon' })
  @IsInt()
  @Min(1)
  @Max(500)
  hp: number;

  @ApiProperty({ description: 'The src of the image' })
  @IsString()
  src: string;

  @ApiProperty({ description: 'List of Pokemon abilities' })
  @IsArray()
  @ArrayMinSize(0)
  abilities: string[];

  @ApiProperty({ description: 'List of Pokemon types that this Pokemon is weak against' })
  @IsArray()
  @ArrayMinSize(0)
  @IsEnum(PokemonType, { each: true, message: 'Weaknesses must be one of the specified Pokemon types' })
  weaknesses: PokemonType[];

  @ApiProperty({ description: 'List of Pokemon types that this Pokemon is resistant to' })
  @IsArray()
  @ArrayMinSize(0)
  @IsEnum(PokemonType, { each: true, message: 'Resistances must be one of the specified Pokemon types' })
  resistances: PokemonType[];
}