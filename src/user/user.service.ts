import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

    constructor(private prisma : PrismaService){}
    

    async editProfile(id,body){
        const user = await this.prisma.user.findUnique({
            where:{
                id
            }
        })
        if(!user) throw new ForbiddenException('credentials not correct')
        const updatedUser = await this.prisma.user.update({
            where:{
                id
            },
            data:{
                ...body
            }
        })
        return updatedUser
    }
}
