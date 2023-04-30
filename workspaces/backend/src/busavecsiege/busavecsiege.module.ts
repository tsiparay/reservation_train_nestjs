import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { BusavecsiegeModel, BusavecsiegeSchema } from '../mongoose/schema'
import { BusavecsiegeService } from './busavecsiege.service'
import { BusavecsiegeResolver } from './busavecsiege.resolver'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BusavecsiegeModel.name, schema: BusavecsiegeSchema }]),
  ],
  providers: [BusavecsiegeResolver, BusavecsiegeService],
})

export class BusavecsiegeModule {}
