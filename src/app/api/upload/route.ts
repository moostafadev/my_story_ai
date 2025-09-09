import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryUploadResponse } from "@/components/custom/cloudinary-input/types";

// Define your API response type
export interface ApiUploadResponse {
  success: boolean;
  url: string;
  public_id: string;
  error?: string;
  details?: string;
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiUploadResponse>> {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          error: "No valid file provided",
          url: "",
          public_id: "",
        },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Determine resource type based on file type
    const resourceType = file.type === "application/pdf" ? "raw" : "image";

    // Upload to Cloudinary
    const result = await new Promise<CloudinaryUploadResponse>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: resourceType,
              folder: "uploads", // Optional: organize files in folders
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else if (result) {
                resolve(result as unknown as CloudinaryUploadResponse);
              } else {
                reject(new Error("Upload result is undefined"));
              }
            }
          )
          .end(buffer);
      }
    );

    // For PDF files, fix URL format for raw resources
    let finalUrl = result.secure_url;
    if (file.type === "application/pdf") {
      finalUrl = finalUrl.replace("/image/upload/", "/raw/upload/");
    }

    return NextResponse.json({
      success: true,
      url: finalUrl,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Upload failed",
        details: error instanceof Error ? error.message : "Unknown error",
        url: "",
        public_id: "",
      },
      { status: 500 }
    );
  }
}
