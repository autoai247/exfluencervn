/**
 * Data Export Utilities
 * Export data to various formats (CSV, JSON, Excel-compatible)
 */

export type ExportFormat = 'csv' | 'json' | 'excel';

interface ExportOptions {
  filename?: string;
  format?: ExportFormat;
  includeHeaders?: boolean;
}

/**
 * Convert array of objects to CSV string
 */
function arrayToCSV(data: any[], headers?: string[]): string {
  if (data.length === 0) return '';

  // Get headers from first object if not provided
  const cols = headers || Object.keys(data[0]);

  // Create CSV header row
  const headerRow = cols.map(col => `"${col}"`).join(',');

  // Create data rows
  const dataRows = data.map(row => {
    return cols.map(col => {
      const value = row[col];
      // Handle different value types
      if (value === null || value === undefined) return '""';
      if (Array.isArray(value)) return `"${value.join(', ')}"`;
      if (typeof value === 'object') return `"${JSON.stringify(value)}"`;
      // Escape quotes in strings
      return `"${String(value).replace(/"/g, '""')}"`;
    }).join(',');
  });

  return [headerRow, ...dataRows].join('\n');
}

/**
 * Download data as CSV file
 */
export function exportToCSV(data: any[], options: ExportOptions = {}) {
  const {
    filename = `export_${Date.now()}.csv`,
    includeHeaders = true,
  } = options;

  const csv = arrayToCSV(data);
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' }); // BOM for Excel
  downloadBlob(blob, filename);
}

/**
 * Download data as JSON file
 */
export function exportToJSON(data: any[], options: ExportOptions = {}) {
  const {
    filename = `export_${Date.now()}.json`,
  } = options;

  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  downloadBlob(blob, filename);
}

/**
 * Download data as Excel-compatible CSV
 */
export function exportToExcel(data: any[], options: ExportOptions = {}) {
  const {
    filename = `export_${Date.now()}.xlsx.csv`,
  } = options;

  // Excel-compatible CSV with specific encoding
  const csv = arrayToCSV(data);
  const blob = new Blob(['\uFEFF' + csv], {
    type: 'application/vnd.ms-excel;charset=utf-8;'
  });
  downloadBlob(blob, filename);
}

/**
 * Universal export function
 */
export function exportData(data: any[], options: ExportOptions = {}) {
  const { format = 'csv' } = options;

  switch (format) {
    case 'csv':
      exportToCSV(data, options);
      break;
    case 'json':
      exportToJSON(data, options);
      break;
    case 'excel':
      exportToExcel(data, options);
      break;
    default:
      exportToCSV(data, options);
  }
}

/**
 * Helper function to download blob
 */
function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export campaigns data
 */
export function exportCampaigns(campaigns: any[], format: ExportFormat = 'csv') {
  const exportData = campaigns.map(campaign => ({
    ID: campaign.id,
    제목: campaign.title,
    회사: campaign.company,
    예산: campaign.budget,
    플랫폼: campaign.platforms.join(', '),
    카테고리: campaign.categories.join(', '),
    위치: campaign.location,
    마감일: campaign.deadline,
    신청자수: campaign.applicants,
    타입: campaign.type,
  }));

  exportToCSV(exportData, {
    filename: `campaigns_${new Date().toISOString().split('T')[0]}.csv`,
  });
}

/**
 * Export filtered campaigns
 */
export function exportFilteredCampaigns(
  campaigns: any[],
  filters: any,
  format: ExportFormat = 'csv'
) {
  const timestamp = new Date().toISOString().split('T')[0];
  const filterInfo = Object.entries(filters)
    .filter(([_, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== '' && value !== false && value !== undefined;
    })
    .map(([key, value]) => `${key}=${value}`)
    .join('_');

  const filename = filterInfo
    ? `campaigns_filtered_${filterInfo}_${timestamp}.csv`
    : `campaigns_${timestamp}.csv`;

  exportCampaigns(campaigns, format);
}

/**
 * Copy data to clipboard
 */
export async function copyToClipboard(data: any[], format: 'csv' | 'json' = 'csv') {
  try {
    let text: string;

    if (format === 'csv') {
      text = arrayToCSV(data);
    } else {
      text = JSON.stringify(data, null, 2);
    }

    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}
