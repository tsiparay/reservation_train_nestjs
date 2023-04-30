import {Resolver, Query, Args, Mutation} from '@nestjs/graphql'
import { BusavecsiegeEntity } from './entities/busavecsiege.entity'
import { BusavecsiegeService } from './busavecsiege.service'
import { FetchBusavecsiegeInput } from './dto/fetch-busavecsiege.input'
import { CreateBusavecsiegeInput } from './dto/create-busavecsiege.input'
import { UpdateBusavecsiegeInput } from './dto/update-busavecsiege.input'
import {Schema as MongooseSchema} from 'mongoose';

@Resolver(() => BusavecsiegeEntity)
export class BusavecsiegeResolver {
  constructor(private readonly busavecsiegeService: BusavecsiegeService) {}

  @Mutation(() => BusavecsiegeEntity)
  async createBusavecsiege(@Args('createBusavecsiegeInput') createBusavecsiegeInput: CreateBusavecsiegeInput) {
    return await this.busavecsiegeService.create(createBusavecsiegeInput);
  }


  @Mutation(() => BusavecsiegeEntity)
  async updateBusavecsiege(@Args('updateBusavecsiegeInput') updateBusavecsiegeInput: UpdateBusavecsiegeInput) {
    return await this.busavecsiegeService.update(updateBusavecsiegeInput);
  }

  @Mutation(() => BusavecsiegeEntity)
  async deleteBusavecsiege(
      @Args('id', {type: () => String}) id: MongooseSchema.Types.ObjectId,
  ) {
    return this.busavecsiegeService.delete(id);
  }

  @Query(() => [BusavecsiegeEntity], { name: 'findAllBusavecsiege' })
  async findAllBusavecsiege(@Args() fetchBusavecsiegeInput: FetchBusavecsiegeInput): Promise<BusavecsiegeEntity[]> {
    return this.busavecsiegeService.findAll(fetchBusavecsiegeInput)
  }


  @Query(() => Number, { name: 'countBusavecsiege' })
  async getCountBusavecsiege(): Promise<number> {
    return this.busavecsiegeService.getCount()
  }

}
