// The frontend sends the frame data to your backend.
// Your FaceDetectionService receives this frame data.
// The service decodes the frame data.
// It then integrates with the ML service by sending the frame data to the ML API.
// The ML service processes the frame and returns the face detection results.
// Your FaceDetectionService receives these results.
// The service saves the results in the database.
// Finally, it returns the face detection results back to the frontend.

// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { User, UserDocument } from '../user/schemas/user.schema';
// import { HttpService } from '@nestjs/axios';

// @Injectable()
// export class FaceDetectionService {
//   constructor(
//     @InjectModel(User.name) private userModel: Model<UserDocument>,
//     private httpService: HttpService,
//   ) {}

//   async processFaceDetection(
//     userId: string,
//     base64Image: string,
//   ): Promise<any> {
//     const faceDetectionResult = await this.detectFaces(base64Image);

//     // const processedResult =
//     //   this.processFaceDetectionResult(faceDetectionResult);

//     await this.saveFaceDetectionResult(userId, faceDetectionResult);

//     return faceDetectionResult;
//   }

//   async detectFaces(base64Image: string): Promise<any> {
//     try {
//       const response = await this.httpService.post(
//         'https://new-1092691522090.africa-south1.run.app/process-frame/',
//         { image: base64Image },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'X-API-KEY': process.env.FACE_API_KEY,
//           },
//         },
//       );
//       //   .toPromise();

//       return response;
//     } catch (error) {
//       console.error('Face detection API error:', error);
//       throw new Error('Face detection failed');
//     }
//   }

//   private async saveFaceDetectionResult(userId: string, result: any) {
//     await this.userModel.updateOne(
//       { _id: userId },
//       {
//         $set: { lastFaceDetectionResult: result },
//         $inc: { faceDetectionCount: 1 },
//       },
//     );
//   }
// }
// import { Injectable } from '@nestjs/common';
// import axios from 'axios';
// import * as fs from 'fs';
// import * as path from 'path';
// import * as cv from 'opencv4nodejs'; // OpenCV library for Node.js

// import { Injectable } from '@nestjs/common';
// import axios from 'axios';
// import * as fs from 'fs';
// import * as path from 'path';
// import * as FormData from 'form-data';
// import * as sharp from 'sharp'; // Use sharp instead of opencv4nodejs

// @Injectable()
// export class FaceDetectionService {
//   private readonly url =
//     'https://new-1092691522090.africa-south1.run.app/process-frame/';

//   async processFrame(): Promise<void> {
//     const videoId = 'frame_1';
//     const framePath = path.resolve(__dirname, 'image.jpg');

//     try {
//       // Read the image file
//       const frameBuffer = fs.readFileSync(framePath);

//       // Prepare form-data for the POST request
//       const formData = new FormData();
//       formData.append('video_id', videoId);
//       formData.append('frame', frameBuffer, {
//         filename: 'image.jpg',
//         contentType: 'image/jpeg',
//       });

//       // Make the HTTP request
//       const response = await axios.post(this.url, formData, {
//         headers: formData.getHeaders(),
//       });

//       const responseJson = response.data;
//       console.log('Video ID:', responseJson.video_id);
//       console.log('Detections:', responseJson.detections);

//       // Decode the base64 encoded image frame
//       const frameBase64 = responseJson.frame;
//       if (frameBase64) {
//         const decodedImage = Buffer.from(frameBase64, 'base64');
//         const image = sharp(decodedImage); // Decode the image with sharp

//         // Example: Resize the image
//         const resizedImage = await image.resize(800).toBuffer();

//         // Save or process the resized image
//         fs.writeFileSync('resized_image.jpg', resizedImage);
//         console.log('Image resized and saved as resized_image.jpg');
//       } else {
//         console.log('No frame data found in the response.');
//       }
//     } catch (error) {
//       console.error('Error processing frame:', error.message);
//     }
//   }
// }

