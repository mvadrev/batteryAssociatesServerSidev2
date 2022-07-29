import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { NewUserDTO } from 'src/user/dtos/new-user.dto';
import { UserDetails } from 'src/user/user-details.interface';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {

    }

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 12);
    }

    async registerUser(user: Readonly<NewUserDTO>): Promise<UserDetails | any> {
        // const userDetails = this.userService._getUserDetails(user);
        const {first_name, last_name, email, password} = user;
        const existingUSer  =  await this.userService.findByEmail(email);
        if(existingUSer) return 'Email taken';
        // Register user 
        const hashedPassword = await this.hashPassword(password);
        const newUser = await this.userService.createUser(first_name, last_name, email, hashedPassword);
        console.log("hello", first_name, last_name, email, password)
        return this.userService._getUserDetails(newUser);
    }
}
