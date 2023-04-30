import {Field, InputType} from '@nestjs/graphql'

@InputType()
export class CreateBusavecsiegeInput {
  @Field()
  immatriculation: string;

  @Field()
  nombresiege_sanschauffeur: number;

  @Field()
  placeoccupe: number;
}
