import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType()
export class UtilisateurEntity {
  @Field(() => ID)
  id: string;

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

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
