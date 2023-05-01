import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginUtilisateurInput {
  @Field(() => String, { description: 'email ' })
  email: string;
  @Field(() => String, { description: 'password ' })
  password: string;
}
