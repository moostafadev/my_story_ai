"use client";

import React, { ReactNode, useState } from "react";
import { CloudinaryInputProps, Lang } from "./types";
import { useCloudinaryUpload } from "./useCloudinaryUpload";
import { Button, ButtonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CustomDialog } from "../dialog";

const translations: Record<Lang, Record<string, string>> = {
  en: {
    clickToUpload: "Click to upload",
    orDrag: "or drag and drop",
    images: "Images",
    and: " and ",
    pdf: "PDF files",
    max: "Max",
    files: "files",
    uploading: "Uploading...",
    preparing: "Preparing...",
    completed: "Completed",
    error: "Error",
    uploadErrors: "Upload Errors",
    clear: "Clear",
    uploadProgress: "Upload Progress",
    completedCount: "completed",
    processing: "Processing uploads...",
  },
  ar: {
    clickToUpload: "اضغط للرفع",
    orDrag: "أو اسحب وأفلت",
    images: "صور",
    and: " و ",
    pdf: "ملفات PDF",
    max: "الحد الأقصى",
    files: "ملفات",
    uploading: "جاري الرفع...",
    preparing: "جارٍ التحضير...",
    completed: "اكتمل",
    error: "خطأ",
    uploadErrors: "أخطاء الرفع",
    clear: "مسح",
    uploadProgress: "تقدم الرفع",
    completedCount: "مكتمل",
    processing: "جاري معالجة الملفات...",
  },
};

export const CloudinaryInput: React.FC<CloudinaryInputProps> = ({
  setFilesURL,
  accept = "image/*,.pdf",
  maxFileSize = 10,
  maxFiles = 10,
  lang = "en",
  className,
}) => {
  const t = translations[lang];

  const {
    loading,
    onUploadAssets,
    uploadProgress,
    currentFiles,
    errors,
    clearErrors,
  } = useCloudinaryUpload(setFilesURL, accept, maxFileSize, maxFiles);

  const getProgressColor = (progress: number): string => {
    if (progress === -1) return "bg-red-500";
    if (progress === 100) return "bg-green-500";
    return "bg-gradient-to-r from-blue-500 to-blue-600";
  };

  const getStatusIcon = (progress: number): string => {
    if (progress === -1) return "❌";
    if (progress === 100) return "✅";
    if (progress > 0) return "📤";
    return "⏳";
  };

  const getStatusText = (progress: number, error?: string): string => {
    if (progress === -1) return error || t.error;
    if (progress === 100) return t.completed;
    if (progress > 0) return t.uploading;
    return t.preparing;
  };

  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* File Input */}
      <div className="relative group">
        <input
          type="file"
          onChange={onUploadAssets}
          multiple={maxFiles > 1}
          accept={accept}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
          disabled={loading}
          id="cloudinary-upload"
        />
        <label
          htmlFor="cloudinary-upload"
          className={`flex flex-col items-center justify-center w-full h-36 border-2 border-dashed group-hover:border-primary-foreground rounded-xl cursor-pointer
            transition-all duration-300 ease-in-out
            ${
              loading
                ? "border-gray-300 bg-primary/10 cursor-not-allowed"
                : "border-gray-300 bg-primary/10 hover:bg-primary/20 group-hover:scale-[1.01] hover:shadow-md"
            }
            `}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-10 h-10 mb-3 text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              <span className="font-semibold">
                {loading ? t.uploading : t.clickToUpload}
              </span>
              {!loading && (
                <span className="block text-xs mt-1">{t.orDrag}</span>
              )}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
              {accept.includes("image") && t.images}
              {accept.includes("image") && accept.includes(".pdf") && t.and}
              {accept.includes(".pdf") && t.pdf}
              <br />
              <span className="font-mono">
                {t.max} {maxFileSize}MB • {t.max} {maxFiles} {t.files}
              </span>
            </p>
          </div>
        </label>
      </div>

      {/* Error Summary */}
      {Object.keys(errors).length > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-red-800 dark:text-red-200">
              {t.uploadErrors} ({Object.keys(errors).length})
            </h4>
            <button
              onClick={clearErrors}
              className="text-xs text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 font-medium"
              type="button"
            >
              {t.clear}
            </button>
          </div>
        </div>
      )}

      {/* Progress Section */}
      {currentFiles.length > 0 && (
        <div className="space-y-3 bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {t.uploadProgress}
            </h4>
            <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
              {Object.values(uploadProgress).filter((p) => p === 100).length}/
              {currentFiles.length} {t.completedCount}
            </div>
          </div>

          <div className="space-y-4">
            {currentFiles.map((fileName) => {
              const progress = uploadProgress[fileName] || 0;
              const hasError = progress === -1;
              return (
                <div key={fileName} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <span className="text-xl flex-shrink-0">
                        {getStatusIcon(progress)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {fileName}
                        </p>
                        {hasError && errors[fileName] && (
                          <p className="text-xs text-red-600 mt-1">
                            {errors[fileName]}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          hasError
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            : progress === 100
                            ? "bg-green-100 text-green-800 dark:text-green-200 shadow-sm shadow-green-400/30"
                            : "bg-blue-100 text-blue-800 dark:text-blue-200"
                        }`}
                      >
                        {getStatusText(progress, errors[fileName])}
                      </span>
                      {progress >= 0 && (
                        <span className="text-xs font-mono text-gray-600 min-w-fit text-right font-semibold">
                          {progress}%
                        </span>
                      )}
                    </div>
                  </div>

                  {progress >= 0 && (
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
                      <div
                        className={`h-2.5 rounded-full transition-all duration-500 ease-out ${getProgressColor(
                          progress
                        )} relative overflow-hidden`}
                        style={{ width: `${progress}%` }}
                      >
                        {progress > 0 && progress < 100 && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Overall Loading */}
      {loading && (
        <div className="flex items-center justify-center space-x-3 py-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-500 border-t-transparent"></div>
          <span className="text-sm text-blue-700 dark:text-blue-300 font-medium">
            {t.processing}
          </span>
        </div>
      )}
    </div>
  );
};

export const CloudinaryBtn = ({
  fileUrl,
  children,
  variant,
  className,
}: {
  fileUrl: string;
  children: ReactNode;
  variant?: ButtonVariants;
  className?: string;
}) => {
  const getDownloadName = (url: string) => {
    if (!url) return "download.pdf";
    const parts = url.split("/");
    const last = parts[parts.length - 1].split("?")[0];
    return last.endsWith(".pdf") ? last : `${last}.pdf`;
  };

  const handleDownload = async (url: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = getDownloadName(url);
    link.click();
    window.URL.revokeObjectURL(link.href);
  };

  return (
    <Button
      onClick={() => handleDownload(fileUrl)}
      variant={variant}
      className={className}
    >
      {children}
    </Button>
  );
};

interface Props extends CloudinaryInputProps {
  title?: string;
  desc?: string;
  children: ReactNode;
  variant?: ButtonVariants;
}

export const CloudinaryInputDialog = ({
  setFilesURL,
  title,
  accept,
  className,
  desc,
  lang,
  maxFileSize,
  maxFiles,
  children,
  variant,
}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button className={className} variant={variant}>
        {children}
      </Button>
      <CustomDialog
        title={{
          text: title ?? lang === "ar" ? "رفع ملف" : "Upload File",
        }}
        description={{
          text: desc ?? "",
        }}
        onOpenChange={setOpen}
        open={open}
      >
        <CloudinaryInput
          setFilesURL={setFilesURL}
          accept={accept}
          lang={lang}
          maxFileSize={maxFileSize}
          maxFiles={maxFiles}
        />
      </CustomDialog>
    </>
  );
};
