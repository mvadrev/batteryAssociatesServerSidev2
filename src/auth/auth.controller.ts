import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { existingUserDTO } from 'src/user/dtos/existing-user.dto';
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

    @Post('login')
    @HttpCode(HttpStatus.OK)
    loginUser(@Body() user: existingUserDTO): Promise<{token: string}| null> {
        return this.authService.login(user);
    }

    @Get('register')
    getUSers() {
        return "hello";
    }
}
