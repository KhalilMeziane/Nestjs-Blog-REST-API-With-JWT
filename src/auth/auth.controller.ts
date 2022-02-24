import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService){}

    @Post('login')
    login(@Body() body: any) : any{
        return this.authService.login(body.email)
    }

    @Post('signup')
    signup(@Body() body: any) : any{
        return this.authService.signup(body)
    }
}
