import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { MongooseModule } from '@nestjs/mongoose'
import { BusavecsiegeModule } from './busavecsiege/busavecsiege.module'
import { UtilisateurModule } from './utilisateur/utilisateur.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import configuration from '../nest.config'
import {BilletModule} from "./billet/billet.module";

@Module({
  imports: [
    BusavecsiegeModule, BilletModule,UtilisateurModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('databaseUrl'),
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      include: [BusavecsiegeModule, BilletModule, UtilisateurModule],
    }),
  ],
})
export class AppModule {}
