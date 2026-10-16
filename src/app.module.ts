import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaaModule } from './config/db/prisma.module';
import { YModule } from './user/user.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath : '.env',
      isGlobal: true
    }),
    PrismaaModule,
    YModule
  ],
})
export class AppModule {}
