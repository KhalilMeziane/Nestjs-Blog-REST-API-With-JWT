import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import * as argon from 'argon2'
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {

    constructor(private prisma : PrismaService, private config : ConfigService, private jwt: JwtService){}

    async login(body){

        const user = await this.prisma.user.findUnique({
            where:{
                email: body.email
            },
            select:{
                email: true,
                username: true,
                id: true,
                password: true
            }
        })

        if(!user) throw new ForbiddenException('credentials not correct')

        const match = await argon.verify(user.password, body.password)
        if(!match) throw new ForbiddenException('credentials not correct')

        return {user, accessToken: await this.signToken(user.id, user.email, user.username)}

    }

    async signup(body: any){

        const user = await this.prisma.user.findUnique({
            where:{
                email: body.email
            }
        })

        if(user){
            throw new ForbiddenException('credentials taken')
        }

        const hashPassword = await argon.hash(body.password)
        const newUser = await this.prisma.user.create({
            data:{
                ...body,
                password: hashPassword
            },
            select:{
                email: true,
                username: true,
                id: true,
            }
        })

        return {newUser,accessToken: await this.signToken(newUser.id, newUser.email, newUser.username)}

    }

    async signToken(userId: number, email: string, username: string){

        const payload ={
            sub: userId,
            email,
            username
        }
        const secret = this.config.get('JWT_SECRET')
        const accessToken = await this.jwt.signAsync(payload,{
            expiresIn: '60m',
            secret: secret,
        })

        return accessToken
    }
}