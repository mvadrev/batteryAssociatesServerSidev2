import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { stringify } from 'querystring';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RolesEnum } from 'src/auth/models/role.enum';
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

    @Roles(RolesEnum.ADMIN, RolesEnum.PREMIUM)
    @UseGuards(JwtGuard, RolesGuard)
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
