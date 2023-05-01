import { Model } from 'mongoose'
import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { UtilisateurDocument, UtilisateurModel } from '../mongoose/schema'
import { FetchUtilisateurInput } from './dto/fetch-utilisateur.input'
import { CreateUtilisateurInput } from './dto/create-utilisateur.input'
import { UtilisateurEntity } from './entities/utilisateur.entity'
import {UpdateUtilisateurInput} from "./dto/update-utilisateur.input";
import {Schema as MongooseSchema} from 'mongoose';
import * as bcrypt from 'bcrypt';
import {LoginUtilisateurInput} from "./dto/login-utilisateur.input";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class UtilisateurService {

  constructor(@InjectModel(UtilisateurModel.name) private readonly utilisateurModel: Model< UtilisateurDocument >, private  readonly authenticationService: AuthenticationService) {}

    async loginUtilisateur(loginUserInput: LoginUtilisateurInput) {
        const utilisateur = await this.authenticationService.validateUtilisateur(
            loginUserInput.email,
            loginUserInput.password,
        );
        if (!utilisateur) {
            throw new BadRequestException(`Email or password are invalid`);
        } else {
            return this.authenticationService.generateCredentials(utilisateur);
        }
    }

  async create(createUtilisateurInput: CreateUtilisateurInput): Promise < UtilisateurDocument > {
      const saltOrRounds = 10;
      const password = createUtilisateurInput.password;
      createUtilisateurInput.password = await bcrypt.hash(password, saltOrRounds);
    const utilisateur = new this.utilisateurModel(createUtilisateurInput);
    return utilisateur.save();
  }

 async update(updateUtilisateurInput: UpdateUtilisateurInput) {
    return await this.utilisateurModel
        .findByIdAndUpdate(updateUtilisateurInput.id, updateUtilisateurInput, {new: true})
        .exec();
  }


  async delete(id: MongooseSchema.Types.ObjectId) {
    return this.utilisateurModel.findByIdAndDelete(id).exec();
  }

  async getCount(): Promise<number> {
    const count = await this.utilisateurModel.countDocuments();
    return count
  }

  async findAll(args: FetchUtilisateurInput = { skip: 0, take: 5 }): Promise<UtilisateurEntity[]> {
    const utilisateurs: UtilisateurEntity[] = (await this.utilisateurModel.find(null, null, {
      limit: args.take,
      skip: args.skip,
    })) as UtilisateurEntity[];
    return utilisateurs
  }


    async findOneByEmail(email: string) {
        const utilisateur = await this.utilisateurModel.findOne({ email: email }).exec();
        if (!utilisateur) {
            throw new NotFoundException(`Utilisateur of ${email} not found`);
        }
        return utilisateur;
    }



}

