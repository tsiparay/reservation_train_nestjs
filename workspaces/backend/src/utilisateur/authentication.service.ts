import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UtilisateurService } from './utilisateur.service';
import { UtilisateurEntity } from './entities/utilisateur.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
    constructor(
        @Inject(forwardRef(() => UtilisateurService))
        private utilisateurService: UtilisateurService,
        private jwtTokenService: JwtService,
    ) {}
    async validateUtilisateur(email: string, password: string): Promise<any>   {
        const utilisateur = await this.utilisateurService.findOneByEmail(email);
        if (utilisateur) {
            if (await bcrypt.compare(password, utilisateur.password)) {
                delete utilisateur.password;
                return utilisateur;
            }
        }
        return null;
    }

    async generateCredentials(utilisateur: UtilisateurEntity) {
        const payload = {
            email: utilisateur.email,
            nom: utilisateur.nom,
            prenom: utilisateur.prenom,
            addresse: utilisateur.addresse,
            status: utilisateur.status,
            id: utilisateur.id
        };
        console.log('payload', payload);
        // console.log('payload1', await this.jwtTokenService.sign(payload));
        return {
            access_token: this.jwtTokenService.sign(payload, { secret: `${process.env.JWT_SECRET}`, expiresIn: '300s' }, ),
        };
    }
}
