import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PictureModule } from './module/PictureModule';
import { ScheduleModule } from './module/ScheduleModule';

import { UserModule } from './module/UserModule';
import { ormConfig } from './ormConfig';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig),UserModule, ScheduleModule, PictureModule],
})
export class AppModule {}
