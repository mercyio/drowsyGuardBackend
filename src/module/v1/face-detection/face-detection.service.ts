import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as FormData from 'form-data';

@Injectable()
export class FaceDetectionService {
  private apiUrl = process.env.FACE_DETECTION_URL;

  constructor(private readonly httpService: HttpService) {}

  async processFrame(videoId: string, imageBuffer: Buffer) {
    try {
      // Prepare form-data with the image buffer
      const formData = new FormData();
      formData.append('frame', imageBuffer, {
        filename: 'Image.jpeg',
        contentType: 'multipart/form-data',
      });

      // Send the request to the API with video_id as a query parameter
      const response = await this.httpService
        .post(`${this.apiUrl}/?video_id=${videoId}`, formData, {
          headers: formData.getHeaders(),
        })
        .toPromise(); // Convert Observable to Promise for async/await handling

      const responseJson = response.data;
      console.log('Detections:', responseJson.detections);

      return {
        videoId: responseJson.video_id,
        detections: responseJson.detections,
        frame: responseJson.frame,
      };
    } catch (error) {
      console.error('Error processing frame:', error.message);
      throw error;
    }
  }
}
