// app/api/s3-upload/route.js
import { NextResponse, NextRequest } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { fileName, fileType, folder = "avatars" } = await request.json();

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${folder}/${fileName}`,
      ContentType: fileType,
    };

    const uploadUrl = await getSignedUrl(s3, new PutObjectCommand(params), {
      expiresIn: 60,
    });

    const fileUrl = `${process.env.CLOUDFRONT_URL}/${folder}/${fileName}`;

    return NextResponse.json({ uploadUrl, fileUrl });
  } catch (err) {
    console.error("Error creating presigned URL:", err);
    return NextResponse.json(
      { error: "Failed to create upload URL", details: err },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
