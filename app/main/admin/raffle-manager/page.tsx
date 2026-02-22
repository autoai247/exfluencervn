'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Gift, Trophy, Users, Ticket, Plus, Edit2, Trash2, Play, ArrowLeft, X, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface RaffleItem {
  id: string;
  name: string;
  description: string;
  price: number;
  totalTickets: number;
  currentTickets: number;
  prizeValue: string;
  stock?: number;
  active: boolean;
  createdAt: string;
}

interface DrawResult {
  id: string;
  raffleId: string;
  winnerId: string;
  winnerName: string;
  drawDate: string;
  totalParticipants: number;
  announced: boolean;
}

export default function RaffleManagerPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [raffleItems, setRaffleItems] = useState<RaffleItem[]>([]);
  const [drawResults, setDrawResults] = useState<DrawResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [adminPassword, setAdminPassword] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedRaffleId, setSelectedRaffleId] = useState<string | null>(null);
  const [drawResultModal, setDrawResultModal] = useState<{ name: string; email: string; ticketCount: number; winProbability: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  // 초기 데이터 로드
  useEffect(() => {
    loadRaffleItems();
    loadDrawResults();
  }, []);

  const loadRaffleItems = async () => {
    try {
      const response = await fetch('/api/raffle/items');
      const data = await response.json();
      if (data.success) {
        setRaffleItems(data.items);
      }
    } catch (error) {
      console.error('Failed to load raffle items:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadDrawResults = async () => {
    try {
      const response = await fetch('/api/admin/raffle/draw');
      const data = await response.json();
      if (data.success) {
        setDrawResults(data.results);
      }
    } catch (error) {
      console.error('Failed to load draw results:', error);
    }
  };

  const handleDraw = async (raffleId: string) => {
    setSelectedRaffleId(raffleId);
    setShowPasswordModal(true);
  };

  const executeDraw = async () => {
    if (!selectedRaffleId || !adminPassword) return;
    setErrorMessage('');

    try {
      const response = await fetch('/api/admin/raffle/draw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          raffleId: selectedRaffleId,
          adminPassword,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setShowPasswordModal(false);
        setAdminPassword('');
        setDrawResultModal({
          name: data.winner.name,
          email: data.winner.email,
          ticketCount: data.winner.ticketCount,
          winProbability: data.stats.winProbability,
        });
        loadRaffleItems();
        loadDrawResults();
      } else {
        setErrorMessage((language === 'ko' ? '추첨 실패: ' : 'Rút thăm thất bại: ') + data.error);
      }
    } catch (error) {
      console.error('Draw error:', error);
      setErrorMessage(language === 'ko' ? '추첨 중 오류가 발생했습니다' : 'Đã xảy ra lỗi khi rút thăm');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-700 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-400">{language === 'ko' ? '로딩 중...' : 'Đang tải...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-700 pb-20">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 bg-green-500 text-white rounded-full shadow-2xl font-semibold text-sm">
          {toastMessage}
        </div>
      )}

      {/* Draw Result Modal */}
      {drawResultModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-white mb-4">
              {language === 'ko' ? '추첨 완료!' : 'Rút thăm hoàn tất!'}
            </h3>
            <div className="bg-dark-700/80 rounded-xl p-4 space-y-3 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-gray-400">{language === 'ko' ? '당첨자' : 'Người trúng'}</span>
                <span className="text-white font-bold">{drawResultModal.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{language === 'ko' ? '이메일' : 'Email'}</span>
                <span className="text-white">{drawResultModal.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{language === 'ko' ? '티켓 수' : 'Số vé'}</span>
                <span className="text-primary font-semibold">{language === 'ko' ? `${drawResultModal.ticketCount}장` : drawResultModal.ticketCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{language === 'ko' ? '당첨 확률' : 'Xác suất trúng'}</span>
                <span className="text-secondary font-semibold">{drawResultModal.winProbability}</span>
              </div>
            </div>
            <button
              onClick={() => setDrawResultModal(null)}
              className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold shadow-lg transition-all hover:opacity-90 flex items-center justify-center gap-2"
            >
              <CheckCircle size={18} />
              {language === 'ko' ? '확인' : 'Xác nhận'}
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="sticky top-0 z-40 bg-dark-700/95 backdrop-blur-sm border-b border-dark-400/40">
        <div className="container-mobile">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <button onClick={() => router.back()} className="btn-icon text-white">
                <ArrowLeft size={24} />
              </button>
              <div>
                <h1 className="text-xl font-bold text-white">{language === 'ko' ? '응모 상품 관리' : 'Quản lý sản phẩm rút thăm'}</h1>
                <p className="text-xs text-gray-400">Raffle Manager</p>
              </div>
            </div>
            <Trophy className="text-primary" size={32} />
          </div>
        </div>
      </div>

      <div className="container-mobile py-6 space-y-6">
        {/* 통계 */}
        <div className="grid grid-cols-3 gap-3">
          <div className="card text-center">
            <Gift className="text-primary mx-auto mb-2" size={24} />
            <div className="text-2xl font-bold text-white">{raffleItems.length}</div>
            <div className="text-xs text-gray-400">{language === 'ko' ? '총 상품' : 'Tổng sản phẩm'}</div>
          </div>
          <div className="card text-center">
            <Ticket className="text-secondary mx-auto mb-2" size={24} />
            <div className="text-2xl font-bold text-white">
              {raffleItems.filter(item => item.active).length}
            </div>
            <div className="text-xs text-gray-400">{language === 'ko' ? '진행 중' : 'Đang diễn ra'}</div>
          </div>
          <div className="card text-center">
            <Trophy className="text-accent mx-auto mb-2" size={24} />
            <div className="text-2xl font-bold text-white">{drawResults.length}</div>
            <div className="text-xs text-gray-400">{language === 'ko' ? '추첨 완료' : 'Đã rút thăm'}</div>
          </div>
        </div>

        {/* 응모 상품 목록 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-white">{language === 'ko' ? '응모 상품 목록' : 'Danh sách sản phẩm rút thăm'}</h2>
          </div>

          {raffleItems.length === 0 && (
            <div className="text-center py-12">
              <Gift size={48} className="text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">
                {language === 'ko' ? '등록된 응모 상품이 없습니다' : 'Chưa có sản phẩm rút thăm nào'}
              </p>
            </div>
          )}

          <div className="space-y-3">
            {raffleItems.map((item) => {
              const progress = (item.currentTickets / item.totalTickets) * 100;
              const isCompleted = progress >= 100;

              return (
                <div key={item.id} className="card">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base font-bold text-white">{item.name}</h3>
                        {item.active ? (
                          <span className="badge badge-success text-xs">{language === 'ko' ? '진행중' : 'Đang diễn ra'}</span>
                        ) : (
                          <span className="badge badge-gray text-xs">{language === 'ko' ? '종료' : 'Đã kết thúc'}</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mb-2">{item.description}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>💰 {item.prizeValue}</span>
                        <span>🎫 {item.price.toLocaleString()} SP</span>
                      </div>
                    </div>
                  </div>

                  {/* 진행률 */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-400">
                        {item.currentTickets.toLocaleString()} / {item.totalTickets.toLocaleString()} {language === 'ko' ? '티켓' : 'vé'}
                      </span>
                      <span className={`font-bold ${isCompleted ? 'text-primary' : 'text-gray-400'}`}>
                        {progress.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-dark-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          isCompleted ? 'bg-primary' : 'bg-secondary'
                        }`}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* 액션 버튼 */}
                  {item.active && isCompleted && (
                    <button
                      onClick={() => handleDraw(item.id)}
                      className="btn btn-primary w-full text-sm flex items-center justify-center gap-2"
                    >
                      <Play size={16} />
                      {language === 'ko' ? '추첨하기' : 'Rút thăm'}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 추첨 결과 */}
        {drawResults.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-white mb-3">{language === 'ko' ? '추첨 결과' : 'Kết quả rút thăm'}</h2>
            <div className="space-y-3">
              {drawResults.map((result) => {
                const raffle = raffleItems.find(r => r.id === result.raffleId);
                return (
                  <div key={result.id} className="card">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Trophy className="text-primary" size={20} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-bold text-white mb-1">
                          {raffle?.name || (language === 'ko' ? '알 수 없는 상품' : 'Sản phẩm không xác định')}
                        </h3>
                        <div className="space-y-1 text-xs text-gray-400">
                          <div>🏆 {language === 'ko' ? '당첨자' : 'Người trúng'}: <span className="text-white font-bold">{result.winnerName}</span></div>
                          <div>👥 {language === 'ko' ? '참여자' : 'Người tham gia'}: {language === 'ko' ? `${result.totalParticipants}명` : result.totalParticipants}</div>
                          <div>📅 {language === 'ko' ? '추첨일' : 'Ngày rút thăm'}: {new Date(result.drawDate).toLocaleDateString(language === 'ko' ? 'ko-KR' : 'vi-VN')}</div>
                        </div>
                        {result.announced && (
                          <span className="badge badge-primary text-xs mt-2">{language === 'ko' ? '발표 완료' : 'Đã công bố'}</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 관리자 비밀번호 모달 */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">{language === 'ko' ? '추첨 실행' : 'Thực hiện rút thăm'}</h3>
              <button
                onClick={() => { setShowPasswordModal(false); setAdminPassword(''); setErrorMessage(''); }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              {language === 'ko' ? '추첨을 실행하려면 관리자 비밀번호를 입력하세요' : 'Nhập mật khẩu quản trị viên để thực hiện rút thăm'}
            </p>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => { setAdminPassword(e.target.value); setErrorMessage(''); }}
              placeholder={language === 'ko' ? '관리자 비밀번호' : 'Mật khẩu quản trị viên'}
              className="input w-full mb-3"
            />
            {errorMessage && (
              <p className="text-xs text-red-400 mb-3">{errorMessage}</p>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => { setShowPasswordModal(false); setAdminPassword(''); setErrorMessage(''); }}
                className="flex-1 py-3 bg-dark-700 hover:bg-dark-500 text-gray-300 rounded-xl font-semibold text-sm transition-all"
              >
                {language === 'ko' ? '취소' : 'Hủy'}
              </button>
              <button
                onClick={executeDraw}
                disabled={!adminPassword}
                className="flex-1 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/25 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:opacity-90 flex items-center justify-center gap-2"
              >
                <Play size={16} />
                {language === 'ko' ? '추첨 실행' : 'Thực hiện rút thăm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
