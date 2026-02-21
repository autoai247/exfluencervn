'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Save,
  Plus,
  X,
  DollarSign,
  Users,
  Calendar,
  Tag,
  FileText,
  Hash,
  Eye,
  Copy,
  CheckCircle,
} from 'lucide-react';
import { FaInstagram, FaTiktok, FaYoutube, FaFacebook } from 'react-icons/fa';
import MobileHeader from '@/components/common/MobileHeader';
import { useToast } from '@/components/common/ToastContainer';
import { formatCash } from '@/lib/points';
import { useLanguage } from '@/lib/i18n/LanguageContext';

// ─── Types ─────────────────────────────────────────────────
type Platform = 'instagram' | 'tiktok' | 'youtube' | 'facebook';
type Deliverable = 'post' | 'story' | 'reel' | 'video' | 'live';

const PLATFORMS: { id: Platform; label: string; icon: typeof FaInstagram; color: string }[] = [
  { id: 'instagram', label: 'Instagram', icon: FaInstagram, color: 'text-pink-400' },
  { id: 'tiktok', label: 'TikTok', icon: FaTiktok, color: 'text-white' },
  { id: 'youtube', label: 'YouTube', icon: FaYoutube, color: 'text-red-400' },
  { id: 'facebook', label: 'Facebook', icon: FaFacebook, color: 'text-blue-400' },
];

const DELIVERABLES: { id: Deliverable; label: string; descKo: string; descVi: string }[] = [
  { id: 'post', label: 'Post / Feed', descKo: '고정 게시물', descVi: 'Bài đăng cố định' },
  { id: 'story', label: 'Story', descKo: '24시간 게시', descVi: 'Đăng 24 giờ' },
  { id: 'reel', label: 'Reel / Short', descKo: '짧은 영상', descVi: 'Video ngắn' },
  { id: 'video', label: '긴 영상 / Long Video', descKo: 'YouTube / FB Watch', descVi: 'YouTube / FB Watch' },
  { id: 'live', label: 'Livestream', descKo: '라이브 방송', descVi: 'Phát trực tiếp' },
];

const NICHES = [
  'Beauty', 'Fashion', 'Food', 'Travel', 'Fitness',
  'Tech', 'Lifestyle', 'Gaming', 'Finance', 'Parenting',
];

