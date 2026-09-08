import * as XLSX from 'xlsx';
import { SupportedCountry, SupportedCurrency } from '../types';

export interface ExcelExportData {
  toolTitle: string;
  country: SupportedCountry;
  currency: SupportedCurrency;
  inputs: Record<string, any>;
  summaryMetrics: { label: string; value: string | number }[];
  breakdownRows?: { category: string; amount: number; percentage?: number; notes?: string }[];
}

export function generateCalculatorExcel(data: ExcelExportData): void {
  const wb = XLSX.utils.book_new();

  // 1. Sheet: Summary
  const summaryData = [
    ['TOOLBOX.EVENTS — OFFICIAL CALCULATION REPORT'],
    ['Tool Name', data.toolTitle],
    ['Target Market', data.country],
    ['Currency', data.currency],
    ['Generated At', new Date().toISOString()],
    [],
    ['KEY PERFORMANCE METRICS'],
    ['Metric', 'Value'],
    ...data.summaryMetrics.map((m) => [m.label, m.value]),
    [],
    ['DISCLAIMER'],
    [
      'Toolbox.Events provides estimates for planning purposes only. Actual event costs vary by location, vendor, date, guest count, taxes, service fees and other factors.',
    ],
  ];
  const summaryWs = XLSX.utils.aoa_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(wb, summaryWs, 'Executive Summary');

  // 2. Sheet: Input Assumptions
  const inputEntries = Object.entries(data.inputs).map(([key, val]) => [
    key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()),
    val,
  ]);
  const inputsData = [
    ['INPUT PARAMETERS & ASSUMPTIONS'],
    ['Parameter', 'Assigned Value'],
    ...inputEntries,
  ];
  const inputsWs = XLSX.utils.aoa_to_sheet(inputsData);
  XLSX.utils.book_append_sheet(wb, inputsWs, 'Inputs');

  // 3. Sheet: Breakdown & Line Items
  if (data.breakdownRows && data.breakdownRows.length > 0) {
    const breakdownData = [
      ['BUDGET ALLOCATION & BREAKDOWN'],
      ['Category', `Amount (${data.currency})`, 'Percentage (%)', 'Notes'],
      ...data.breakdownRows.map((r) => [
        r.category,
        r.amount,
        r.percentage !== undefined ? `${r.percentage}%` : '',
        r.notes || '',
      ]),
    ];
    const breakdownWs = XLSX.utils.aoa_to_sheet(breakdownData);
    XLSX.utils.book_append_sheet(wb, breakdownWs, 'Breakdown');
  }

  // Trigger file download
  const filename = `${data.toolTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}.xlsx`;
  XLSX.writeFile(wb, filename);
}
