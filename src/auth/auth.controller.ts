import { Body, Controller, Get, Post } from '@nestjs/common';
import { NewUserDTO } from 'src/user/dtos/new-user.dto';
import { UserDetails } from 'src/user/user-details.interface';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {

    }

    @Post('register')
    registerUser(@Body() user: NewUserDTO): Promise<UserDetails| null> {
        // console.log("mmmm", user)
        return this.authService.registerUser(user);
    }

    @Get('register')
    getUSers() {
        return "hello";
    }
}
