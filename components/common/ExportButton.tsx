'use client';

import { useState } from 'react';
import { Download, FileJson, FileSpreadsheet, Copy, Check } from 'lucide-react';
import { exportData, copyToClipboard, type ExportFormat } from '@/lib/dataExport';
import { useToast } from './ToastContainer';

interface ExportButtonProps {
  data: any[];
  filename?: string;
  formats?: ExportFormat[];
  onExport?: (format: ExportFormat) => void;
  language?: 'ko' | 'vi';
  variant?: 'button' | 'icon';
}

export default function ExportButton({
  data,
  filename,
  formats = ['csv', 'json'],
  onExport,
  language = 'ko',
  variant = 'button',
}: ExportButtonProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const toast = useToast();

  const text = {
    ko: {
      export: '내보내기',
      exportAs: '다른 형식으로 내보내기',
      csv: 'CSV 파일',
      json: 'JSON 파일',
      excel: 'Excel 파일',
      copy: '클립보드에 복사',
      copied: '복사됨!',
      success: '내보내기 완료',
      successMsg: '데이터를 성공적으로 내보냈습니다.',
      copySuccess: '복사 완료',
      copySuccessMsg: '데이터를 클립보드에 복사했습니다.',
      error: '내보내기 실패',
      errorMsg: '데이터 내보내기에 실패했습니다.',
    },
    vi: {
      export: 'Xuất',
      exportAs: 'Xuất dưới dạng',
      csv: 'Tệp CSV',
      json: 'Tệp JSON',
      excel: 'Tệp Excel',
      copy: 'Sao chép',
      copied: 'Đã sao chép!',
      success: 'Xuất thành công',
      successMsg: 'Dữ liệu đã được xuất thành công.',
      copySuccess: 'Sao chép thành công',
      copySuccessMsg: 'Dữ liệu đã được sao chép vào clipboard.',
      error: 'Xuất thất bại',
      errorMsg: 'Không thể xuất dữ liệu.',
    },
  };

  const t = text[language];

  const handleExport = async (format: ExportFormat) => {
    try {
      exportData(data, { format, filename });
      onExport?.(format);
      toast.success(t.success, t.successMsg);
      setShowMenu(false);
    } catch (error) {
      console.error('Export failed:', error);
      toast.error(t.error, t.errorMsg);
    }
  };

  const handleCopy = async () => {
    try {
      const success = await copyToClipboard(data, 'csv');
      if (success) {
        setCopied(true);
        toast.success(t.copySuccess, t.copySuccessMsg);
        setTimeout(() => setCopied(false), 2000);
      } else {
        toast.error(t.error, t.errorMsg);
      }
    } catch (error) {
      console.error('Copy failed:', error);
      toast.error(t.error, t.errorMsg);
    }
  };

  const formatIcons = {
    csv: FileSpreadsheet,
    json: FileJson,
    excel: FileSpreadsheet,
  };

  if (data.length === 0) return null;

  return (
    <div className="relative">
      {variant === 'icon' ? (
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-2 bg-dark-600 hover:bg-secondary text-gray-300 hover:text-white rounded-lg transition-all"
          title={t.export}
        >
          <Download size={18} />
        </button>
      ) : (
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="px-4 py-2 bg-secondary hover:bg-secondary-dark text-white rounded-lg font-medium transition-all flex items-center gap-2"
        >
          <Download size={18} />
          {t.export}
        </button>
      )}

      {/* Export Menu */}
      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-dark-600 rounded-xl border border-dark-500 shadow-2xl z-50 overflow-hidden">
            <div className="p-2">
              <div className="text-xs text-gray-400 px-3 py-2 font-semibold">
                {t.exportAs}
              </div>

              {formats.map(format => {
                const Icon = formatIcons[format];
                return (
                  <button
                    key={format}
                    onClick={() => handleExport(format)}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-dark-500 rounded-lg transition-colors"
                  >
                    <Icon size={16} className="text-gray-400" />
                    {t[format]}
                  </button>
                );
              })}

              <div className="border-t border-dark-500 my-2" />

              <button
                onClick={handleCopy}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-dark-500 rounded-lg transition-colors"
              >
                {copied ? (
                  <>
                    <Check size={16} className="text-success" />
                    <span className="text-success">{t.copied}</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} className="text-gray-400" />
                    {t.copy}
                  </>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
