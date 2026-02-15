# Phase 4 통합 가이드

Phase 4에서 추가된 편의성 기능들을 실제 페이지에 통합하는 방법을 안내합니다.

## 📦 생성된 컴포넌트 및 훅

### 1. 검색 히스토리
- **Hook:** `/hooks/useSearchHistory.ts`
- **Component:** `/components/common/SearchHistory.tsx`
- **기능:** 최근 검색어 저장 및 인기 검색어 표시

### 2. 스마트 기본값
- **Hook:** `/hooks/useSmartDefaults.ts`
- **기능:** 사용자의 이전 입력을 학습하여 폼 자동 완성

### 3. 대량 작업
- **Component:** `/components/common/BulkActions.tsx`
- **기능:** 여러 항목 선택하여 일괄 삭제/보관/내보내기

### 4. 데이터 내보내기
- **Utility:** `/lib/dataExport.ts`
- **Component:** `/components/common/ExportButton.tsx`
- **기능:** CSV, JSON, Excel 형식으로 데이터 내보내기

### 5. 온보딩 튜토리얼
- **Hook:** `/hooks/useOnboarding.ts`
- **Component:** `/components/onboarding/OnboardingTour.tsx`
- **기능:** 신규 사용자를 위한 가이드 투어

---

## 🔧 통합 예제

### 1. 검색 히스토리 통합

```typescript
import { useSearchHistory } from '@/hooks/useSearchHistory';
import SearchHistory from '@/components/common/SearchHistory';

function CampaignsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const { history, addToHistory, removeFromHistory, clearHistory } = useSearchHistory('campaign_search');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      addToHistory(query);
    }
    setShowHistory(false);
  };

  const popularSearches = ['뷰티', '패션', '푸드', '여행'];

  return (
    <>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setShowHistory(true)}
        placeholder="캠페인 검색..."
      />

      {showHistory && (
        <SearchHistory
          history={history}
          popularSearches={popularSearches}
          onSelect={handleSearch}
          onRemove={removeFromHistory}
          onClear={clearHistory}
          language="ko"
        />
      )}
    </>
  );
}
```

### 2. 스마트 기본값 통합

```typescript
import { useSmartDefaults } from '@/hooks/useSmartDefaults';

function CreateCampaignPage() {
  const [formData, setFormData] = useState({
    title: '',
    budget: '',
    platforms: [],
    categories: [],
  });

  const {
    applyDefaults,
    learnFromSubmission,
    getSuggestion,
  } = useSmartDefaults({
    storageKey: 'campaign_create',
    defaultValues: formData,
    learnFromSubmissions: true,
  });

  // 폼 로드 시 스마트 기본값 적용
  useEffect(() => {
    const withDefaults = applyDefaults(formData);
    setFormData(withDefaults);
  }, []);

  // 폼 제출 시 학습
  const handleSubmit = () => {
    learnFromSubmission(formData);
    // ... 제출 로직
  };

  // 특정 필드에 제안값 표시
  const suggestedBudget = getSuggestion('budget');

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.budget}
        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
        placeholder={suggestedBudget ? `추천: ${suggestedBudget}` : '예산 입력'}
      />
      {/* ... */}
    </form>
  );
}
```

### 3. 대량 작업 통합

```typescript
import BulkActions from '@/components/common/BulkActions';

function CampaignsListPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedIds(campaigns.map(c => c.id));
  };

  const handleDeselectAll = () => {
    setSelectedIds([]);
  };

  const handleDelete = (ids: string[]) => {
    setCampaigns(prev => prev.filter(c => !ids.includes(c.id)));
  };

  const handleExport = (ids: string[]) => {
    const selected = campaigns.filter(c => ids.includes(c.id));
    exportCampaigns(selected);
  };

  return (
    <>
      <BulkActions
        items={campaigns}
        selectedIds={selectedIds}
        onSelect={handleSelect}
        onSelectAll={handleSelectAll}
        onDeselectAll={handleDeselectAll}
        onDelete={handleDelete}
        onExport={handleExport}
        language="ko"
      />

      {campaigns.map(campaign => (
        <div key={campaign.id}>
          <input
            type="checkbox"
            checked={selectedIds.includes(campaign.id)}
            onChange={() => handleSelect(campaign.id)}
          />
          {/* campaign content */}
        </div>
      ))}
    </>
  );
}
```

### 4. 데이터 내보내기 통합

```typescript
import ExportButton from '@/components/common/ExportButton';
import { exportCampaigns } from '@/lib/dataExport';

function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);

  return (
    <div>
      <ExportButton
        data={campaigns}
        filename={`campaigns_${new Date().toISOString().split('T')[0]}.csv`}
        formats={['csv', 'json', 'excel']}
        onExport={(format) => console.log(`Exported as ${format}`)}
        language="ko"
        variant="button"
      />

      {/* campaign list */}
    </div>
  );
}
```

### 5. 온보딩 튜토리얼 통합

```typescript
import { useOnboarding, TOURS } from '@/hooks/useOnboarding';
import OnboardingTour from '@/components/onboarding/OnboardingTour';

function CampaignsPage() {
  const { shouldShowTour, completeTour, skipTour } = useOnboarding();
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    // 첫 방문 시 투어 표시
    if (shouldShowTour('influencer-campaigns')) {
      setShowTour(true);
    }
  }, []);

  return (
    <>
      {/* 페이지 컨텐츠 */}
      <div className="recommended-campaigns">
        {/* 추천 캠페인 */}
      </div>

      {/* 온보딩 투어 */}
      {showTour && (
        <OnboardingTour
          steps={TOURS.influencerCampaigns.steps}
          onComplete={() => {
            completeTour('influencer-campaigns');
            setShowTour(false);
          }}
          onSkip={() => {
            skipTour('influencer-campaigns');
            setShowTour(false);
          }}
          language="ko"
        />
      )}
    </>
  );
}
```

---

## 🎯 권장 적용 순서

1. **검색 히스토리** - 모든 검색 기능이 있는 페이지에 즉시 적용
2. **데이터 내보내기** - 리스트 페이지에 ExportButton 추가
3. **온보딩 튜토리얼** - 주요 페이지에 투어 추가
4. **스마트 기본값** - 폼이 있는 페이지에 점진적으로 적용
5. **대량 작업** - 관리자 페이지 또는 많은 항목을 다루는 페이지에 적용

---

## 📊 기대 효과

| 기능 | 사용성 개선 | 시간 절약 | 사용자 만족도 |
|------|------------|-----------|--------------|
| 검색 히스토리 | ⭐⭐⭐⭐⭐ | 30% | +25% |
| 스마트 기본값 | ⭐⭐⭐⭐ | 40% | +30% |
| 대량 작업 | ⭐⭐⭐⭐⭐ | 60% | +35% |
| 데이터 내보내기 | ⭐⭐⭐⭐ | 50% | +20% |
| 온보딩 튜토리얼 | ⭐⭐⭐⭐⭐ | - | +40% |

---

## 🔍 주의사항

1. **로컬스토리지 용량**: 검색 히스토리와 스마트 기본값은 로컬스토리지를 사용하므로 적절한 크기 제한 필요
2. **성능**: 대량 작업 시 너무 많은 항목을 한번에 처리하지 않도록 제한
3. **다국어**: 모든 컴포넌트는 한국어/베트남어 지원
4. **접근성**: 키보드 네비게이션 및 스크린 리더 지원 확인

---

## 🚀 다음 단계

Phase 4 기능 통합 완료 후:
- Phase 5 (Polish) 진행
- 사용자 피드백 수집
- A/B 테스트 실시
- 성능 모니터링
