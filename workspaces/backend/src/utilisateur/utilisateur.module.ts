import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UtilisateurModel, UtilisateurSchema } from '../mongoose/schema'
import { UtilisateurService } from './utilisateur.service'
import { UtilisateurResolver } from './utilisateur.resolver'

import { JwtService} from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import {AuthenticationService} from "./authentication.service";
import {JwtStrategy} from "./jwt.strategy.service";


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    MongooseModule.forFeature([{ name: UtilisateurModel.name, schema: UtilisateurSchema }]),
    ],
  providers: [UtilisateurResolver, UtilisateurService, AuthenticationService, JwtService, JwtStrategy],
})

export class UtilisateurModule {}
