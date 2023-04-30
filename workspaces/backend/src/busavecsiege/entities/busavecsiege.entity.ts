import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType()
export class BusavecsiegeEntity {
  @Field(() => ID)
  id: string;

  @Field()
  immatriculation: string;

  @Field()
  nombresiege_sanschauffeur: number;

  @Field()
  placeoccupe: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
