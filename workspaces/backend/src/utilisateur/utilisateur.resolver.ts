import {Resolver, Query, Args, Mutation} from '@nestjs/graphql'
import { UtilisateurEntity } from './entities/utilisateur.entity'
import { UtilisateurService } from './utilisateur.service'
import { FetchUtilisateurInput } from './dto/fetch-utilisateur.input'
import { CreateUtilisateurInput } from './dto/create-utilisateur.input'
import { UpdateUtilisateurInput } from './dto/update-utilisateur.input'
import { AuthenticationService } from './authentication.service'
import {Schema as MongooseSchema} from 'mongoose';
import {LoginUtilisateurInput} from "./dto/login-utilisateur.input";
import {BadRequestException, UseGuards} from "@nestjs/common";
import {LoggedUtilisateurOutput} from "./dto/logged-utilisateur.output";
import {JwtAuthGuard} from "./jwt-auth.guard";

@Resolver(() => UtilisateurEntity)
export class UtilisateurResolver {
  constructor(private readonly utilisateurService: UtilisateurService,
              ) {}


  @Mutation(() => LoggedUtilisateurOutput)
  loginUtilisateur(@Args('loginUtilisateurInput') loginUtilisateurInput: LoginUtilisateurInput) {
    return this.utilisateurService.loginUtilisateur(loginUtilisateurInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => UtilisateurEntity)
  async createUtilisateur(@Args('createUtilisateurInput') createUtilisateurInput: CreateUtilisateurInput) {
    return await this.utilisateurService.create(createUtilisateurInput);
  }


  @UseGuards(JwtAuthGuard)
  @Mutation(() => UtilisateurEntity)
  async updateUtilisateur(@Args('updateUtilisateurInput') updateUtilisateurInput: UpdateUtilisateurInput) {
    return await this.utilisateurService.update(updateUtilisateurInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => UtilisateurEntity)
  async deleteUtilisateur(
      @Args('id', {type: () => String}) id: MongooseSchema.Types.ObjectId,
  ) {
    return this.utilisateurService.delete(id);
  }


  @Query(() => [UtilisateurEntity], { name: 'findAllUtilisateur' })
  async findAllUtilisateur(@Args() fetchUtilisateurInput: FetchUtilisateurInput): Promise<UtilisateurEntity[]> {
    return this.utilisateurService.findAll(fetchUtilisateurInput)
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Number, { name: 'countUtilisateur' })
  async getCountUtilisateur(): Promise<number> {
    return this.utilisateurService.getCount()
  }

}
