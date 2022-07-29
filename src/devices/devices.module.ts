import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DevicesController } from './devices.controller';
import { DevicesSchema } from './devices.schema';
import { DevicesService } from './devices.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Devices', schema: DevicesSchema}])],
  controllers: [DevicesController],
  providers: [DevicesService]
})
export class DevicesModule {}
