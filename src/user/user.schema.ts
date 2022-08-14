import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { RolesEnum } from "src/auth/models/role.enum";


export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({required: true})
    firstName: string;
    @Prop({required: true})
    lastName: string;
    @Prop({required: true, unique: true})
    email: string;
    @Prop({required: true})
    password: string;
    @Prop({default: 'user'})
    roles: string[];
    // @Prop()
    // devices: string[];
    // @Prop()
    // experiments: string[];

}

export const UserSchema = SchemaFactory.createForClass(User);