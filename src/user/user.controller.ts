import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/get-user.decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {

    @Get()
    getProfile(@GetUser() user: User){
        return user
    }
}
