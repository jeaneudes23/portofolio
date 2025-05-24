"use client";

import { CldUploadWidget, CloudinaryUploadWidgetInfo, CloudinaryUploadWidgetResults } from "next-cloudinary";
import Image from "next/image";
import React, { useState } from "react";

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
            <div className="flex">
              {previewUrl ? (
                <button className="btn btn-sm ml-auto cursor-pointer bg-red-600" type="button" onClick={() => setPreviewUrl(null)}>
                  Remove
                </button>
              ) : (
                <button className="btn btn-sm btn-accent cursor-pointer" type="button" onClick={() => open()}>
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
