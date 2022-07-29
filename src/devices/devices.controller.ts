import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { stringify } from 'querystring';
import { devicesDocument } from './devices.schema';
import { DevicesService } from './devices.service';


@Controller('devices')
export class DevicesController {

    constructor(private DevService: DevicesService) {

    }

    @Post() 
    registerNewDevice(@Body('name') name: string, @Body('serial') serial: number, @Body('description') description?: string): Promise<devicesDocument> {
        return this.DevService.create(name, serial, description);
    }

    @Get()
    findAllProducts():Promise<devicesDocument[]> {
        return this.DevService.findAllDevices();
    }

    @Get(':id')
    findOneByID(@Param('id') id : string): Promise<devicesDocument> {
        return this.DevService.findOneDevice(id);
    }

    @Patch(':id')
    updateDeviceByID(@Param('id') id : string, @Body('name') name: string, @Body('serial') serial: number, @Body('description') description?: string): Promise<devicesDocument> {
        return this.DevService.updateDevice(id,name, serial, description);
    }

    @Delete(':id')
    deleteDeviceByID(@Param('id') id: string) {
        return this.DevService.deleteDevice(id);
    }
}
