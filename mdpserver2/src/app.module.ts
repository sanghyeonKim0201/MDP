import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from './module/schedule.module';

import { UserModule } from './module/user.module';
import { ormConfig } from './ormConfig';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig),UserModule, ScheduleModule],
})
export class AppModule {}
