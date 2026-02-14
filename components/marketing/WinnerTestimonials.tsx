'use client';

import { Star, Trophy, Heart, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function WinnerTestimonials() {
  const { t, language } = useLanguage();

  const winners = [
    {
      id: 1,
      name: '@beauty_queen',
      avatar: 'https://ui-avatars.com/api/?name=Nguyen+Linh&background=FF6B6B&color=fff',
      season: 'Season 0 (Beta)',
      review: {
        vi: 'Du lịch Hàn Quốc tuyệt vời quá! Làm đẹp, mua sắm... trải nghiệm tuyệt vời nhất đời!',
        ko: '한국 여행 너무 좋았어요! 뷰티 시술도 받고 쇼핑도 하고... 인생 최고의 경험!',
        en: 'Korea trip was amazing! Beauty treatments, shopping... best experience ever!',
      },
      rating: 5,
      verified: true,
      photos: 3,
    },
    {
      id: 2,
      name: '@skincare_mi',
      avatar: 'https://ui-avatars.com/api/?name=Tran+Mi&background=4ECDC4&color=fff',
      season: 'Season 0 (Beta)',
      review: {
        vi: 'Làn da thay đổi hoàn toàn sau liệu trình! Bạn bè đều ghen tị!',
        ko: '물광주사 받고 피부가 완전 달라졌어요 ㅋㅋ 친구들이 다 부러워해요!',
        en: 'My skin completely changed after the treatment! Friends are so jealous!',
      },
      rating: 5,
      verified: true,
      photos: 5,
    },
    {
      id: 3,
      name: '@makeup_vy',
      avatar: 'https://ui-avatars.com/api/?name=Le+Vy&background=FFD93D&color=333',
      season: 'Season 0 (Beta)',
      review: {
        vi: 'Mua sắm ở Olive Young 2 giờ vẫn chưa đủ ㅠㅠ Lần sau phải tích điểm nhiều hơn!',
        ko: '올리브영에서 쇼핑하는데 2시간이 모자랐어요 ㅠㅠ 다음엔 더 많이 모아야지!',
        en: 'Shopping at Olive Young - 2 hours wasn\'t enough ㅠㅠ Need to save more points!',
      },
      rating: 5,
      verified: true,
      photos: 4,
    },
  ];
  return (
    <div className="card bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-red-500/10 border-purple-500/30">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="text-yellow-400" size={24} />
        <h3 className="text-xl font-bold text-white">{t.koreaDream.winnersTitle}</h3>
      </div>

      <p className="text-sm text-gray-300 mb-4">
        {t.koreaDream.winnersDesc}
      </p>

      <div className="space-y-4">
        {winners.map((winner) => (
          <div
            key={winner.id}
            className="p-4 bg-dark-600 rounded-xl border border-dark-500 hover:border-purple-500/50 transition-all"
          >
            <div className="flex items-start gap-3 mb-3">
              <img
                src={winner.avatar}
                alt={winner.name}
                className="w-12 h-12 rounded-full ring-2 ring-purple-500"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-white">{winner.name}</span>
                  {winner.verified && (
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-green-500/20 rounded-full border border-green-500/30">
                      <CheckCircle size={12} className="text-green-400" />
                      <span className="text-[10px] text-green-400 font-bold">{t.koreaDream.verified}</span>
                    </div>
                  )}
                </div>
                <div className="text-xs text-gray-400">{winner.season} {t.winners.winnerLabel}</div>
              </div>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed mb-3">
              "{winner.review[language]}"
            </p>

            <div className="flex items-center justify-between">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < winner.rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-600'
                    }
                  />
                ))}
              </div>
              <div className="text-xs text-gray-400">
                📸 {winner.photos} {t.koreaDream.photos}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl border border-yellow-500/30">
        <div className="flex items-center gap-2 text-sm">
          <Heart size={16} className="text-yellow-400 fill-yellow-400" />
          <span className="text-yellow-400 font-bold">
            {t.winners.youCouldBeNext}
          </span>
        </div>
      </div>
    </div>
  );
}
