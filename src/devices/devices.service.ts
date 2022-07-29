import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { devicesDocument } from './devices.schema';

@Injectable()
export class DevicesService {
    constructor(@InjectModel('Devices') private readonly DevicesModel:Model<devicesDocument>) {
        
    }

    async create(name: string, serial: number, description: string): Promise<devicesDocument> {
        const newDevice = new this.DevicesModel({name,serial,description});
        return newDevice.save();
    }

    async findAllDevices(): Promise<devicesDocument[]> {
        return this.DevicesModel.find().exec();
    }

    async findOneDevice(id: string): Promise<devicesDocument> {
        return this.DevicesModel.findById(id).exec();
    }

    async updateDevice(id: string, newName: string, newSerial: number, newDescription: string): Promise<devicesDocument> {
        let existingDevice = await this.DevicesModel.findById(id);
        existingDevice.name = newName ?? existingDevice.name;
        existingDevice.serial = newSerial ?? existingDevice.serial;
        existingDevice.description = newDescription ?? existingDevice.description;
        return existingDevice.save();
    }

    async deleteDevice(id: string) {
        let existingDevice = await this.DevicesModel.findById(id);
        if(existingDevice) {
            return this.DevicesModel.deleteOne({_id: id}).exec();
        }
    }
}
