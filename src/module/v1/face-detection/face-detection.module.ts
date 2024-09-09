import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { User, UserSchema } from '../user/schemas/user.schema';
import { FaceDetectionService } from './face-detection.service';
import { FaceDetectionController } from './face-detection.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    HttpModule,
  ],
  controllers: [FaceDetectionController],
  providers: [FaceDetectionService],
})
export class FaceDetectionModule {}
