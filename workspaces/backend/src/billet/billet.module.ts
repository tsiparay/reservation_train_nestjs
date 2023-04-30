import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { BilletModel, BilletSchema } from '../mongoose/schema'
import { BilletService } from './billet.service'
import { BilletResolver } from './billet.resolver'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BilletModel.name, schema: BilletSchema }]),
  ],
  providers: [BilletResolver, BilletService],
})

export class BilletModule {}
