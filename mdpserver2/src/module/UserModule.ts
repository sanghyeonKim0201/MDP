import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controller/UserController';
import { User } from 'src/domain/entity/UserEntity';
import { AuthRepository } from 'src/domain/repository/AuthRepository';
import { UserRepository } from 'src/domain/repository/UserRepository';
import { secretKey } from 'src/ormConfig';
import { JwtStrategy } from 'src/security/JwtStrategy';
import { UserService } from 'src/service/UserService';

@Module({
    imports : [TypeOrmModule.forFeature([User]), JwtModule.register({
        secret : secretKey,
        signOptions : {expiresIn : "3000s"}
    }), PassportModule.register({defaultStrategy : "jwt"})],
    controllers : [UserController],
    providers : [UserService, UserRepository, AuthRepository, JwtStrategy],
    exports : [JwtStrategy, PassportModule]
})
export class UserModule {}
