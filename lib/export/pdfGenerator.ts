import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { SupportedCountry, SupportedCurrency } from '../types';
import { formatCurrency } from '../market';

export interface PDFExportData {
  toolTitle: string;
  country: SupportedCountry;
  currency: SupportedCurrency;
  inputs: Record<string, any>;
  summaryMetrics: { label: string; value: string | number }[];
  tableData?: { headers: string[]; rows: (string | number)[][] };
  notes?: string;
}

export function generateCalculatorPDF(data: PDFExportData): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Header Banner
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 28, 'F');

  // Brand Name
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Toolbox.Events', 14, 13);

  // Tagline
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(203, 213, 225);
  doc.text('Free Tools for Planning Better Events • Calculate. Plan. Budget. Profit. Launch.', 14, 20);

  // Date & Market Badge on Right
  const dateStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  doc.text(`Market: ${data.country} (${data.currency}) | Date: ${dateStr}`, pageWidth - 14, 16, {
    align: 'right',
  });

  // Report Title
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(data.toolTitle, 14, 40);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('Official Event Planning Calculation Report generated via toolbox.events', 14, 46);

  // Summary Key Metrics Cards
  let yPos = 53;
  if (data.summaryMetrics && data.summaryMetrics.length > 0) {
    const cardWidth = (pageWidth - 28 - (data.summaryMetrics.length - 1) * 4) / Math.min(4, data.summaryMetrics.length);
    const cardHeight = 18;

    data.summaryMetrics.slice(0, 4).forEach((metric, index) => {
      const xPos = 14 + index * (cardWidth + 4);
      
      // Card border and bg
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(xPos, yPos, cardWidth, cardHeight, 2, 2, 'FD');

      // Metric Label
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(100, 116, 139);
      doc.text(String(metric.label).toUpperCase(), xPos + 4, yPos + 6);

      // Metric Value
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      doc.text(String(metric.value), xPos + 4, yPos + 13);
    });

    yPos += cardHeight + 8;
  }

  // Detailed Table Data
  if (data.tableData && data.tableData.rows.length > 0) {
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text('Breakdown & Cost Allocation', 14, yPos);
    yPos += 3;

    autoTable(doc, {
      startY: yPos,
      head: [data.tableData.headers],
      body: data.tableData.rows,
      theme: 'striped',
      headStyles: {
        fillColor: [30, 41, 59],
        textColor: [255, 255, 255],
        fontSize: 8.5,
        fontStyle: 'bold',
      },
      bodyStyles: {
        fontSize: 8,
        textColor: [30, 41, 59],
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252],
      },
      margin: { left: 14, right: 14 },
    });

    // @ts-ignore
    yPos = (doc as any).lastAutoTable?.finalY + 8 || yPos + 60;
  }

  // Key Inputs Section
  if (data.inputs && Object.keys(data.inputs).length > 0 && yPos < pageHeight - 40) {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text('Key Input Assumptions', 14, yPos);
    yPos += 5;

    const inputEntries = Object.entries(data.inputs).filter(([_, v]) => v !== undefined && v !== null && v !== '');
    const half = Math.ceil(inputEntries.length / 2);
    const col1 = inputEntries.slice(0, half);
    const col2 = inputEntries.slice(half);

    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);

    col1.forEach(([k, v], idx) => {
      const formattedKey = k.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
      const valStr = typeof v === 'number' ? formatCurrency(v, data.currency, data.country) : String(v);
      doc.text(`• ${formattedKey}: ${valStr}`, 14, yPos + idx * 4.5);
    });

    col2.forEach(([k, v], idx) => {
      const formattedKey = k.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
      const valStr = typeof v === 'number' ? formatCurrency(v, data.currency, data.country) : String(v);
      doc.text(`• ${formattedKey}: ${valStr}`, pageWidth / 2 + 5, yPos + idx * 4.5);
    });
  }

  // Footer Disclaimer
  doc.setFontSize(7);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(148, 163, 184);
  const disclaimer =
    'Disclaimer: Toolbox.Events provides estimates for planning purposes only. Actual event costs vary by location, vendor, date, guest count, taxes, service fees, and other factors.';
  doc.text(disclaimer, 14, pageHeight - 10, { maxWidth: pageWidth - 28 });

  // Save the PDF
  const filename = `${data.toolTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-report-${Date.now()}.pdf`;
  doc.save(filename);
}
