import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from './module/ScheduleModule';

import { UserModule } from './module/UserModule';
import { ormConfig } from './ormConfig';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig),UserModule, ScheduleModule],
})
export class AppModule {}
