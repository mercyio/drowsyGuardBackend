import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FaceDetectionService } from './face-detection.service';

@Controller('face-detection')
export class FaceDetectionController {
  constructor(private readonly faceDetectionService: FaceDetectionService) {}

  @Post('process')
  @UseInterceptors(FileInterceptor('frame'))
  async processFrame(
    @Query('video_id') videoId: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    if (!file) {
      throw new BadRequestException('Missing frame file.');
    }

    const frameBuffer = file.buffer;
    console.log('frameBuffer:', frameBuffer);

    return this.faceDetectionService.processFrame(videoId, frameBuffer);
  }
}
