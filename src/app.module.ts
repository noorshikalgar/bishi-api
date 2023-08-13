import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PaymentModule } from './payment/payment.module';
import { BishiModule } from './bishi/bishi.module';
import { WinnersModule } from './winners/winners.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Hacked@123',
      database: 'bishi',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    PaymentModule,
    BishiModule,
    WinnersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
