import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UserModule } from './module/user.module';
import { ormConfig } from './ormConfig';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig),UserModule],
})
export class AppModule {}