// import { Injectable } from '@nestjs/common';
// import axios from 'axios';
// import * as FormData from 'form-data';
// import * as sharp from 'sharp';
// import { Readable } from 'stream';
// import * as fs from 'fs';

// @Injectable()
// export class FaceDetectionService {
//   private readonly url =
//     'https://new-1092691522090.africa-south1.run.app/process-frame/';

//   async processFrame(videoId: string, imageBuffer: Buffer): Promise<void> {
//     // try {
//     // Prepare form-data for the POST request
//     const formData = new FormData();
//     // formData.append('video_id', videoId);
//     formData.append('frame', imageBuffer, {
//       filename: 'image.jpeg',
//       contentType: 'image/jpeg',
//     });

//     console.log('FormData fields:', formData.getHeaders());
//     // console.log('FormData value length:', formData._valueLength);

//     // console.log('formData', formData);

//     // Make the HTTP request
//     // Make the HTTP request
//     const response = await axios.post(this.url, formData, {
//       headers: {
//         ...formData.getHeaders(),
//       },
//     });
//     console.log('response', response.data);

//     const responseJson = response.data;
//     // console.log('Video ID:', responseJson.video_id);
//     console.log('Detections:', responseJson.detections);

//     // Decode the base64 encoded image frame FileInterceptor
//     const frameBase64 = responseJson.frame;
//     if (frameBase64) {
//       const decodedImage = Buffer.from(frameBase64, 'base64');
//       const image = sharp(decodedImage); // Decode the image with sharp

//       // Example: Resize the image
//       const resizedImage = await image.resize(800).toBuffer();

//       // Save or process the resized image
//       fs.writeFileSync('resized_image.jpg', resizedImage);
//       console.log('Image resized and saved as resized_image.jpg');
//     } else {
//       console.log('No frame data found in the response.');
//     }
//     // } catch (error) {
//     //   console.error('Error processing frame:', error.message);
//     // }
//   }
// }

// import { Injectable } from '@nestjs/common';
// import axios from 'axios';
// import * as FormData from 'form-data';
// import * as sharp from 'sharp';
// import * as fs from 'fs';
// import { log } from 'util';
// import { HttpService } from '@nestjs/axios';

// @Injectable()
// export class FaceDetectionService {
//   constructor(
//     private readonly httpService: HttpService,
//     private readonly url = 'https://new-1092691522090.africa-south1.run.app/process-frame/',
//   ) {}

//   async processFrame(videoId: string, imageBuffer: Buffer): Promise<void> {
//     try {
//       // Step 1: Convert image to base64 format
//       const base64Image = imageBuffer.toString('base64');
//       // console.log('base64Image:', base64Image);

//       // Step 2: Prepare form-data with base64 encoded image
//       const formData = new FormData();
//       formData.append('video_id', videoId);
//       formData.append('frame', base64Image, {
//         filename: 'Image.jpeg',
//         contentType: 'multipart/form-data', // Corrected field name
//       });
//       // console.log('formData:', formData);

//       // Step 3: Send the request to the ML API with base64 image
//       const response = await this.httpService.post(
//         'https://new-1092691522090.africa-south1.run.app/process-frame/',
//         { frame: base64Image },
//         {
//           // params: { video_id: videoId },
//           headers: {
//             ...formData.getHeaders(),
//             filename: 'Image.jpeg',
//             contentType: 'multipart/form-data',
//           },
//         },
//       );
//       console.log('response', response.data);

//       const responseJson = response.data;
//       console.log('Detections:', responseJson.detections);

//       // If the API returns a base64 image in the response, process it
//       const frameBase64 = responseJson.frame;
//       if (frameBase64) {
//         const decodedImage = Buffer.from(frameBase64, 'base64');
//         const image = sharp(decodedImage); // Decode the image with sharp

//         // Example: Resize the image
//         const resizedImage = await image.resize(800).toBuffer();

