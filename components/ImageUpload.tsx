'use client';

import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface ImageUploadProps {
  onImageSelect: (imageUrl: string, file: File) => void;
  currentImage?: string;
  maxSizeMB?: number;
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'free';
  showPreview?: boolean;
}

export default function ImageUpload({
  onImageSelect,
  currentImage,
  maxSizeMB = 5,
  aspectRatio = 'free',
  showPreview = true,
}: ImageUploadProps) {
  const { t } = useLanguage();
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    setError(null);

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError(t.imageUpload.imageFilesOnly);
      return;
    }

    // Validate file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      setError(t.imageUpload.fileSizeLimit.replace('{size}', maxSizeMB.toString()));
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      setPreview(imageUrl);
      onImageSelect(imageUrl, file);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const aspectRatioClasses = {
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[16/9]',
    free: 'aspect-auto min-h-[200px]',
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {showPreview && preview ? (
        <div className="relative">
          <div className={`relative ${aspectRatioClasses[aspectRatio]} w-full overflow-hidden rounded-xl border-2 border-dark-500`}>
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/50 transition-all flex items-center justify-center group">
              <button
                onClick={handleRemove}
                className="opacity-0 group-hover:opacity-100 transition-all bg-red-500 text-white p-3 rounded-full hover:scale-110"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`${aspectRatioClasses[aspectRatio]} w-full border-2 border-dashed rounded-xl cursor-pointer transition-all ${
            isDragging
              ? 'border-primary bg-primary/10'
              : 'border-dark-500 bg-dark-600 hover:bg-dark-500 hover:border-primary'
          }`}
        >
          <div className="h-full flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
              {isDragging ? (
                <Upload size={32} className="text-primary animate-bounce" />
              ) : (
                <ImageIcon size={32} className="text-primary" />
              )}
            </div>
            <p className="text-white font-semibold mb-1">
              {isDragging ? t.imageUpload.dropImage : t.imageUpload.uploadImage}
            </p>
            <p className="text-sm text-gray-400 mb-3">
              {t.imageUpload.dragDropOrClick}
            </p>
            <p className="text-xs text-gray-500">
              JPG, PNG, GIF (최대 {maxSizeMB}MB)
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-3 flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-lg">
          <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-500">{error}</p>
        </div>
      )}
    </div>
  );
}
