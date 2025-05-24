"use client";

import { File, X } from "lucide-react";
import { CldUploadWidget, CloudinaryUploadWidgetInfo, CloudinaryUploadWidgetResults } from "next-cloudinary";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./ui/button";

interface Props {
  name: string;
  defaultUrl?: string;
}

export const CustomFileUploader = ({ defaultUrl, name }: Props) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(defaultUrl || null);
  return (
    <CldUploadWidget
      options={{
        multiple: false,
      }}
      uploadPreset="portofolio"
      onSuccess={(results) => {
        const info = results.info as CloudinaryUploadWidgetInfo;
        setPreviewUrl(info.secure_url);
      }}
    >
      {({ open }) => {
        return (
          <div className="grid gap-1">
            <div className="flex items-center">
              {previewUrl ? (
                <Button className="z-10 -mb-14 ml-auto !h-auto rounded-full !p-2" type="button" onClick={() => setPreviewUrl(null)}>
                  <span className="sr-only">remove image</span>
                  <X className="size-5" />
                </Button>
              ) : (
                <button className="bg-secondary flex w-full cursor-pointer items-center justify-center gap-1 rounded-xl p-6 text-sm font-medium" type="button" onClick={() => open()}>
                  <File className="size-5" />
                  Upload an Image
                </button>
              )}
            </div>
            {previewUrl && (
              <div className="bg-secondary rounded-xl p-4">
                <Image alt="preview" src={previewUrl} width={0} height={0} className="mx-auto max-h-52 w-auto" />
              </div>
            )}
            <input type="hidden" name={name} value={previewUrl || ""} />
          </div>
        );
      }}
    </CldUploadWidget>
  );
};
