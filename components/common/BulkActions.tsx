'use client';

import { useState } from 'react';
import { CheckSquare, Square, Trash2, Archive, Download, Copy, X } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface BulkActionsProps {
  items: any[];
  selectedIds: string[];
  onSelect: (id: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onDelete?: (ids: string[]) => void;
  onArchive?: (ids: string[]) => void;
  onExport?: (ids: string[]) => void;
  onDuplicate?: (ids: string[]) => void;
  language?: 'ko' | 'vi';
}

export default function BulkActions({
  items,
  selectedIds,
  onSelect,
  onSelectAll,
  onDeselectAll,
  onDelete,
  onArchive,
  onExport,
  onDuplicate,
  language = 'vi',
}: BulkActionsProps) {
  const [showConfirm, setShowConfirm] = useState<'delete' | 'archive' | null>(null);
  const { language: contextLanguage } = useLanguage();
  const lang = (language !== 'vi' ? language : contextLanguage) as 'ko' | 'vi';

  const text = {
    ko: {
      selected: '개 선택됨',
      selectAll: '전체 선택',
      deselectAll: '선택 해제',
      delete: '삭제',
      archive: '보관',
      export: '내보내기',
      duplicate: '복제',
      confirmDelete: '정말 삭제하시겠습니까?',
      confirmArchive: '정말 보관하시겠습니까?',
      cancel: '취소',
      confirm: '확인',
    },
    vi: {
      selected: 'đã chọn',
      selectAll: 'Chọn tất cả',
      deselectAll: 'Bỏ chọn',
      delete: 'Xóa',
      archive: 'Lưu trữ',
      export: 'Xuất',
      duplicate: 'Sao chép',
      confirmDelete: 'Bạn có chắc muốn xóa?',
      confirmArchive: 'Bạn có chắc muốn lưu trữ?',
      cancel: 'Hủy',
      confirm: 'Xác nhận',
    },
  };

  const t = text[lang];

  const allSelected = items.length > 0 && selectedIds.length === items.length;
  const someSelected = selectedIds.length > 0 && selectedIds.length < items.length;

  const handleAction = (action: 'delete' | 'archive' | 'export' | 'duplicate') => {
    if (selectedIds.length === 0) return;

    switch (action) {
      case 'delete':
        setShowConfirm('delete');
        break;
      case 'archive':
        setShowConfirm('archive');
        break;
      case 'export':
        onExport?.(selectedIds);
        break;
      case 'duplicate':
        onDuplicate?.(selectedIds);
        break;
    }
  };

  const confirmAction = () => {
    if (showConfirm === 'delete') {
      onDelete?.(selectedIds);
    } else if (showConfirm === 'archive') {
      onArchive?.(selectedIds);
    }
    setShowConfirm(null);
    onDeselectAll();
  };

  if (items.length === 0) return null;

  return (
    <>
      <div className="sticky top-14 z-30 bg-dark-700/95 backdrop-blur-sm border-b border-dark-500">
        <div className="container-mobile py-3">
          <div className="flex items-center gap-3">
            {/* Select All Checkbox */}
            <button
              onClick={allSelected || someSelected ? onDeselectAll : onSelectAll}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {allSelected ? (
                <CheckSquare size={20} className="text-primary" />
              ) : someSelected ? (
                <Square size={20} className="text-primary" />
              ) : (
                <Square size={20} />
              )}
            </button>

            {/* Selection Count */}
            <span className="text-sm text-gray-300 flex-1">
              {selectedIds.length > 0 ? (
                <span className="font-semibold text-primary">
                  {selectedIds.length}{t.selected}
                </span>
              ) : (
                t.selectAll
              )}
            </span>

            {/* Action Buttons */}
            {selectedIds.length > 0 && (
              <div className="flex items-center gap-2">
                {onExport && (
                  <button
                    onClick={() => handleAction('export')}
                    className="p-2 bg-dark-600 hover:bg-secondary text-gray-300 hover:text-white rounded-lg transition-all"
                    title={t.export}
                  >
                    <Download size={18} />
                  </button>
                )}
                {onDuplicate && (
                  <button
                    onClick={() => handleAction('duplicate')}
                    className="p-2 bg-dark-600 hover:bg-accent text-gray-300 hover:text-white rounded-lg transition-all"
                    title={t.duplicate}
                  >
                    <Copy size={18} />
                  </button>
                )}
                {onArchive && (
                  <button
                    onClick={() => handleAction('archive')}
                    className="p-2 bg-dark-600 hover:bg-blue-600 text-gray-300 hover:text-white rounded-lg transition-all"
                    title={t.archive}
                  >
                    <Archive size={18} />
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => handleAction('delete')}
                    className="p-2 bg-dark-600 hover:bg-error text-gray-300 hover:text-white rounded-lg transition-all"
                    title={t.delete}
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-dark-600 rounded-2xl p-6 max-w-sm w-full border border-dark-500">
            <h3 className="text-lg font-bold text-white mb-3">
              {showConfirm === 'delete' ? t.delete : t.archive}
            </h3>
            <p className="text-gray-300 mb-6">
              {showConfirm === 'delete' ? t.confirmDelete : t.confirmArchive}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(null)}
                className="flex-1 px-4 py-3 bg-dark-700 text-gray-300 rounded-lg font-medium hover:bg-dark-600 transition-colors"
              >
                {t.cancel}
              </button>
              <button
                onClick={confirmAction}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                  showConfirm === 'delete'
                    ? 'bg-error text-white hover:bg-red-600'
                    : 'bg-primary text-white hover:bg-primary-dark'
                }`}
              >
                {t.confirm}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
