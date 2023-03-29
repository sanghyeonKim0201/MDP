import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controller/user.controller';
import { User } from 'src/domain/entity/user.entity';
import { UserRepository } from 'src/domain/repository/user.repository';
import { UserService } from 'src/service/user.service';

@Module({
    imports : [TypeOrmModule.forFeature([User])],
    controllers : [UserController],
    providers : [UserService, UserRepository]
})
export class UserModule {}
