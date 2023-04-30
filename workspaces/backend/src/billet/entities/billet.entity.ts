import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType()
export class BilletEntity {
  @Field(() => ID)
  id: string;

  @Field()
  identificationbillet: string;

  @Field()
  isreserve: boolean;

  @Field()
  isconsome: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