//         // Save or process the resized image
//         fs.writeFileSync('resized_image.jpg', resizedImage);
//         console.log('Image resized and saved as resized_image.jpg');
//       } else {
//         console.log('No frame data found in the response.');
//       }
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         console.error(
//           'Axios error occurred:',
//           JSON.stringify(error.response?.data, null, 2),
//         );
//       } else {
//         console.error('An unexpected error occurred:', error);
//       }
//       console.error('Error processing frame:', error.message);
//     }
//   }
// }

import axios from 'axios';
import * as fs from 'fs';
import * as sharp from 'sharp';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
// import FormData from 'form-data';
import * as FormData from 'form-data';

@Injectable()
export class FaceDetectionService {
  constructor(private readonly httpService: HttpService) {}

  //   async processFrame(videoId: string, imageBuffer: Buffer): Promise<void> {
  //     try {
  //       // Prepare form-data with the image buffer
  //       const formData = new FormData();
  //       formData.append('frame', imageBuffer, {
  //         filename: 'Image.jpeg',
  //         contentType: 'multipart/form-data',
  //       });

  //       // Send the request to the API with video_id as a query parameter
  //       const response = await this.httpService
  //         .post(
  //           `https://new-1092691522090.africa-south1.run.app/process-frame/?video_id=${videoId}`, // video_id passed as query param
  //           formData,
  //           // params: { video_id: videoId },
  //           {
  //             headers: formData.getHeaders(),
  //           },
  //         )
  //         .toPromise(); // Convert Observable to Promise for async/await handling

  //       console.log('Response:', response.data);

  //       const responseJson = response.data;
  //       console.log('Detections:', responseJson.detections);

  //       // Process base64 image from response
  //       const frameBase64 = responseJson.frame;
  //       if (frameBase64) {
  //         const decodedImage = Buffer.from(frameBase64, 'base64');
  //         const image = sharp(decodedImage);

  //         // Resize image as an example
  //         const resizedImage = await image.resize(800).toBuffer();

  //         // Save the resized image
  //         fs.writeFileSync('resized_image.jpg', resizedImage);
  //         console.log('Image resized and saved as resized_image.jpg');

  //         return {
  //           videoId: responseJson.video_id,
  //           detections: responseJson.detections,
  //           resizedFrame: imageBuffer, // Return base64-encoded resized image
  //         };
  //       } else {
  //         console.log('No frame data found in the response.');
  //       }
  //     } catch (error) {
  //       if (axios.isAxiosError(error)) {
  //         console.error(
  //           'Axios error occurred:',
  //           JSON.stringify(error.response?.data, null, 2),
  //         );
  //       } else {
  //         console.error('An unexpected error occurred:', error);
  //       }
  //       console.error('Error processing frame:', error.message);
  //     }
  //   }
  // }

  async processFrame(videoId: string, imageBuffer: Buffer): Promise<any> {
    try {
      // Prepare form-data with the image buffer
      const formData = new FormData();
      formData.append('frame', imageBuffer, {
        filename: 'Image.jpeg',
        contentType: 'multipart/form-data',
      });

      // Send the request to the API with video_id as a query parameter
      const response = await this.httpService
        .post(
          `https://new-1092691522090.africa-south1.run.app/process-frame/?video_id=${videoId}`,
          formData,
          {
            headers: formData.getHeaders(),
          },
        )
        .toPromise(); // Convert Observable to Promise for async/await handling

      const responseJson = response.data;
      console.log('Detections:', responseJson.detections);

      // Convert the image buffer to base64 string
      const imageBase64 = imageBuffer.toString('base64');
      const imageBase64Data = `data:image/jpeg;base64,${imageBase64}`;

      // Return the base64 image and detection info
      return {
        videoId: responseJson.video_id,
        detections: responseJson.detections,
        image: imageBase64Data, // Return the image as base64 string
      };
    } catch (error) {
      console.error('Error processing frame:', error.message);
      throw error;
    }
  }
}
