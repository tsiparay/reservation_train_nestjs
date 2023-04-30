import {Field, InputType} from '@nestjs/graphql'

@InputType()
export class UpdateBusavecsiegeInput {
  @Field()
  id: string;

  @Field()
  immatriculation: string;

  @Field()
  nombresiege_sanschauffeur: number;

  @Field()
  placeoccupe: number;
}
