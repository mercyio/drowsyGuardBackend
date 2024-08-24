import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { BaseHelper } from './helper.util';
import { ENVIRONMENT } from '../configs/environment';

if (!ENVIRONMENT.AWS.ACCESS_KEY || !ENVIRONMENT.AWS.BUCKET_NAME || !ENVIRONMENT.AWS.REGION || !ENVIRONMENT.AWS.SECRET) {
  throw new Error('Aws S3 environment variables are not set');
}

// S3 client configuration
export const s3Client = new S3Client({
  region: ENVIRONMENT.AWS.REGION,
  credentials: {
    accessKeyId: ENVIRONMENT.AWS.ACCESS_KEY,
    secretAccessKey: ENVIRONMENT.AWS.SECRET,
  },
});

export const uploadSingleFile = async (file: Express.Multer.File, folder?: string): Promise<{ url: string }> => {
  const { buffer, mimetype } = file;

  const fileName = BaseHelper.generateFileName(folder, mimetype);

  const uploadParams = {
    Bucket: ENVIRONMENT.AWS.BUCKET_NAME,
    Key: fileName,
    Body: buffer,
    ContentType: mimetype,
  };

  try {
    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);

    const fileUrl = `${ENVIRONMENT.AWS.BUCKET_URL}/${fileName}`;

    return {
      url: fileUrl,
    };
  } catch (error) {
    console.log('uploadSingleFile error', error);
    return {
      url: '',
    };
  }
};
