import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { BilletDocument, BilletModel } from '../mongoose/schema'
import { FetchBilletInput } from './dto/fetch-billet.input'
import { CreateBilletInput } from './dto/create-billet.input'
import { BilletEntity } from './entities/billet.entity'
import {UpdateBilletInput} from "./dto/update-billet.input";
import {Schema as MongooseSchema} from 'mongoose';

@Injectable()
export class BilletService {

  constructor(@InjectModel(BilletModel.name) private readonly billetModel: Model< BilletDocument > ) {}


  async create(createBilletInput: CreateBilletInput): Promise < BilletDocument > {
    const billet = new this.billetModel(createBilletInput);
    return billet.save();
  }

 async update(updateBilletInput: UpdateBilletInput) {
    return await this.billetModel
        .findByIdAndUpdate(updateBilletInput.id, updateBilletInput, {new: true})
        .exec();
  }


  async delete(id: MongooseSchema.Types.ObjectId) {
    return this.billetModel.findByIdAndDelete(id).exec();
  }

  async getCount(): Promise<number> {
    const count = await this.billetModel.countDocuments();
    return count
  }

  async findAll(args: FetchBilletInput = { skip: 0, take: 5 }): Promise<BilletEntity[]> {
    const billets: BilletEntity[] = (await this.billetModel.find(null, null, {
      limit: args.take,
      skip: args.skip,
    })) as BilletEntity[];
    return billets
  }

  //
  // getById(_id: MongooseSchema.Types.ObjectId) {
  //   return this.billetModel.findById(_id).exec();
  // }
  //
  // list(filtersInput: FiltersInput) {
  //   return this.billetModel.find({...filtersInput}).exec();
  // }
  //



}

