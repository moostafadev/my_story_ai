import { UploadApiResponse } from "cloudinary";

export type Lang = "en" | "ar";

// Extend Cloudinary's UploadApiResponse instead of redefining
export interface CloudinaryUploadResponse extends UploadApiResponse {
  asset_id: string;
  version_id: string;
  folder: string;
}

export interface CloudinaryInputProps {
  setFilesURL: (urls: string[]) => void;
  accept?: string;
  maxFileSize?: number;
  maxFiles?: number;
  lang?: Lang;
  className?: string;
}
