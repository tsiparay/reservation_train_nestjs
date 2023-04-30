import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { BusavecsiegeDocument, BusavecsiegeModel } from '../mongoose/schema'
import { FetchBusavecsiegeInput } from './dto/fetch-busavecsiege.input'
import { CreateBusavecsiegeInput } from './dto/create-busavecsiege.input'
import { BusavecsiegeEntity } from './entities/busavecsiege.entity'
import {UpdateBusavecsiegeInput} from "./dto/update-busavecsiege.input";
import {Schema as MongooseSchema} from 'mongoose';

@Injectable()
export class BusavecsiegeService {

  constructor(@InjectModel(BusavecsiegeModel.name) private readonly busavecsiegeModel: Model< BusavecsiegeDocument > ) {}


  async create(createBusavecsiegeInput: CreateBusavecsiegeInput): Promise < BusavecsiegeDocument > {
    const busavecsiege = new this.busavecsiegeModel(createBusavecsiegeInput);
    return busavecsiege.save();
  }

 async update(updateBusavecsiegeInput: UpdateBusavecsiegeInput) {
    return await this.busavecsiegeModel
        .findByIdAndUpdate(updateBusavecsiegeInput.id, updateBusavecsiegeInput, {new: true})
        .exec();
  }


  async delete(id: MongooseSchema.Types.ObjectId) {
    return this.busavecsiegeModel.findByIdAndDelete(id).exec();
  }

  async getCount(): Promise<number> {
    const count = await this.busavecsiegeModel.countDocuments();
    return count
  }

  async findAll(args: FetchBusavecsiegeInput = { skip: 0, take: 5 }): Promise<BusavecsiegeEntity[]> {
    const busavecsieges: BusavecsiegeEntity[] = (await this.busavecsiegeModel.find(null, null, {
      limit: args.take,
      skip: args.skip,
    })) as BusavecsiegeEntity[];
    return busavecsieges
  }


}

