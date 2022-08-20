import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DevicesModule } from './devices/devices.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://mukund:iw7EEHqwJipf0evW@cyclerbackend.wddemly.mongodb.net'), DevicesModule, UserModule, AuthModule, ConfigModule.forRoot({isGlobal: true})],
  controllers: [AppController],
  providers: [AppService, ],
})
export class AppModule {}
// mongodb+srv://mvadrev:<password>@cluster0.ooqsc.mongodb.net/?retryWrites=true&w=majority
// 'mongodb://localhost:27017/Mukund'
