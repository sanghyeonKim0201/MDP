import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controller/user.controller';
import { User } from 'src/domain/entity/user.entity';
import { UserRepository } from 'src/domain/repository/user.repository';
import { secretKey } from 'src/ormConfig';
import { UserService } from 'src/service/user.service';

@Module({
    imports : [TypeOrmModule.forFeature([User]), JwtModule.register({
        secret : secretKey,
        signOptions : {expiresIn : "3000s"}
    }), PassportModule ],
    controllers : [UserController],
    providers : [UserService, UserRepository]
})
export class UserModule {}
