import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import {ObjectType} from "@nestjs/graphql";


export type BusavecsiegeDocument = BusavecsiegeModel & Document
@Schema({timestamps: true})
export class BusavecsiegeModel {
  @Prop()
  immatriculation: string;

  @Prop()
  nombresiege_sanschauffeur: number;

  @Prop()
  placeoccupe: number;
}
export const BusavecsiegeSchema = SchemaFactory.createForClass(BusavecsiegeModel);

//******************************************************************

export type BilletDocument = BilletModel & Document
@Schema({timestamps: true})
@ObjectType()
export class BilletModel {
  @Prop()
  identificationbillet: string;

  @Prop()
  isreserve: boolean;

  @Prop()
  isconsome: boolean;
}
export const BilletSchema = SchemaFactory.createForClass(BilletModel);

//******************************************************************

export type UtilisateurDocument = UtilisateurModel & Document
@Schema({timestamps: true})
export class UtilisateurModel {
  @Prop()
  nom: string;

  @Prop()
  prenom: string;

  @Prop()
  email: string;

  @Prop()
  addresse: string;

  @Prop()
  status: boolean;

  @Prop()
  password: string;
}
export const UtilisateurSchema = SchemaFactory.createForClass(UtilisateurModel);
