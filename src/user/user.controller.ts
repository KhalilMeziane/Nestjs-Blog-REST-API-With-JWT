import { Controller, Get, UseGuards, Patch, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { UserService } from './user.service';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {

    constructor(private userService: UserService){}

    @Get()
    getProfile(@GetUser() user: User){
        return user
    }

    @Patch()
    editProfile(@GetUser() user: User, @Body() body){
        return this.userService.editProfile(user.id,body)
    }
}
