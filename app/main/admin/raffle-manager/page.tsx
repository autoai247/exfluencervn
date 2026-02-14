'use client';

import { useState, useEffect } from 'react';
import { Gift, Trophy, Users, Ticket, Plus, Edit2, Trash2, Play } from 'lucide-react';

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
  const [raffleItems, setRaffleItems] = useState<RaffleItem[]>([]);
  const [drawResults, setDrawResults] = useState<DrawResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [adminPassword, setAdminPassword] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedRaffleId, setSelectedRaffleId] = useState<string | null>(null);

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
        alert(`🎉 당첨자: ${data.winner.name}\n이메일: ${data.winner.email}\n티켓 수: ${data.winner.ticketCount}장\n당첨 확률: ${data.stats.winProbability}`);
        loadRaffleItems();
        loadDrawResults();
        setShowPasswordModal(false);
        setAdminPassword('');
      } else {
        alert('추첨 실패: ' + data.error);
      }
    } catch (error) {
      console.error('Draw error:', error);
      alert('추첨 중 오류가 발생했습니다');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-700 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-400">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-700 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-dark-600 border-b border-dark-500">
        <div className="container-mobile">
          <div className="flex items-center justify-between py-4">
            <div>
              <h1 className="text-xl font-bold text-white">응모 상품 관리</h1>
              <p className="text-xs text-gray-400">Raffle Manager</p>
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
            <div className="text-xs text-gray-400">총 상품</div>
          </div>
          <div className="card text-center">
            <Ticket className="text-secondary mx-auto mb-2" size={24} />
            <div className="text-2xl font-bold text-white">
              {raffleItems.filter(item => item.active).length}
            </div>
            <div className="text-xs text-gray-400">진행 중</div>
          </div>
          <div className="card text-center">
            <Trophy className="text-accent mx-auto mb-2" size={24} />
            <div className="text-2xl font-bold text-white">{drawResults.length}</div>
            <div className="text-xs text-gray-400">추첨 완료</div>
          </div>
        </div>

        {/* 응모 상품 목록 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-white">응모 상품 목록</h2>
          </div>

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
                          <span className="badge badge-success text-xs">진행중</span>
                        ) : (
                          <span className="badge badge-gray text-xs">종료</span>
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
                        {item.currentTickets.toLocaleString()} / {item.totalTickets.toLocaleString()} 티켓
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
                      추첨하기
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
            <h2 className="text-lg font-bold text-white mb-3">추첨 결과</h2>
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
                          {raffle?.name || '알 수 없는 상품'}
                        </h3>
                        <div className="space-y-1 text-xs text-gray-400">
                          <div>🏆 당첨자: <span className="text-white font-bold">{result.winnerName}</span></div>
                          <div>👥 참여자: {result.totalParticipants}명</div>
                          <div>📅 추첨일: {new Date(result.drawDate).toLocaleDateString('ko-KR')}</div>
                        </div>
                        {result.announced && (
                          <span className="badge badge-primary text-xs mt-2">발표 완료</span>
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
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-dark-600 rounded-2xl w-full max-w-md p-6">
            <h3 className="text-lg font-bold text-white mb-4">추첨 실행</h3>
            <p className="text-sm text-gray-400 mb-4">
              관리자 비밀번호를 입력하세요
            </p>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="관리자 비밀번호"
              className="input w-full mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setAdminPassword('');
                }}
                className="btn bg-dark-700 text-gray-300 flex-1"
              >
                취소
              </button>
              <button
                onClick={executeDraw}
                disabled={!adminPassword}
                className="btn btn-primary flex-1 disabled:opacity-50"
              >
                추첨 실행
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
