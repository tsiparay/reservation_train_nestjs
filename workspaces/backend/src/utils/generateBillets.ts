import mongoose from 'mongoose'
import { array, creditCardNumber, date } from 'minifaker'
import 'minifaker/locales/en'
import 'dotenv/config'
import { BilletDocument, BilletSchema } from '../mongoose/schema'
import {Logger} from "@nestjs/common";

export default async function generateBillets(numberToGenerate = 10): Promise<void> {
  const Billets = array(numberToGenerate, () => ({
    identificationbillet: creditCardNumber().substring(0,7),
    isreserve: false,
    isconsome: false,
    createdAt: date()
  }));

  console.log('connecting to database ................');
  await mongoose.connect(process.env.MONGODB_URI);
  console.log(`connected*****************************`);

  const model = mongoose.model<BilletDocument>('billetmodels', BilletSchema);
  await model.create(...Billets);
  Logger.log(numberToGenerate + ' billets generated with success.');

  process.exit(0)
}

generateBillets().catch(()=>null);
