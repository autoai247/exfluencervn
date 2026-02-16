'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Check, Gift, TrendingUp, Flame, Star, Trophy, Zap, Crown, Award } from 'lucide-react';
import { formatShoppingPoints } from '@/lib/points';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import { useLanguage } from '@/lib/i18n/LanguageContext';

// Daily rewards for each day (1-7 loop)
const dailyRewards = [
  { day: 1, points: 1000 },
  { day: 2, points: 1000 },
  { day: 3, points: 1000 },
  { day: 4, points: 1000 },
  { day: 5, points: 2000 },
  { day: 6, points: 2000 },
  { day: 7, points: 3000 }, // 7일차는 더 많이
];

// Streak milestones - labels will be translated dynamically
const getStreakMilestones = (t: any) => [
  { days: 7, bonus: 10000, icon: Flame, color: 'orange', label: '1주일 연속' },
  { days: 14, bonus: 25000, icon: Star, color: 'yellow', label: '2주일 연속' },
  { days: 21, bonus: 50000, icon: Trophy, color: 'blue', label: '3주일 연속' },
  { days: 30, bonus: 100000, icon: Crown, color: 'purple', label: '30일 연속' },
];

// Mock data - 실제로는 localStorage/API에서 가져옴
const mockAttendanceData = {
  currentStreak: 23, // 현재 연속 출석 일수
  totalDays: 45, // 총 출석 일수
  totalPoints: 350000, // 총 획득 포인트
  todayChecked: false, // 오늘 출석 여부
  lastCheckDate: '2024-02-25', // 마지막 출석 날짜
  checkHistory: [
    '2024-02-01', '2024-02-02', '2024-02-03', '2024-02-04', '2024-02-05', '2024-02-06', '2024-02-07',
    '2024-02-08', '2024-02-09', '2024-02-10', '2024-02-11', '2024-02-12', '2024-02-13', '2024-02-14',
    '2024-02-15', '2024-02-16', '2024-02-17', '2024-02-18', '2024-02-19', '2024-02-20', '2024-02-21',
    '2024-02-22', '2024-02-23', '2024-02-24', '2024-02-25',
  ],
  claimedMilestones: [7, 14, 21], // 이미 받은 연속 출석 보너스
};

