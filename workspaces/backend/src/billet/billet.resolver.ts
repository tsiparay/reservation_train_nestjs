import {Resolver, Query, Args, Mutation} from '@nestjs/graphql'
import { BilletEntity } from './entities/billet.entity'
import { BilletService } from './billet.service'
import { FetchBilletInput } from './dto/fetch-billet.input'
import { CreateBilletInput } from './dto/create-billet.input'
import { UpdateBilletInput } from './dto/update-billet.input'
import {Schema as MongooseSchema} from 'mongoose';
import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../utilisateur/jwt-auth.guard";

@Resolver(() => BilletEntity)
export class BilletResolver {
  constructor(private readonly billetService: BilletService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => BilletEntity)
  async createBillet(@Args('createBilletInput') createBilletInput: CreateBilletInput) {
    return await this.billetService.create(createBilletInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => BilletEntity)
  async updateBillet(@Args('updateBilletInput') updateBilletInput: UpdateBilletInput) {
    return await this.billetService.update(updateBilletInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => BilletEntity)
  async deleteBillet(
      @Args('id', {type: () => String}) id: MongooseSchema.Types.ObjectId,
  ) {
    return this.billetService.delete(id);
  }

  @Query(() => [BilletEntity], { name: 'findAllBillet' })
  async findAllBillet(@Args() fetchBilletInput: FetchBilletInput): Promise<BilletEntity[]> {
    return this.billetService.findAll(fetchBilletInput)
  }

  @Query(() => Number, { name: 'countBillet' })
  async getCountBillet(): Promise<number> {
    return this.billetService.getCount()
  }

}
