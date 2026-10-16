import { Module } from '@nestjs/common';
import { YService } from './user.service';
import { YController } from './user.controller';

@Module({
  controllers: [YController],
  providers: [YService],
})
export class YModule {}
