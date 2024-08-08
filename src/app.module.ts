import { Module, OnModuleInit } from '@nestjs/common';
import { CardModule } from './card/card.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed/seed.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      username: 'pockemon_cards_user',
      password: 'pockemon_cards_password',
      database: 'pockemon_cards_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CardModule,
  ],
  providers: [SeedService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly seedService: SeedService) {}

  async onModuleInit() {
    // Auto generate examples in the database with cards
    await this.seedService.seed();
  }
}
