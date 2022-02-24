import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';

@Injectable()
export class AuthService {

    constructor(private prisma : PrismaService){}

    async login(userEmail: string){

        const user = await this.prisma.user.findUnique({
            where:{
                email: userEmail
            }
        })

        if(!user) throw new ForbiddenException('credentials not correct')
        // check if passwords equal then send access token

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
        // const hashPassword = 

    }
}
