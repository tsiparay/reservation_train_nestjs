import {Resolver, Query, Args, Mutation} from '@nestjs/graphql'
import { BusavecsiegeEntity } from './entities/busavecsiege.entity'
import { BusavecsiegeService } from './busavecsiege.service'
import { FetchBusavecsiegeInput } from './dto/fetch-busavecsiege.input'
import { CreateBusavecsiegeInput } from './dto/create-busavecsiege.input'
import { UpdateBusavecsiegeInput } from './dto/update-busavecsiege.input'
import {Schema as MongooseSchema} from 'mongoose';
import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../utilisateur/jwt-auth.guard";

@Resolver(() => BusavecsiegeEntity)
export class BusavecsiegeResolver {
  constructor(private readonly busavecsiegeService: BusavecsiegeService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => BusavecsiegeEntity)
  async createBusavecsiege(@Args('createBusavecsiegeInput') createBusavecsiegeInput: CreateBusavecsiegeInput) {
    return await this.busavecsiegeService.create(createBusavecsiegeInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => BusavecsiegeEntity)
  async updateBusavecsiege(@Args('updateBusavecsiegeInput') updateBusavecsiegeInput: UpdateBusavecsiegeInput) {
    return await this.busavecsiegeService.update(updateBusavecsiegeInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => BusavecsiegeEntity)
  async deleteBusavecsiege(
      @Args('id', {type: () => String}) id: MongooseSchema.Types.ObjectId,
  ) {
    return this.busavecsiegeService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [BusavecsiegeEntity], { name: 'findAllBusavecsiege' })
  async findAllBusavecsiege(@Args() fetchBusavecsiegeInput: FetchBusavecsiegeInput): Promise<BusavecsiegeEntity[]> {
    return this.busavecsiegeService.findAll(fetchBusavecsiegeInput)
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Number, { name: 'countBusavecsiege' })
  async getCountBusavecsiege(): Promise<number> {
    return this.busavecsiegeService.getCount()
  }

}