export default function AttendancePage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [attendanceData, setAttendanceData] = useState(mockAttendanceData);
  const [todayChecked, setTodayChecked] = useState(mockAttendanceData.todayChecked);
  const [showConfetti, setShowConfetti] = useState(false);

  const currentDayInWeek = (attendanceData.currentStreak % 7) || 7; // 1-7 사이 값
  const todayReward = dailyRewards[currentDayInWeek - 1];

  const streakMilestones = getStreakMilestones(t);
  // 다음 마일스톤 계산
  const nextMilestone = streakMilestones.find(m => m.days > attendanceData.currentStreak);
  const daysUntilNextMilestone = nextMilestone ? nextMilestone.days - attendanceData.currentStreak : 0;

  const handleCheckIn = () => {
    if (todayChecked) return;

    let totalEarned = todayReward.points;
    let bonusMessage = '';

    // 마일스톤 체크 (7일, 14일, 21일, 30일)
    const newStreak = attendanceData.currentStreak + 1;
    const milestone = streakMilestones.find(m => m.days === newStreak && !attendanceData.claimedMilestones.includes(m.days));

    if (milestone) {
      totalEarned += milestone.bonus;
      bonusMessage = `\n\n🎉 ${milestone.label} 달성!\n보너스 +${formatShoppingPoints(milestone.bonus)}`;
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }

    alert(
      `✅ ${t.attendance.checkInSuccess}\n\n` +
      `💰 ${t.attendance.todayReward}: ${formatShoppingPoints(todayReward.points)}\n` +
      `🔥 ${t.attendance.streak}: ${newStreak}${t.attendance.days}` +
      bonusMessage
    );

    setTodayChecked(true);
    setAttendanceData({
      ...attendanceData,
      currentStreak: newStreak,
      totalDays: attendanceData.totalDays + 1,
      totalPoints: attendanceData.totalPoints + totalEarned,
      claimedMilestones: milestone ? [...attendanceData.claimedMilestones, milestone.days] : attendanceData.claimedMilestones,
    });

    // TODO: API 호출로 서버에 저장
  };

  return (
    <div className="min-h-screen bg-dark-700 pb-20">
      <MobileHeader
        title={t.attendance.title}
        showBack
        showNotification
        onNotification={() => router.push('/main/influencer/notifications')}
      />

      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
          <div className="text-9xl animate-bounce">🎉</div>
        </div>
      )}

      <div className="container-mobile py-6 space-y-6">
        {/* Hero Stats */}
        <div className="card bg-gradient-to-br from-orange-500/30 to-yellow-500/20 border-2 border-orange-500/40 shadow-xl">
          <div className="text-center mb-4">
            <div className="text-7xl mb-3">🔥</div>
            <div className="text-5xl font-bold text-white mb-2">{attendanceData.currentStreak}</div>
            <div className="text-sm text-gray-300 mb-3">{t.attendance.streak} {t.attendance.days}</div>

            {nextMilestone && (
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full">
                <span className="text-white font-bold text-sm">
                  {nextMilestone.label}까지 {daysUntilNextMilestone}{t.attendance.days} 남음!
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-orange-500/30">
            <div className="text-center">
              <Calendar size={20} className="text-white mx-auto mb-1" />
              <div className="text-lg font-bold text-white">{attendanceData.totalDays}</div>
              <div className="text-xs text-gray-300">{t.attendance.totalCheckins}</div>
            </div>
            <div className="text-center">
              <Flame size={20} className="text-orange-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-orange-400">{attendanceData.currentStreak}</div>
              <div className="text-xs text-gray-300">{t.attendance.streak}</div>
            </div>
            <div className="text-center">
              <Gift size={20} className="text-yellow-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-yellow-400">{formatShoppingPoints(attendanceData.totalPoints)}</div>
              <div className="text-xs text-gray-300">{t.attendance.rewards}</div>
            </div>
          </div>
        </div>

        {/* Check In Button */}
        {!todayChecked ? (
          <button
            onClick={handleCheckIn}
            className="w-full btn bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white border-0 text-xl font-bold py-6 shadow-lg shadow-orange-500/30 animate-pulse"
          >
            <Check size={32} className="mr-3" />
            {t.attendance.checkIn} ({formatShoppingPoints(todayReward.points)})
          </button>
        ) : (
          <div className="card bg-gradient-to-r from-success/20 to-success/5 border-2 border-success/30 shadow-xl text-center py-6">
            <Check size={48} className="text-success mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">{t.attendance.alreadyChecked}</h3>
            <p className="text-sm text-gray-300">{t.attendance.comeBackTomorrow}</p>
            <p className="text-xs text-success mt-2">+{formatShoppingPoints(todayReward.points)} {t.completed.earned}</p>
          </div>
        )}

        {/* Weekly Progress */}
        <div className="card border-2 border-dark-500/50 shadow-xl">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Calendar size={20} className="text-primary" />
            {t.attendance.calendar}
          </h3>

          <div className="grid grid-cols-7 gap-2">
            {dailyRewards.map((item, index) => {
              const dayNumber = index + 1;
              const isToday = currentDayInWeek === dayNumber;
              const isPast = currentDayInWeek > dayNumber;

              return (
                <div key={index} className="relative">
                  <div
                    className={`w-full aspect-square rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                      isPast
                        ? 'bg-success/20 border-2 border-success'
                        : isToday && !todayChecked
                        ? 'bg-gradient-to-br from-orange-500 to-yellow-500 border-2 border-yellow-400 animate-pulse shadow-lg shadow-orange-500/50'
                        : isToday && todayChecked
                        ? 'bg-success/20 border-2 border-success'
                        : 'bg-dark-600 border-2 border-dark-500'
                    }`}
                  >
                    <div className="text-[10px] font-bold text-white">DAY {dayNumber}</div>
                    <div className={`text-xs font-semibold ${
                      isPast || (isToday && todayChecked) ? 'text-success' : isToday ? 'text-white' : 'text-gray-400'
                    }`}>
                      {(item.points / 1000).toFixed(1)}K
                    </div>
                    {(isPast || (isToday && todayChecked)) && (
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Check size={20} className="text-success" />
                      </div>
                    )}
                    {dayNumber === 7 && (
                      <div className="absolute -top-2 -right-2 bg-accent text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                        3K
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/30 rounded-lg p-3">
            <p className="text-xs text-gray-300 text-center">
              💡 매일 출석하면 7일마다 총 <span className="text-orange-400 font-bold">{formatShoppingPoints(dailyRewards.reduce((sum, d) => sum + d.points, 0))}</span> 획득!
            </p>
          </div>
        </div>

        {/* Streak Milestones */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-white px-1 flex items-center gap-2">
            <Trophy size={20} className="text-yellow-400" />
            {t.attendance.rewards}
          </h3>

          <div className="grid grid-cols-1 gap-6">
            {streakMilestones.map((milestone, index) => {
              const Icon = milestone.icon;
              const isCompleted = attendanceData.claimedMilestones.includes(milestone.days);
              const isCurrent = attendanceData.currentStreak < milestone.days && (index === 0 || attendanceData.currentStreak >= streakMilestones[index - 1].days);
              const progress = Math.min((attendanceData.currentStreak / milestone.days) * 100, 100);

              return (
                <div
                  key={milestone.days}
                  className={`card transition-all shadow-xl ${
                    isCompleted
                      ? 'bg-gradient-to-r from-success/20 to-success/5 border-2 border-success/30'
                      : isCurrent
                      ? 'bg-gradient-to-r from-primary/20 to-secondary/20 border-2 border-primary/30'
                      : 'bg-dark-600 border-2 border-dark-500 opacity-70'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isCompleted
                        ? 'bg-success'
                        : isCurrent
                        ? `bg-gradient-to-br from-${milestone.color}-500 to-${milestone.color}-600`
                        : 'bg-dark-500'
                    }`}>
                      {isCompleted ? (
                        <Check size={32} className="text-white" />
                      ) : (
                        <Icon size={32} className="text-white" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-white">{milestone.label}</h4>
                        {isCompleted && (
                          <span className="px-2 py-0.5 bg-success/20 text-success text-xs rounded-full font-semibold">
                            {t.campaign.status.completed}
                          </span>
                        )}
                        {isCurrent && (
                          <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full font-semibold">
                            {t.dashboard.inProgress}
                          </span>
                        )}
                      </div>

                      <div className="text-sm text-gray-400 mb-2">
                        {milestone.days}{t.attendance.days} {t.attendance.streak}
                      </div>

                      {!isCompleted && (
                        <div className="mb-2">
                          <div className="w-full bg-dark-600 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all bg-gradient-to-r from-${milestone.color}-500 to-${milestone.color}-600`}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-gray-500">
                              {attendanceData.currentStreak} / {milestone.days}{t.attendance.days}
                            </span>
                            <span className="text-xs text-primary font-semibold">
                              {milestone.days - attendanceData.currentStreak}{t.attendance.days} 남음
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <Gift size={16} className={isCompleted ? 'text-success' : 'text-yellow-400'} />
                        <span className={`font-bold ${isCompleted ? 'text-success' : 'text-yellow-400'}`}>
                          {isCompleted ? t.completed.earned : t.campaign.reward}: {formatShoppingPoints(milestone.bonus)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Monthly Calendar Preview */}
        <div className="card border-2 border-dark-500/50 shadow-xl">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Calendar size={20} className="text-primary" />
            {t.attendance.thisMonth}
          </h3>

          <div className="grid grid-cols-7 gap-1 mb-4">
            {['월', '화', '수', '목', '금', '토', '일'].map((day, i) => (
              <div key={i} className="text-center text-xs text-gray-400 py-1">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 35 }, (_, i) => {
              const dayNumber = i - 2; // 이번 달 1일이 3번째 셀에 오도록
              const isThisMonth = dayNumber >= 1 && dayNumber <= 28;
              const isChecked = isThisMonth && attendanceData.checkHistory.some(
                date => new Date(date).getDate() === dayNumber
              );
              const isToday = isThisMonth && dayNumber === 26; // Mock today

              return (
                <div
                  key={i}
                  className={`aspect-square rounded flex items-center justify-center text-xs ${
                    !isThisMonth
                      ? 'bg-transparent'
                      : isChecked
                      ? 'bg-success/20 text-success font-bold'
                      : isToday
                      ? 'bg-primary/30 text-white font-bold border-2 border-primary'
                      : 'bg-dark-600 text-gray-500'
                  }`}
                >
                  {isThisMonth && dayNumber}
                  {isChecked && (
                    <Check size={12} className="absolute text-success" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-success/20 rounded"></div>
              <span className="text-gray-400">{t.attendance.checkIn}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-primary/30 border-2 border-primary rounded"></div>
              <span className="text-gray-400">오늘</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-dark-600 rounded"></div>
              <span className="text-gray-400">미출석</span>
            </div>
          </div>
        </div>

        {/* Attendance Rules */}
        <div className="card bg-gradient-to-br from-info/10 to-info/5 border-2 border-info/30 shadow-xl">
          <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
            <Zap size={18} className="text-info" />
            출석 체크 규칙
          </h4>
          <ul className="text-sm text-gray-300 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-primary flex-shrink-0">•</span>
              <span>매일 1회 출석 체크 가능 (자정 기준 초기화)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary flex-shrink-0">•</span>
              <span>1-4일차: 각 1,000 SP, 5-6일차: 각 2,000 SP, 7일차: 3,000 SP</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary flex-shrink-0">•</span>
              <span><strong className="text-yellow-400">7일 연속:</strong> +10,000 SP 보너스</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary flex-shrink-0">•</span>
              <span><strong className="text-yellow-400">14일 연속:</strong> +25,000 SP 보너스</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary flex-shrink-0">•</span>
              <span><strong className="text-yellow-400">21일 연속:</strong> +50,000 SP 보너스</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary flex-shrink-0">•</span>
              <span><strong className="text-yellow-400">30일 연속:</strong> +100,000 SP 보너스</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning flex-shrink-0">⚠️</span>
              <span className="text-warning">연속 출석이 끊기면 처음부터 다시 시작</span>
            </li>
          </ul>
        </div>

        {/* Motivational Card */}
        <div className="card bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500/30 shadow-xl text-center py-6">
          <Award size={48} className="text-purple-400 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-white mb-2">
            30일 연속 출석하면
          </h3>
          <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
            {formatShoppingPoints(100000)}
          </div>
          <p className="text-sm text-gray-300">
            + 7일/14일/21일 보너스 포함 총 {formatShoppingPoints(185000)} 획득 가능!
          </p>
        </div>
      </div>

      <BottomNav userType="influencer" />
    </div>
  );
}
