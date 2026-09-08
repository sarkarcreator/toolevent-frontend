'use client';

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { BudgetCalculator } from '@/components/calculators/BudgetCalculator';
import { ProfitCalculator } from '@/components/calculators/ProfitCalculator';
import { TicketCalculator } from '@/components/calculators/TicketCalculator';
import { BreakEvenCalculator } from '@/components/calculators/BreakEvenCalculator';
import { RoiCalculator } from '@/components/calculators/RoiCalculator';
import { WeddingCalculator } from '@/components/calculators/WeddingCalculator';
import { CateringCalculator } from '@/components/calculators/CateringCalculator';
import { StaffingCalculator } from '@/components/calculators/StaffingCalculator';
import { GuestCalculator } from '@/components/calculators/GuestCalculator';
import { ChecklistGenerator } from '@/components/calculators/ChecklistGenerator';

export default function ToolViewerPage() {
  const params = useParams();
  const rawType = (params?.type as string) || '';

  const renderTool = () => {
    switch (rawType) {
      case 'budget-calculator':
      case 'budget':
        return <BudgetCalculator />;

      case 'profit-calculator':
      case 'profit':
        return <ProfitCalculator />;

      case 'ticket-pricing':
      case 'ticket-pricing-calculator':
      case 'ticket':
        return <TicketCalculator />;

      case 'break-even':
      case 'break-even-calculator':
        return <BreakEvenCalculator />;

      case 'event-roi':
      case 'roi-calculator':
      case 'roi':
        return <RoiCalculator />;

      case 'dubai-wedding':
      case 'dubai-wedding-calculator':
        return <WeddingCalculator initialCountry="UAE" />;

      case 'wedding-budget':
      case 'wedding-budget-calculator':
      case 'wedding':
        return <WeddingCalculator />;

      case 'catering':
      case 'catering-calculator':
        return <CateringCalculator />;

      case 'staffing':
      case 'staffing-calculator':
        return <StaffingCalculator />;

      case 'guest-attendance':
      case 'guest-calculator':
      case 'guest':
        return <GuestCalculator />;

      case 'checklist':
      case 'checklist-generator':
        return <ChecklistGenerator />;

      default:
        return (
          <div className="text-center py-16 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Calculator Not Found</h2>
            <p className="text-xs text-slate-500">
              The calculator <code className="text-blue-600 font-mono">{rawType}</code> could not be located.
            </p>
            <Link
              href="/tools"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Tools Directory
            </Link>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 py-4">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-400 font-medium">
        <Link href="/" className="hover:text-slate-600">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/tools" className="hover:text-slate-600">Calculators</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-semibold capitalize">
          {rawType.replace(/-/g, ' ')}
        </span>
      </nav>

      {/* Render Active Tool */}
      {renderTool()}
    </div>
  );
}
