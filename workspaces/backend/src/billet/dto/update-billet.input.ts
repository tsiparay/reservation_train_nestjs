import {Field, Int, ArgsType, InputType} from '@nestjs/graphql'

@InputType()
export class UpdateBilletInput {
  @Field()
  id: string;

  @Field()
  identificationbillet: string;

  @Field()
  isreserve: boolean;

  @Field()
  isconsome: boolean;
}
