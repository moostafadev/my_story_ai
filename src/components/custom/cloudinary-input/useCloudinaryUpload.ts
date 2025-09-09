"use client";

import { useState, useCallback } from "react";

export function useCloudinaryUpload(
  setFilesURL: (urls: string[]) => void,
  accept: string,
  maxFileSize: number,
  maxFiles: number
) {
  const [loading, setLoading] = useState(false);
  const [currentFiles, setCurrentFiles] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {}
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const clearErrors = () => setErrors({});

  const onUploadAssets = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;

      const files = Array.from(e.target.files);
      if (files.length > maxFiles) {
        setErrors((prev) => ({
          ...prev,
          general: `You can only upload up to ${maxFiles} files`,
        }));
        return;
      }

      setLoading(true);
      const uploadedUrls: string[] = [];

      for (const file of files) {
        if (file.size / 1024 / 1024 > maxFileSize) {
          setErrors((prev) => ({
            ...prev,
            [file.name]: `File exceeds ${maxFileSize}MB limit`,
          }));
          setUploadProgress((prev) => ({ ...prev, [file.name]: -1 }));
          continue;
        }

        setCurrentFiles((prev) => [...new Set([...prev, file.name])]);
        setUploadProgress((prev) => ({ ...prev, [file.name]: 0 }));

        try {
          const formData = new FormData();
          formData.append("file", file);

          // Fake progress loop until response arrives
          let progress = 0;
          const interval = setInterval(() => {
            progress += 10;
            setUploadProgress((prev) => {
              const current = prev[file.name] ?? 0;
              if (current < 90) {
                return { ...prev, [file.name]: progress };
              }
              return prev;
            });
          }, 400);

          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          clearInterval(interval);

          if (!response.ok) throw new Error("Upload failed");

          const result = (await response.json()) as {
            success: boolean;
            url: string;
            public_id: string;
            error?: string;
          };

          if (!result.success) {
            throw new Error(result.error || "Upload failed");
          }

          uploadedUrls.push(result.url);
          setUploadProgress((prev) => ({ ...prev, [file.name]: 100 }));
        } catch {
          setErrors((prev) => ({
            ...prev,
            [file.name]: "Upload failed",
          }));
          setUploadProgress((prev) => ({ ...prev, [file.name]: -1 }));
        }
      }

      if (uploadedUrls.length > 0) {
        setFilesURL(uploadedUrls);
      }

      setLoading(false);
    },
    [maxFiles, maxFileSize, setFilesURL]
  );

  return {
    loading,
    currentFiles,
    uploadProgress,
    errors,
    clearErrors,
    onUploadAssets,
  };
}
