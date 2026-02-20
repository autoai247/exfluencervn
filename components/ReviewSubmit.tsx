'use client';

import { useState } from 'react';
import { X, Send } from 'lucide-react';
import Rating from './Rating';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface ReviewSubmitProps {
  campaignTitle: string;
  onSubmit: (rating: number, comment: string) => void;
  onCancel: () => void;
}

export default function ReviewSubmit({ campaignTitle, onSubmit, onCancel }: ReviewSubmitProps) {
  const { language } = useLanguage();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (comment.trim() && rating > 0) {
      onSubmit(rating, comment);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-end sm:items-center justify-center p-4">
      <div className="bg-dark-600 rounded-t-2xl sm:rounded-2xl w-full max-w-md max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-dark-600 border-b border-dark-500 px-4 py-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">{language === 'ko' ? '리뷰 작성' : 'Viết đánh giá'}</h3>
          <button onClick={onCancel} className="btn-icon text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Campaign Info */}
          <div className="bg-dark-700 rounded-lg p-3">
            <p className="text-xs text-gray-400 mb-1">{language === 'ko' ? '캠페인' : 'Chiến dịch'}</p>
            <p className="text-sm font-semibold text-white">{campaignTitle}</p>
          </div>

          {/* Rating */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              {language === 'ko' ? '평점을 선택하세요' : 'Chọn đánh giá'}
            </label>
            <div className="flex items-center gap-3">
              <Rating rating={rating} interactive onChange={setRating} size={32} />
              <span className="text-2xl font-bold text-white">{rating}.0</span>
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              {language === 'ko' ? '협업 경험을 공유해주세요' : 'Chia sẻ trải nghiệm hợp tác của bạn'}
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={language === 'ko'
                ? '광고주/인플루언서와의 협업은 어떠셨나요? 자세한 리뷰는 다른 사용자에게 큰 도움이 됩니다.'
                : 'Trải nghiệm hợp tác với nhà quảng cáo/influencer như thế nào? Đánh giá chi tiết sẽ giúp ích cho người dùng khác rất nhiều.'}
              className="w-full px-4 py-3 bg-dark-700 border border-dark-500 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary resize-none"
              rows={6}
            />
            <p className="text-xs text-gray-500 mt-1">{comment.length} / {language === 'ko' ? '500자' : '500 ký tự'}</p>
          </div>

          {/* Tips */}
          <div className="bg-primary/10 border border-primary/30 rounded-lg p-3">
            <p className="text-xs font-semibold text-primary mb-2">
              {language === 'ko' ? '💡 좋은 리뷰 작성 팁' : '💡 Mẹo viết đánh giá hay'}
            </p>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>• {language === 'ko' ? '협업 과정에서 좋았던 점을 구체적으로 적어주세요' : 'Nêu rõ những điểm tích cực trong quá trình hợp tác'}</li>
              <li>• {language === 'ko' ? '소통, 납품, 결과물 등 다양한 측면을 언급해주세요' : 'Đề cập đến các khía cạnh như giao tiếp, giao hàng, kết quả, v.v.'}</li>
              <li>• {language === 'ko' ? '개선이 필요한 부분도 건설적으로 작성해주세요' : 'Nêu những điểm cần cải thiện một cách xây dựng'}</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button onClick={onCancel} className="flex-1 btn bg-dark-700 text-gray-300 hover:bg-dark-500">
              {language === 'ko' ? '취소' : 'Hủy'}
            </button>
            <button
              onClick={handleSubmit}
              disabled={!comment.trim()}
              className="flex-1 btn bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Send size={16} />
              {language === 'ko' ? '리뷰 제출' : 'Gửi đánh giá'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
