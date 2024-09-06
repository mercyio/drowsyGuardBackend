import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { User, UserSchema } from '../user/schemas/user.schema';
import { FaceDetectionService } from './live-stream.service';
import { FaceDetectionController } from './live-stream.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    HttpModule,
  ],
  controllers: [FaceDetectionController],
  providers: [FaceDetectionService],
})
export class FaceDetectionModule {}