// ─── Component ─────────────────────────────────────────────
export default function CreateCampaignPage() {
  const router = useRouter();
  const toast = useToast();
  const { language } = useLanguage();

  const [step, setStep] = useState<1 | 2 | 3>(1); // 3 steps
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [campaignId] = useState(() => Math.random().toString(36).slice(2, 8).toUpperCase());

  const [form, setForm] = useState({
    // Step 1: Campaign basics
    brand: '',
    title: '',
    description: '',
    niche: [] as string[],
    platform: [] as Platform[],
    deliverable: [] as Deliverable[],

    // Step 2: Requirements
    slots: '3',
    budget: '',          // per KOL (VND)
    minFollowers: '10000',
    minEngagement: '3',
    gender: 'any' as 'any' | 'female' | 'male',
    ageRange: '18-35',
    location: '',
    requiresPet: [] as string[],   // dog/cat/bird/rabbit/fish/other
    requiresChildren: '',          // '' | 'none' | 'has_children'

    // Step 3: Details
    startDate: '',
    endDate: '',
    hashtags: '',
    guidelines: '',
    provided: '',        // what brand provides (product, sample, etc.)
  });

  const [hashtagInput, setHashtagInput] = useState('');

  // Auto-save draft
  useEffect(() => {
    const timer = setTimeout(() => {
      if (form.title) {
        try {
          localStorage.setItem('campaign_draft_vn', JSON.stringify(form));
        } catch {
          // ignore
        }
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [form]);

  // Load draft on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('campaign_draft_vn');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.title) setForm(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  const togglePlatform = (p: Platform) =>
    setForm(f => ({
      ...f,
      platform: f.platform.includes(p)
        ? f.platform.filter(x => x !== p)
        : [...f.platform, p],
    }));

  const toggleDeliverable = (d: Deliverable) =>
    setForm(f => ({
      ...f,
      deliverable: f.deliverable.includes(d)
        ? f.deliverable.filter(x => x !== d)
        : [...f.deliverable, d],
    }));

  const toggleNiche = (n: string) =>
    setForm(f => ({
      ...f,
      niche: f.niche.includes(n)
        ? f.niche.filter(x => x !== n)
        : [...f.niche, n],
    }));

  const toggleRequiresPet = (p: string) =>
    setForm(f => ({
      ...f,
      requiresPet: f.requiresPet.includes(p)
        ? f.requiresPet.filter(x => x !== p)
        : [...f.requiresPet, p],
    }));

  const addHashtag = () => {
    const tag = hashtagInput.trim().replace(/^#/, '');
    if (!tag) return;
    const existing = form.hashtags ? form.hashtags.split(' ') : [];
    if (!existing.includes(`#${tag}`)) {
      setForm(f => ({ ...f, hashtags: [...existing, `#${tag}`].join(' ').trim() }));
    }
    setHashtagInput('');
  };

  const removeHashtag = (tag: string) =>
    setForm(f => ({
      ...f,
      hashtags: f.hashtags.split(' ').filter(t => t !== tag).join(' '),
    }));

  const generateBriefText = () => {
    const tags = form.hashtags || '#[hashtag]';
    const isKo = language === 'ko';
    const budget = form.budget ? formatCash(parseInt(form.budget)) : (isKo ? '[협의]' : '[Thương lượng]');
    const platformLabels = form.platform.map(p =>
      PLATFORMS.find(x => x.id === p)?.label || p
    ).join(', ') || (isKo ? '[플랫폼 선택]' : '[Chọn nền tảng]');
    const deliverableLabels = form.deliverable.map(d =>
      DELIVERABLES.find(x => x.id === d)?.label || d
    ).join(' + ') || (isKo ? '[콘텐츠 유형 선택]' : '[Chọn loại nội dung]');

    if (isKo) {
      return `📋 캠페인 브리프
──────────────────────────
🏢 브랜드: ${form.brand || '[브랜드명]'}
📌 캠페인명: ${form.title || '[캠페인명]'}
📱 플랫폼: ${platformLabels}
🎬 콘텐츠 유형: ${deliverableLabels}

📝 캠페인 설명:
${form.description || '[홍보할 제품/서비스 설명]'}

──────────────────────────
✅ KOL 요구사항
• 최소 팔로워: ${parseInt(form.minFollowers || '0').toLocaleString()}
• 최소 참여율: ${form.minEngagement || '3'}%
• 성별: ${form.gender === 'female' ? '여성' : form.gender === 'male' ? '남성' : '제한 없음'}
• 연령대: ${form.ageRange}
• 지역: ${form.location}

──────────────────────────
💰 보수
• KOL당 예산: ${budget}
• KOL 모집 수: ${form.slots}명

──────────────────────────
📅 일정
• 시작일: ${form.startDate || '[DD/MM/YYYY]'}
• 종료일: ${form.endDate || '[DD/MM/YYYY]'}

──────────────────────────
#️⃣ 필수 해시태그:
${tags}

📋 진행 가이드:
${form.guidelines || '[KOL에게 전달할 구체적인 가이드 작성]'}

🎁 브랜드 제공 사항:
${form.provided || '[제품/샘플/기타 비용]'}

──────────────────────────
📩 지원하기:
🔗 https://exfluencervn.vercel.app/main/influencer/campaigns

⚡ 빠른 지원 — Google Form 없이 바로 지원!`;
    }

    return `📋 BRIEF CHIẾN DỊCH
──────────────────────────
🏢 Thương hiệu: ${form.brand || '[Tên thương hiệu]'}
📌 Tên chiến dịch: ${form.title || '[Tên chiến dịch]'}
📱 Nền tảng: ${platformLabels}
🎬 Loại nội dung: ${deliverableLabels}

📝 Mô tả chiến dịch:
${form.description || '[Mô tả sản phẩm/dịch vụ cần quảng cáo]'}

──────────────────────────
✅ YÊU CẦU KOL
• Followers tối thiểu: ${parseInt(form.minFollowers || '0').toLocaleString()}
• Tỷ lệ tương tác tối thiểu: ${form.minEngagement || '3'}%
• Giới tính: ${form.gender === 'female' ? 'Nữ' : form.gender === 'male' ? 'Nam' : 'Không giới hạn'}
• Độ tuổi: ${form.ageRange}
• Khu vực: ${form.location}

──────────────────────────
💰 THANH TOÁN
• Ngân sách/KOL: ${budget}
• Số lượng KOL: ${form.slots} người

──────────────────────────
📅 THỜI GIAN
• Bắt đầu: ${form.startDate || '[DD/MM/YYYY]'}
• Kết thúc: ${form.endDate || '[DD/MM/YYYY]'}

──────────────────────────
#️⃣ Hashtag bắt buộc:
${tags}

📋 Hướng dẫn thực hiện:
${form.guidelines || '[Ghi hướng dẫn cụ thể cho KOL]'}

🎁 Thương hiệu cung cấp:
${form.provided || '[Sản phẩm/mẫu thử/chi phí khác]'}

──────────────────────────
📩 Đăng ký & ứng tuyển tại:
🔗 https://exfluencervn.vercel.app/main/influencer/campaigns

⚡ Ứng tuyển nhanh — Không qua Google Form!`;
  };

  const generateShareText = () => {
    const budget = form.budget ? formatCash(parseInt(form.budget)) : '...';
    const platformLabels = form.platform.map(p =>
      PLATFORMS.find(x => x.id === p)?.label || p
    ).join(' + ') || '...';
    if (language === 'ko') {
      return `🔥 [신규 캠페인] ${form.title || 'KOL 모집'}

🏢 ${form.brand || '브랜드'}
📱 플랫폼: ${platformLabels}
💰 수입: ${budget}/KOL
👥 ${form.slots || '3'}자리 — 마감: ${form.endDate || 'TBD'}

${form.description ? form.description.slice(0, 150) + (form.description.length > 150 ? '...' : '') : ''}

✅ 조건: ${parseInt(form.minFollowers || '0').toLocaleString()}+ 팔로워, ER ${form.minEngagement || '3'}%+

📩 지금 지원 — Google Form 없이 바로:
👉 https://exfluencervn.vercel.app/main/influencer/campaigns

#KOL #influencer #campaign #${(form.niche[0] || 'beauty').toLowerCase()}`;
    }
    return `🔥 [CHIẾN DỊCH MỚI] ${form.title || 'Tuyển KOL'}

🏢 ${form.brand || 'Thương hiệu'}
📱 Nền tảng: ${platformLabels}
💰 Thu nhập: ${budget}/KOL
👥 ${form.slots || '3'} suất — hạn: ${form.endDate || 'TBD'}

${form.description ? form.description.slice(0, 150) + (form.description.length > 150 ? '...' : '') : ''}

✅ Điều kiện: ${parseInt(form.minFollowers || '0').toLocaleString()}+ followers, ER ${form.minEngagement || '3'}%+

📩 Ứng tuyển ngay — không qua Google Form:
👉 https://exfluencervn.vercel.app/main/influencer/campaigns

#KOL #influencer #chiendich #${(form.niche[0] || 'beauty').toLowerCase()}`;
  };

  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(generateBriefText());
      setCopied(true);
      toast.success(language === 'ko' ? '복사됨!' : 'Đã sao chép!', language === 'ko' ? 'Brief가 클립보드에 복사되었습니다.' : 'Brief đã được sao chép vào clipboard.');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error(language === 'ko' ? '오류' : 'Lỗi', language === 'ko' ? '복사할 수 없습니다. 다시 시도하세요.' : 'Không thể sao chép. Hãy thử lại.');
    }
  };

  const handleSubmit = async () => {
    if (!form.title || !form.platform.length || !form.deliverable.length) {
      toast.error(language === 'ko' ? '정보 부족' : 'Thiếu thông tin', language === 'ko' ? '이름, 플랫폼, 콘텐츠 유형을 모두 입력해 주세요.' : 'Vui lòng điền đầy đủ tên, nền tảng và loại nội dung.');
      setStep(1);
      return;
    }

    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1200));

    try {
      localStorage.removeItem('campaign_draft_vn');
    } catch {
      // ignore
    }

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const copyShareText = async () => {
    try {
      await navigator.clipboard.writeText(generateShareText());
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    } catch {
      // ignore
    }
  };

  const step1Done = form.title && form.platform.length > 0 && form.deliverable.length > 0;
  const step2Done = form.budget;

  // ─── Step 1: Basics ────────────────────────────────────────
  const renderStep1 = () => (
    <div className="space-y-5">
      {/* Brand & Title */}
      <div className="card bg-dark-600 border-2 border-dark-500 shadow-xl space-y-4">
        <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
          <FileText size={15} className="text-primary" />
          {language === 'ko' ? '기본 정보' : 'Thông tin cơ bản'}
        </h3>

        <div>
          <label className="text-xs text-gray-400 mb-1 block">{language === 'ko' ? '브랜드명' : 'Tên thương hiệu'}</label>
          <input
            value={form.brand}
            onChange={e => setForm(f => ({ ...f, brand: e.target.value }))}
            placeholder="VD: Laneige Vietnam"
            className="w-full bg-dark-700 border border-dark-400 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="text-xs text-gray-400 mb-1 block">{language === 'ko' ? '캠페인명 *' : 'Tên chiến dịch *'}</label>
          <input
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            placeholder={language === 'ko' ? '예: 여름 수분 세럼 리뷰' : 'VD: Review serum dưỡng ẩm mùa hè'}
            className="w-full bg-dark-700 border border-dark-400 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="text-xs text-gray-400 mb-1 block">{language === 'ko' ? '제품/캠페인 설명' : 'Mô tả sản phẩm / chiến dịch'}</label>
          <textarea
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            rows={4}
            placeholder={language === 'ko' ? '제품 설명, 캠페인 목표, 전달할 메시지...' : 'Mô tả sản phẩm, mục tiêu chiến dịch, thông điệp cần truyền tải...'}
            className="w-full bg-dark-700 border border-dark-400 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-primary resize-none"
          />
        </div>
      </div>

      {/* Niche */}
      <div className="card bg-dark-600 border-2 border-dark-500 shadow-xl space-y-3">
        <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
          <Tag size={15} className="text-secondary" />
          {language === 'ko' ? '분야' : 'Lĩnh vực'}
        </h3>
        <div className="flex flex-wrap gap-2">
          {NICHES.map(n => (
            <button
              key={n}
              type="button"
              onClick={() => toggleNiche(n)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                form.niche.includes(n)
                  ? 'bg-secondary text-white'
                  : 'bg-dark-700 text-gray-400 border border-dark-400'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Platforms */}
      <div className="card bg-dark-600 border-2 border-dark-500 shadow-xl space-y-3">
        <h3 className="text-sm font-semibold text-gray-300">{language === 'ko' ? '플랫폼 *' : 'Nền tảng *'}</h3>
        <div className="grid grid-cols-2 gap-2">
          {PLATFORMS.map(p => {
            const Icon = p.icon;
            const selected = form.platform.includes(p.id);
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => togglePlatform(p.id)}
                className={`flex items-center gap-2 p-3 rounded-xl transition-all border ${
                  selected
                    ? 'bg-primary/20 border-primary text-white'
                    : 'bg-dark-700 border-dark-400 text-gray-400'
                }`}
              >
                <Icon size={18} className={selected ? 'text-primary' : p.color} />
                <span className="text-sm font-medium">{p.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Deliverables */}
      <div className="card bg-dark-600 border-2 border-dark-500 shadow-xl space-y-3">
        <h3 className="text-sm font-semibold text-gray-300">{language === 'ko' ? '필요한 콘텐츠 유형 *' : 'Loại nội dung cần *'}</h3>
        <div className="space-y-2">
          {DELIVERABLES.map(d => {
            const selected = form.deliverable.includes(d.id);
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => toggleDeliverable(d.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all border ${
                  selected
                    ? 'bg-secondary/20 border-secondary text-white'
                    : 'bg-dark-700 border-dark-400 text-gray-400'
                }`}
              >
                <div className="text-left">
                  <div className="text-sm font-medium">{d.label}</div>
                  <div className="text-xs text-gray-500">{language === 'ko' ? d.descKo : d.descVi}</div>
                </div>
                {selected && <CheckCircle size={16} className="text-secondary flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={() => step1Done && setStep(2)}
        disabled={!step1Done}
        className={`w-full py-3.5 rounded-2xl text-sm font-bold transition-all ${
          step1Done
            ? 'bg-gradient-to-r from-primary to-secondary text-white'
            : 'bg-dark-500 text-gray-600 cursor-not-allowed'
        }`}
      >
        {language === 'ko' ? '다음: KOL 요구사항 →' : 'Tiếp theo: Yêu cầu KOL →'}
      </button>
    </div>
  );

  // ─── Step 2: Requirements ────────────────────────────────────
  const renderStep2 = () => (
    <div className="space-y-5">
      {/* Budget & Slots */}
      <div className="card bg-dark-600 border-2 border-dark-500 shadow-xl space-y-4">
        <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
          <DollarSign size={15} className="text-accent" />
          {language === 'ko' ? '예산' : 'Ngân sách'}
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-400 mb-1 block">{language === 'ko' ? 'KOL당 예산 (VND) *' : 'Ngân sách / KOL (VND) *'}</label>
            <input
              type="number"
              value={form.budget}
              onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}
              placeholder="500000"
              className="w-full bg-dark-700 border border-dark-400 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-primary"
            />
            {form.budget && (
              <div className="text-xs text-accent mt-1">{formatCash(parseInt(form.budget))}</div>
            )}
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">{language === 'ko' ? 'KOL 수' : 'Số lượng KOL'}</label>
            <input
              type="number"
              value={form.slots}
              onChange={e => setForm(f => ({ ...f, slots: e.target.value }))}
              placeholder="3"
              min="1"
              className="w-full bg-dark-700 border border-dark-400 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-primary"
            />
          </div>
        </div>
        {form.budget && form.slots && (
          <div className="rounded-xl bg-accent/10 border border-accent/30 px-4 py-2.5">
            <div className="text-xs text-gray-400">{language === 'ko' ? '예상 총 예산' : 'Tổng ngân sách dự kiến'}</div>
            <div className="text-lg font-bold text-accent">
              {formatCash(parseInt(form.budget) * parseInt(form.slots))}
            </div>
          </div>
        )}
      </div>

      {/* KOL Requirements */}
      <div className="card bg-dark-600 border-2 border-dark-500 shadow-xl space-y-4">
        <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
          <Users size={15} className="text-primary" />
          {language === 'ko' ? 'KOL 요구사항' : 'Yêu cầu KOL'}
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-400 mb-1 block">{language === 'ko' ? '최소 팔로워' : 'Followers tối thiểu'}</label>
            <select
              value={form.minFollowers}
              onChange={e => setForm(f => ({ ...f, minFollowers: e.target.value }))}
              className="w-full bg-dark-700 border border-dark-400 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-primary"
            >
              <option value="1000">1,000+</option>
              <option value="5000">5,000+</option>
              <option value="10000">10,000+</option>
              <option value="50000">50,000+</option>
              <option value="100000">100,000+</option>
              <option value="500000">500,000+</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">{language === 'ko' ? '최소 참여율 (%)' : 'Tỷ lệ tương tác (%)'}</label>
            <select
              value={form.minEngagement}
              onChange={e => setForm(f => ({ ...f, minEngagement: e.target.value }))}
              className="w-full bg-dark-700 border border-dark-400 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-primary"
            >
              <option value="1">1%+</option>
              <option value="2">2%+</option>
              <option value="3">3%+</option>
              <option value="5">5%+</option>
              <option value="8">8%+</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">{language === 'ko' ? '성별' : 'Giới tính'}</label>
            <select
              value={form.gender}
              onChange={e => setForm(f => ({ ...f, gender: e.target.value as 'any' | 'female' | 'male' }))}
              className="w-full bg-dark-700 border border-dark-400 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-primary"
            >
              <option value="any">{language === 'ko' ? '제한 없음' : 'Không giới hạn'}</option>
              <option value="female">{language === 'ko' ? '여성' : 'Nữ'}</option>
              <option value="male">{language === 'ko' ? '남성' : 'Nam'}</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">{language === 'ko' ? '연령대' : 'Độ tuổi'}</label>
            <select
              value={form.ageRange}
              onChange={e => setForm(f => ({ ...f, ageRange: e.target.value }))}
              className="w-full bg-dark-700 border border-dark-400 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-primary"
            >
              <option value="13-17">13–17</option>
              <option value="18-24">18–24</option>
              <option value="18-35">18–35</option>
              <option value="25-34">25–34</option>
              <option value="25-44">25–44</option>
              <option value="35+">35+</option>
              <option value="all">{language === 'ko' ? '전체' : 'Tất cả'}</option>
            </select>
          </div>
        </div>
        <div>
          <label className="text-xs text-gray-400 mb-1 block">{language === 'ko' ? '지역' : 'Khu vực'}</label>
          <select
            value={form.location}
            onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
            className="w-full bg-dark-700 border border-dark-400 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-primary"
          >
            <option value="">{language === 'ko' ? '제한 없음' : 'Không giới hạn'}</option>
            <optgroup label={language === 'ko' ? '── 남부 ──' : '── Miền Nam ──'}>
              <option value="Hồ Chí Minh">{language === 'ko' ? '호치민' : 'TP.HCM'}</option>
              <option value="Bình Dương">{language === 'ko' ? '빈즈엉' : 'Bình Dương'}</option>
              <option value="Đồng Nai">{language === 'ko' ? '동나이' : 'Đồng Nai'}</option>
              <option value="Vũng Tàu">{language === 'ko' ? '붕따우' : 'Vũng Tàu'}</option>
              <option value="Cần Thơ">{language === 'ko' ? '껀터' : 'Cần Thơ'}</option>
              <option value="Long An">{language === 'ko' ? '롱안' : 'Long An'}</option>
              <option value="Tiền Giang">{language === 'ko' ? '띠엔장' : 'Tiền Giang'}</option>
            </optgroup>
            <optgroup label={language === 'ko' ? '── 중부 ──' : '── Miền Trung ──'}>
              <option value="Đà Nẵng">{language === 'ko' ? '다낭' : 'Đà Nẵng'}</option>
              <option value="Huế">{language === 'ko' ? '후에' : 'Huế'}</option>
              <option value="Hội An">{language === 'ko' ? '호이안' : 'Hội An'}</option>
              <option value="Nha Trang">{language === 'ko' ? '나트랑' : 'Nha Trang'}</option>
              <option value="Quy Nhơn">{language === 'ko' ? '퀴논' : 'Quy Nhơn'}</option>
              <option value="Đà Lạt">{language === 'ko' ? '달랏' : 'Đà Lạt'}</option>
            </optgroup>
            <optgroup label={language === 'ko' ? '── 북부 ──' : '── Miền Bắc ──'}>
              <option value="Hà Nội">{language === 'ko' ? '하노이' : 'Hà Nội'}</option>
              <option value="Hải Phòng">{language === 'ko' ? '하이퐁' : 'Hải Phòng'}</option>
              <option value="Hạ Long">{language === 'ko' ? '하롱' : 'Hạ Long'}</option>
              <option value="Thái Nguyên">{language === 'ko' ? '타이응우옌' : 'Thái Nguyên'}</option>
              <option value="Bắc Ninh">{language === 'ko' ? '박닌' : 'Bắc Ninh'}</option>
              <option value="Nam Định">{language === 'ko' ? '남딘' : 'Nam Định'}</option>
            </optgroup>
            <option value="Toàn quốc">{language === 'ko' ? '전국' : 'Toàn quốc'}</option>
          </select>
        </div>

        {/* 반려동물 보유 KOL 조건 */}
        <div>
          <label className="text-xs text-gray-400 mb-2 block">{language === 'ko' ? '반려동물 보유 KOL' : 'KOL nuôi thú cưng'}</label>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'dog', ko: '강아지 🐶', vi: 'Chó 🐶' },
              { id: 'cat', ko: '고양이 🐱', vi: 'Mèo 🐱' },
              { id: 'bird', ko: '새 🐦', vi: 'Chim 🐦' },
              { id: 'rabbit', ko: '토끼 🐰', vi: 'Thỏ 🐰' },
              { id: 'fish', ko: '물고기 🐟', vi: 'Cá 🐟' },
              { id: 'other', ko: '기타', vi: 'Khác' },
            ].map(pet => (
              <button
                key={pet.id}
                type="button"
                onClick={() => toggleRequiresPet(pet.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                  form.requiresPet.includes(pet.id)
                    ? 'bg-primary/20 border-primary text-primary'
                    : 'bg-dark-700 border-dark-400 text-gray-400'
                }`}
              >
                {language === 'ko' ? pet.ko : pet.vi}
              </button>
            ))}
          </div>
          {form.requiresPet.length === 0 && (
            <p className="text-xs text-gray-600 mt-1">{language === 'ko' ? '선택 안 하면 제한 없음' : 'Không chọn = không giới hạn'}</p>
          )}
        </div>

        {/* 자녀 보유 KOL 조건 */}
        <div>
          <label className="text-xs text-gray-400 mb-2 block">{language === 'ko' ? '자녀 보유 KOL' : 'KOL có con nhỏ'}</label>
          <div className="flex gap-2">
            {[
              { id: '', ko: '제한 없음', vi: 'Không giới hạn' },
              { id: 'none', ko: '자녀 없음', vi: 'Không có con' },
              { id: 'has_children', ko: '자녀 있음', vi: 'Có con' },
            ].map(opt => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setForm(f => ({ ...f, requiresChildren: opt.id }))}
                className={`flex-1 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                  form.requiresChildren === opt.id
                    ? 'bg-secondary/20 border-secondary text-secondary'
                    : 'bg-dark-700 border-dark-400 text-gray-400'
                }`}
              >
                {language === 'ko' ? opt.ko : opt.vi}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="flex-1 py-3.5 rounded-2xl text-sm font-bold bg-dark-500 text-gray-400"
        >
          {language === 'ko' ? '← 이전' : '← Quay lại'}
        </button>
        <button
          type="button"
          onClick={() => step2Done && setStep(3)}
          disabled={!step2Done}
          className={`flex-[2] py-3.5 rounded-2xl text-sm font-bold transition-all ${
            step2Done
              ? 'bg-gradient-to-r from-primary to-secondary text-white'
              : 'bg-dark-500 text-gray-600 cursor-not-allowed'
          }`}
        >
          {language === 'ko' ? '다음: 상세 내용 →' : 'Tiếp theo: Chi tiết →'}
        </button>
      </div>
    </div>
  );

  // ─── Step 3: Details + Brief ────────────────────────────────
  const renderStep3 = () => (
    <div className="space-y-5">
      {/* Dates */}
      <div className="card bg-dark-600 border-2 border-dark-500 shadow-xl space-y-4">
        <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
          <Calendar size={15} className="text-secondary" />
          {language === 'ko' ? '일정' : 'Thời gian'}
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-400 mb-1 block">{language === 'ko' ? '시작일' : 'Ngày bắt đầu'}</label>
            <input
              type="date"
              value={form.startDate}
              onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))}
              className="w-full bg-dark-700 border border-dark-400 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">{language === 'ko' ? '종료일' : 'Ngày kết thúc'}</label>
            <input
              type="date"
              value={form.endDate}
              onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))}
              className="w-full bg-dark-700 border border-dark-400 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* Hashtags */}
      <div className="card bg-dark-600 border-2 border-dark-500 shadow-xl space-y-3">
        <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
          <Hash size={15} className="text-warning" />
          {language === 'ko' ? '필수 해시태그' : 'Hashtag bắt buộc'}
        </h3>
        <div className="flex gap-2">
          <input
            value={hashtagInput}
            onChange={e => setHashtagInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addHashtag())}
            placeholder={language === 'ko' ? '해시태그 입력 (#불필요)' : 'Nhập hashtag (không cần #)'}
            className="flex-1 bg-dark-700 border border-dark-400 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-primary"
          />
          <button
            type="button"
            onClick={addHashtag}
            className="px-4 py-2.5 bg-primary/20 border border-primary/40 rounded-xl text-primary"
          >
            <Plus size={18} />
          </button>
        </div>
        {form.hashtags && (
          <div className="flex flex-wrap gap-2">
            {form.hashtags.split(' ').filter(Boolean).map(tag => (
              <span key={tag} className="flex items-center gap-1 px-3 py-1 bg-warning/20 text-warning text-xs rounded-full border border-warning/30">
                {tag}
                <button type="button" onClick={() => removeHashtag(tag)}>
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Guidelines */}
      <div className="card bg-dark-600 border-2 border-dark-500 shadow-xl space-y-3">
        <h3 className="text-sm font-semibold text-gray-300">{language === 'ko' ? '실행 가이드라인' : 'Hướng dẫn thực hiện'}</h3>
        <textarea
          value={form.guidelines}
          onChange={e => setForm(f => ({ ...f, guidelines: e.target.value }))}
          rows={5}
          placeholder={language === 'ko'
            ? "• 흰색 또는 밝은 배경에서 제품 촬영\n• 캡션에 제품명 언급 필수\n• @[브랜드계정] 태그\n• 30일 이상 게시물 유지\n• 제품 이미지 과도한 편집 금지"
            : "• Chụp ảnh sản phẩm trên nền trắng hoặc phông sáng\n• Đề cập tên sản phẩm trong caption\n• Tag @[brand_account]\n• Giữ bài đăng ít nhất 30 ngày\n• Không được chỉnh sửa quá mức ảnh sản phẩm"}
          className="w-full bg-dark-700 border border-dark-400 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-primary resize-none"
        />
      </div>

      {/* What brand provides */}
      <div className="card bg-dark-600 border-2 border-dark-500 shadow-xl space-y-3">
        <h3 className="text-sm font-semibold text-gray-300">{language === 'ko' ? '브랜드 제공 사항' : 'Thương hiệu cung cấp'}</h3>
        <textarea
          value={form.provided}
          onChange={e => setForm(f => ({ ...f, provided: e.target.value }))}
          rows={3}
          placeholder={language === 'ko'
            ? "• 샘플 제품 1세트 (무료)\n• 전국 무료 배송\n• 사용 가능한 고화질 이미지"
            : "• 1 bộ sản phẩm mẫu thử (miễn phí)\n• Freeship toàn quốc\n• Ảnh chất lượng cao để sử dụng"}
          className="w-full bg-dark-700 border border-dark-400 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-primary resize-none"
        />
      </div>

      {/* Generate Brief */}
      <div className="rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 border-2 border-primary/40 p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-sm font-bold text-white">{language === 'ko' ? 'Brief 생성' : 'Tạo Brief ngay'}</div>
            <div className="text-xs text-gray-400">{language === 'ko' ? 'Facebook/Zalo로 KOL에게 복사 전송' : 'Copy và gửi cho KOL qua Facebook/Zalo'}</div>
          </div>
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-1.5 px-3 py-2 bg-dark-600 rounded-xl text-sm text-primary border border-primary/30"
          >
            <Eye size={15} />
            {language === 'ko' ? '미리보기' : 'Xem trước'}
          </button>
        </div>
        <button
          type="button"
          onClick={copyBrief}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold flex items-center justify-center gap-2"
        >
          {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
          {copied ? (language === 'ko' ? '복사됨!' : 'Đã sao chép!') : (language === 'ko' ? 'Brief 복사' : 'Sao chép Brief')}
        </button>
      </div>

      {/* Brief Preview */}
      {showPreview && (
        <div className="card bg-dark-800 border-2 border-dark-400 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs text-gray-400 font-semibold">{language === 'ko' ? 'BRIEF 미리보기' : 'XEM TRƯỚC BRIEF'}</div>
            <button type="button" onClick={() => setShowPreview(false)}>
              <X size={16} className="text-gray-500" />
            </button>
          </div>
          <pre className="text-xs text-gray-300 whitespace-pre-wrap font-mono leading-relaxed">
            {generateBriefText()}
          </pre>
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setStep(2)}
          className="flex-1 py-3.5 rounded-2xl text-sm font-bold bg-dark-500 text-gray-400"
        >
          {language === 'ko' ? '← 이전' : '← Quay lại'}
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex-[2] py-3.5 rounded-2xl text-sm font-bold bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save size={15} />
          )}
          {isSubmitting ? (language === 'ko' ? '생성 중...' : 'Đang tạo...') : (language === 'ko' ? '캠페인 생성' : 'Tạo chiến dịch')}
        </button>
      </div>
    </div>
  );

  // ─── Success Screen ─────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-dark-700 pb-10">
        <div className="sticky top-0 z-10 bg-dark-700 border-b border-dark-500 px-4 py-4 flex items-center gap-3">
          <CheckCircle size={22} className="text-accent" />
          <h1 className="text-base font-bold text-white">{language === 'ko' ? '캠페인이 생성되었습니다!' : 'Chiến dịch đã tạo!'}</h1>
        </div>

        <div className="px-4 py-5 space-y-4">
          {/* Success Banner */}
          <div className="rounded-2xl bg-gradient-to-r from-accent/20 to-green-500/10 border-2 border-accent/50 p-5 text-center">
            <div className="text-4xl mb-2">🎉</div>
            <div className="text-lg font-bold text-white mb-1">"{form.title}"</div>
            <div className="text-sm text-gray-400">{language === 'ko' ? '이(가) 성공적으로 생성되었습니다!' : 'đã được tạo thành công!'}</div>
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-500">
              <span className="px-2 py-1 bg-dark-600 rounded-lg">ID: {campaignId}</span>
              <span className="px-2 py-1 bg-dark-600 rounded-lg">{language === 'ko' ? '예산' : 'Ngân sách'}: {form.budget ? formatCash(parseInt(form.budget)) : '?'}/KOL</span>
              <span className="px-2 py-1 bg-dark-600 rounded-lg">{form.slots || '3'} {language === 'ko' ? '자리' : 'suất'}</span>
            </div>
          </div>

          {/* Step 2: Share to Facebook */}
          <div className="card bg-dark-600 border-2 border-blue-500/40 shadow-xl space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">f</span>
              </div>
              <div>
                <div className="text-sm font-bold text-white">{language === 'ko' ? 'Facebook 그룹에 공유' : 'Chia sẻ lên nhóm Facebook'}</div>
                <div className="text-xs text-gray-400">{language === 'ko' ? 'KOL 그룹에 게시 → KOL이 직접 지원' : 'Đăng vào nhóm KOL → KOL ứng tuyển trực tiếp'}</div>
              </div>
            </div>

            {/* Share Text Preview */}
            <div className="bg-dark-700 rounded-xl p-3 border border-dark-400">
              <pre className="text-xs text-gray-300 whitespace-pre-wrap leading-relaxed font-sans">
                {generateShareText()}
              </pre>
            </div>

            <button
              onClick={copyShareText}
              className="w-full py-3 rounded-xl bg-blue-600 text-white text-sm font-bold flex items-center justify-center gap-2"
            >
              {copiedShare ? <CheckCircle size={16} /> : <Copy size={16} />}
              {copiedShare ? (language === 'ko' ? '복사됨! Facebook에 붙여넣기 👆' : 'Đã sao chép! Dán vào Facebook ngay 👆') : (language === 'ko' ? 'Facebook 게시물 복사' : 'Sao chép bài đăng Facebook')}
            </button>

            <p className="text-[10px] text-gray-500 text-center">
              💡 {language === 'ko' ? '복사 → Facebook 열기 → KOL 그룹 찾기 → 붙여넣기 & 게시' : 'Copy → Mở Facebook → Tìm nhóm KOL → Dán & Đăng'}
            </p>
          </div>

          {/* Suggested Facebook Groups */}
          <div className="card bg-dark-600 border-2 border-dark-500 shadow-xl space-y-2">
            <div className="text-xs font-semibold text-gray-400 mb-2">📌 {language === 'ko' ? '추천 KOL Facebook 그룹:' : 'Nhóm Facebook KOL gợi ý để đăng:'}</div>
            {[
              'KOL Vietnam - Influencer Marketing',
              'Cộng đồng Influencer Việt Nam',
              'KOL & Influencer HCM',
              'Review & Collaboration Vietnam',
            ].map((group) => (
              <div key={group} className="flex items-center gap-2 text-xs text-gray-300 py-1">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                {group}
              </div>
            ))}
          </div>

          {/* Also copy brief */}
          <div className="card bg-dark-600 border-2 border-dark-500 shadow-xl">
            <div className="text-xs font-semibold text-gray-400 mb-2">📋 {language === 'ko' ? '상세 Brief (KOL에게 개별 전송):' : 'Brief chi tiết (gửi riêng cho KOL):'}</div>
            <button
              onClick={copyBrief}
              className="w-full py-2.5 rounded-xl bg-dark-500 border border-primary/30 text-primary text-sm font-semibold flex items-center justify-center gap-2"
            >
              {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
              {copied ? (language === 'ko' ? '복사됨!' : 'Đã sao chép!') : (language === 'ko' ? '전체 Brief 복사' : 'Sao chép Brief đầy đủ')}
            </button>
          </div>

          {/* Go to Dashboard */}
          <button
            onClick={() => router.push('/main/advertiser')}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold"
          >
            {language === 'ko' ? '대시보드 보기 →' : 'Xem Dashboard →'}
          </button>
        </div>
      </div>
    );
  }

  // ─── Render ─────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-dark-700 pb-10">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-dark-700 border-b border-dark-500">
        <div className="px-4 py-4 flex items-center gap-3">
          <button onClick={() => (step > 1 ? setStep((step - 1) as 1 | 2 | 3) : router.back())} className="text-gray-400">
            <ArrowLeft size={22} />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-white">{language === 'ko' ? '새 캠페인 만들기' : 'Tạo chiến dịch mới'}</h1>
            <div className="text-xs text-gray-500">{language === 'ko' ? `${step}단계 / 3` : `Bước ${step} / 3`}</div>
          </div>
        </div>
        {/* Step Progress */}
        <div className="flex px-4 pb-3 gap-2">
          {([1, 2, 3] as const).map(s => (
            <div
              key={s}
              className={`flex-1 h-1.5 rounded-full transition-all ${
                s <= step ? 'bg-primary' : 'bg-dark-500'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Step Labels */}
      <div className="flex px-4 py-3 gap-2 text-center">
        {[
          { label: language === 'ko' ? '1. 기본' : '1. Cơ bản', active: step === 1 },
          { label: language === 'ko' ? '2. 요구사항' : '2. Yêu cầu', active: step === 2 },
          { label: language === 'ko' ? '3. 상세' : '3. Chi tiết', active: step === 3 },
        ].map((s, i) => (
          <div key={i} className={`flex-1 text-xs font-medium ${s.active ? 'text-primary' : 'text-gray-600'}`}>
            {s.label}
          </div>
        ))}
      </div>

      <div className="px-4 space-y-5">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </div>
    </div>
  );
}
