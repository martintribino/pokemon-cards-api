import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  type: string;

  @Column()
  hp: number;

  @Column('simple-array')
  abilities: string[];

  @Column('simple-array')
  weaknesses: string[];

  @Column('simple-array')
  resistances: string[];
}