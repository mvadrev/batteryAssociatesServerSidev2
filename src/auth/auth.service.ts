import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { NewUserDTO } from 'src/user/dtos/new-user.dto';
import { UserDetails } from 'src/user/user-details.interface';
import { existingUserDTO } from 'src/user/dtos/existing-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jtwService: JwtService) {

    }

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 12);
    }

    async registerUser(user: Readonly<NewUserDTO>): Promise<UserDetails | any> {
        // const userDetails = this.userService._getUserDetails(user);
        const {first_name, last_name, email, password} = user;
        const existingUSer  =  await this.userService.findByEmail(email);
        if(existingUSer) return 'Email already taken';
        // Register user 
        const hashedPassword = await this.hashPassword(password);
        const newUser = await this.userService.createUser(first_name, last_name, email, hashedPassword);
        console.log("hello", first_name, last_name, email, password)
        return this.userService._getUserDetails(newUser);
    }

    async doesPasswordMatchCheck(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }

    async validateUSer(email: string, password: string): Promise<UserDetails | null> {
        const user = await this.userService.findByEmail(email);
        const doesUSerExist = !!user; 
        if(!doesUSerExist) return null;
        const doesPasswordMatch = await this.doesPasswordMatchCheck(password, user.password);
        
        if(!doesPasswordMatch) return null;
        return this.userService._getUserDetails(user);
    }

    async login(existingUSer: existingUserDTO): Promise<{token: string} | null> {
        const {email, password} = existingUSer;
        const user = await this.validateUSer(email, password);
        if(!user) return null;
        console.log(user)
        const jwtToken = await this.jtwService.signAsync({user});
        return {token: jwtToken};

    }
}
