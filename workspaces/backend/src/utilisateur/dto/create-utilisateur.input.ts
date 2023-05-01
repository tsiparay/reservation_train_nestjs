import {Field, InputType} from '@nestjs/graphql'

@InputType()
export class CreateUtilisateurInput {
  @Field()
  nom: string;

  @Field()
  prenom: string;

  @Field()
  email: string;

  @Field()
  addresse: string;

  @Field()
  status: boolean;

  @Field()
  password: string;
}
