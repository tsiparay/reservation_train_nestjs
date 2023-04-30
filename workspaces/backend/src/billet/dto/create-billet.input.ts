import {Field, Int, ArgsType, InputType} from '@nestjs/graphql'

@InputType()
export class CreateBilletInput {
  @Field()
  identificationbillet: string;

  @Field()
  isreserve: boolean;

  @Field()
  isconsome: boolean;
}
