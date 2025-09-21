import AWS from 'aws-sdk'
import sharp from 'sharp'

export class IDriveE2Uploader {
  private s3: AWS.S3

  constructor() {
    this.s3 = new AWS.S3({
      endpoint: process.env.IDRIVE_E2_ENDPOINT,
      accessKeyId: process.env.IDRIVE_E2_ACCESS_KEY,
      secretAccessKey: process.env.IDRIVE_E2_SECRET_KEY,
      s3ForcePathStyle: true,
      signatureVersion: 'v4'
    })
  }

  private async compressImage(buffer: Buffer, quality: number = 80): Promise<Buffer> {
    return await sharp(buffer)
      .resize(720, 720, {
        fit: 'inside',
        withoutEnlargement: true 
      })
      .jpeg({ quality })
      .toBuffer()
  }

  async uploadCategoryImage(file: Buffer, fileName: string, categoryName: string): Promise<string> {
    const compressedImage = await this.compressImage(file)
    const key = `images/categories/${categoryName}/${fileName.replace(/\.[^/.]+$/, '.jpg')}`
    
    const params = {
      Bucket: process.env.IDRIVE_E2_BUCKET_NAME!,
      Key: key,
      Body: compressedImage,
      ContentType: 'image/jpeg'
    }

    await this.s3.upload(params).promise()
    return key
  }

  async uploadMenuItemImage(file: Buffer, fileName: string, categoryName: string): Promise<string> {
    const compressedImage = await this.compressImage(file)
    const key = `images/menu-items/${categoryName}/${fileName.replace(/\.[^/.]+$/, '.jpg')}`
    
    const params = {
      Bucket: process.env.IDRIVE_E2_BUCKET_NAME!,
      Key: key,
      Body: compressedImage,
      ContentType: 'image/jpeg'
    }

    await this.s3.upload(params).promise()
    return key
  }

  async deleteImage(imageUrl: string): Promise<void> {
    const key = imageUrl.split('/').slice(-3).join('/')
    
    const params = {
      Bucket: process.env.IDRIVE_E2_BUCKET_NAME!,
      Key: key
    }

    await this.s3.deleteObject(params).promise()
  }

  getSignedUrl(key: string, expires: number = 3600): string {
    return this.s3.getSignedUrl('getObject', {
      Bucket: process.env.IDRIVE_E2_BUCKET_NAME!,
      Key: key,
      Expires: expires
    })
  }
}