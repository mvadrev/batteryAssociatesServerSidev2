import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Document} from 'mongoose';


export type devicesDocument = Devices & Document;


@Schema()
export class Devices {
    @Prop({required: true})
    name: string;
    @Prop({required: true})
    serial: number;
    @Prop()
    description: string;
}
 
export const DevicesSchema = SchemaFactory.createForClass(Devices);