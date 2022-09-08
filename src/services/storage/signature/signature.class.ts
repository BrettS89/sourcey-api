import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { v4 as uuid } from 'uuid';
import { Application } from '../../../declarations';

export class Signature {
  app: Application;
  s3: S3Client;

  constructor (app: Application) {
    this.app = app;

    const aws = this.app.get('aws');

    this.s3 = new S3Client({
      region: aws.region,
      credentials: {
        accessKeyId: aws.s3AccessKeyId,
        secretAccessKey: aws.s3SecretAccessKey,
      },
    })
  }

  async create(data: { contentType: string }) {
    const aws = this.app.get('aws');

    const id = uuid();
    const extension = data.contentType.split('/')[1];
    const filepath = `article/${id}.${extension}`;

    const command = new PutObjectCommand({
      Bucket: aws.bucket,
      Key: filepath,
      ContentType: data.contentType
    });
  
    const signedUrl = await getSignedUrl(this.s3, command, { expiresIn: 60 * 5 });

    return {
      meta: {
        id,
        extension,
        type: data.contentType,
        filepath,
      },
      urls: {
        delivery: `${aws.cloudfrontKey}/${filepath}`,
        storage: `${aws.bucketKey}/${filepath}`,
        upload: signedUrl,
      },
    };
  }

}
