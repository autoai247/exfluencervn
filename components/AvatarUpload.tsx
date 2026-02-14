'use client';

import { useState } from 'react';
import { Camera, X } from 'lucide-react';
import ImageUpload from './ImageUpload';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface AvatarUploadProps {
  currentAvatar?: string;
  onAvatarChange: (imageUrl: string) => void;
  size?: 'sm' | 'md' | 'lg';
}

export default function AvatarUpload({
  currentAvatar,
  onAvatarChange,
  size = 'lg',
}: AvatarUploadProps) {
  const { t } = useLanguage();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [avatar, setAvatar] = useState(currentAvatar);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  const handleImageSelect = (imageUrl: string) => {
    setAvatar(imageUrl);
    onAvatarChange(imageUrl);
    setShowUploadModal(false);
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div className={`relative ${sizeClasses[size]} mb-3`}>
          {avatar ? (
            <img
              src={avatar}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-primary"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-dark-600 border-4 border-dark-500 flex items-center justify-center">
              <Camera size={size === 'sm' ? 20 : size === 'md' ? 28 : 40} className="text-gray-500" />
            </div>
          )}
          <button
            onClick={() => setShowUploadModal(true)}
            className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full hover:scale-110 transition-transform shadow-lg"
          >
            <Camera size={size === 'sm' ? 14 : size === 'md' ? 16 : 18} />
          </button>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="text-sm font-semibold text-primary hover:underline"
        >
          {avatar ? t.avatarUpload.changePhoto : t.avatarUpload.uploadPhoto}
        </button>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-dark-600 rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">{t.avatarUpload.uploadProfilePhoto}</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="btn-icon text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <ImageUpload
              onImageSelect={handleImageSelect}
              currentImage={avatar}
              maxSizeMB={2}
              aspectRatio="square"
              showPreview={true}
            />

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 btn bg-dark-700 text-gray-300"
              >
                {t.avatarUpload.cancel}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
