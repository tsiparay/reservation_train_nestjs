import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoggedUtilisateurOutput {
  @Field(() => String, { description: 'Generated access_token' })
  access_token: string;
}
