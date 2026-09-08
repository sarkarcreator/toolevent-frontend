'use client';

import React, { useState } from 'react';
import { useMarket } from '../layout/MarketContext';
import { generateEventChecklist } from '@/lib/calculators';
import { generateCalculatorPDF } from '@/lib/export/pdfGenerator';
import { ChecklistTask } from '@/lib/types';
import {
  CheckSquare,
  Square,
  Plus,
  Trash2,
  FileText,
  Calendar,
  Sparkles,
  Layers,
} from 'lucide-react';

const TIMEFRAME_LABELS: Record<string, string> = {
  '90_days': '90 Days Before',
  '60_days': '60 Days Before',
  '30_days': '30 Days Before',
  '14_days': '14 Days Before',
  '7_days': '7 Days Before',
  '1_day': '1 Day Before',
  'event_day': 'Event Day',
  'post_event': 'Post Event',
};

const DEFAULT_EVENT_DATE = '2026-11-01';

export function ChecklistGenerator() {
  const { country } = useMarket();
  const [eventType, setEventType] = useState<string>('Corporate Conference');
  const [activeTimeframe, setActiveTimeframe] = useState<string>('All');
  const [checklist, setChecklist] = useState<ChecklistTask[]>(() => {
    return generateEventChecklist({
      eventType: 'Corporate Conference',
      eventDate: DEFAULT_EVENT_DATE,
      guestCount: 200,
      country,
    });
  });

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('Planning');

  const handleRegenerate = (type: string) => {
    setEventType(type);
    const tasks = generateEventChecklist({
      eventType: type,
      eventDate: DEFAULT_EVENT_DATE,
      guestCount: 200,
      country,
    });
    setChecklist(tasks);
  };

  const toggleTask = (id: string) => {
    setChecklist((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t))
    );
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask: ChecklistTask = {
      id: `task_${Date.now()}`,
      category: newTaskCategory,
      title: newTaskTitle.trim(),
      timeframe: '30_days',
      isCompleted: false,
      isCustom: true,
    };
    setChecklist((prev) => [newTask, ...prev]);
    setNewTaskTitle('');
  };

  const removeTask = (id: string) => {
    setChecklist((prev) => prev.filter((t) => t.id !== id));
  };

  const completedCount = checklist.filter((t) => t.isCompleted).length;
  const progressPercent = Math.round((completedCount / (checklist.length || 1)) * 100);

  const timeframes = ['All', '90_days', '60_days', '30_days', '14_days', '7_days', '1_day', 'event_day', 'post_event'];
  const filteredTasks = activeTimeframe === 'All' ? checklist : checklist.filter((t) => t.timeframe === activeTimeframe);

  const handleDownloadPDF = () => {
    generateCalculatorPDF({
      toolTitle: `${eventType} Master Event Checklist`,
      country,
      currency: 'USD',
      inputs: {
        eventType,
        totalTasks: checklist.length,
        completedTasks: `${completedCount} (${progressPercent}%)`,
      },
      summaryMetrics: [
        { label: 'Total Tasks', value: `${checklist.length}` },
        { label: 'Completed', value: `${completedCount}` },
        { label: 'Remaining', value: `${checklist.length - completedCount}` },
        { label: 'Progress', value: `${progressPercent}%` },
      ],
      tableData: {
        headers: ['Timeframe', 'Category', 'Task Description', 'Status'],
        rows: checklist.map((t) => [
          TIMEFRAME_LABELS[t.timeframe] || t.timeframe,
          t.category,
          t.title,
          t.isCompleted ? '[DONE]' : '[PENDING]',
        ]),
      },
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-8 border-2 border-[#121212] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-[9px] font-black uppercase tracking-[0.25em] bg-[#121212] text-[#F5F2ED]">
              Operational Roadmap
            </span>
            <span className="text-[10px] uppercase font-bold text-[#D44D26] tracking-wider">
              Interactive Timeline
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#121212] tracking-tight">
            Event Checklist Generator
          </h1>
          <p className="text-xs text-[#121212]/70 font-medium">
            Generate an automated milestone-by-milestone master operational checklist with task tracking and PDF exports.
          </p>
        </div>

        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 px-6 py-3.5 text-[10px] uppercase font-black tracking-widest text-white bg-[#121212] hover:bg-[#D44D26] transition-all shadow-md shrink-0"
        >
          <FileText className="w-4 h-4 text-[#D44D26]" />
          Export Checklist (PDF)
        </button>
      </div>

      {/* Configuration & Progress Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 border-2 border-[#121212] space-y-3">
          <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212]">
            Event Archetype
          </label>
          <div className="grid grid-cols-2 gap-2">
            {['Corporate Conference', 'Luxury Wedding', 'Charity Gala', 'Product Launch'].map((t) => (
              <button
                key={t}
                onClick={() => handleRegenerate(t)}
                className={`py-2 px-2 text-[9px] uppercase font-black tracking-wider border transition-all ${
                  eventType === t
                    ? 'bg-[#121212] text-white border-[#121212]'
                    : 'bg-[#F5F2ED] text-[#121212] border-[#121212]/20 hover:border-[#121212]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 border-2 border-[#121212] space-y-3">
          <label className="block text-[10px] font-black uppercase tracking-widest text-[#121212]">
            Quick Filters
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setActiveTimeframe('All')}
              className={`py-2 px-3 text-[9px] uppercase font-black tracking-wider border transition-all ${
                activeTimeframe === 'All'
                  ? 'bg-[#D44D26] text-white border-[#D44D26]'
                  : 'bg-[#F5F2ED] text-[#121212] border-[#121212]/20'
              }`}
            >
              All Milestones
            </button>
            <button
              onClick={() => setActiveTimeframe('event_day')}
              className={`py-2 px-3 text-[9px] uppercase font-black tracking-wider border transition-all ${
                activeTimeframe === 'event_day'
                  ? 'bg-[#D44D26] text-white border-[#D44D26]'
                  : 'bg-[#F5F2ED] text-[#121212] border-[#121212]/20'
              }`}
            >
              Event Day Only
            </button>
          </div>
        </div>

        <div className="bg-white p-6 border-2 border-[#121212] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-[#121212] mb-2">
              <span>Execution Progress</span>
              <span className="font-serif font-bold text-[#D44D26] text-sm">{progressPercent}%</span>
            </div>
            <div className="w-full bg-[#F5F2ED] border border-[#121212]/20 h-3 overflow-hidden">
              <div
                className="bg-[#D44D26] h-3 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          <p className="text-[10px] uppercase font-bold text-[#121212]/60 mt-2 tracking-wider">
            {completedCount} of {checklist.length} milestones accomplished
          </p>
        </div>
      </div>

      {/* Add Task + Filter Bar */}
      <div className="bg-white p-6 border-2 border-[#121212] space-y-4">
        <form onSubmit={addTask} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Add custom task or reminder..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="flex-1 px-4 py-2.5 text-xs bg-[#F5F2ED] border border-[#121212]/20 focus:bg-white focus:border-[#D44D26] text-[#121212] font-medium outline-none"
          />
          <select
            value={newTaskCategory}
            onChange={(e) => setNewTaskCategory(e.target.value)}
            className="px-3 py-2.5 text-xs bg-[#F5F2ED] border border-[#121212]/20 text-[#121212] font-bold outline-none uppercase tracking-wider"
          >
            <option value="Planning">Planning</option>
            <option value="Venue">Venue</option>
            <option value="Catering">Catering</option>
            <option value="Marketing">Marketing</option>
            <option value="AV & Production">AV & Production</option>
          </select>
          <button
            type="submit"
            className="px-5 py-2.5 text-[10px] uppercase font-black tracking-widest text-white bg-[#121212] hover:bg-[#D44D26] transition-all flex items-center justify-center gap-1.5 shadow-md"
          >
            <Plus className="w-4 h-4 text-[#D44D26]" /> Add Task
          </button>
        </form>

        {/* Timeframe Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#121212]/15">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#121212]/60 mr-1">
            Timeframe:
          </span>
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setActiveTimeframe(tf)}
              className={`px-3 py-1 text-[9px] font-black uppercase tracking-wider border transition-all ${
                activeTimeframe === tf
                  ? 'bg-[#121212] text-white border-[#121212]'
                  : 'bg-[#F5F2ED] text-[#121212] border-[#121212]/20 hover:border-[#121212]'
              }`}
            >
              {tf === 'All' ? 'All' : TIMEFRAME_LABELS[tf] || tf}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleTask(item.id)}
            className={`p-4 border-2 transition-all cursor-pointer flex items-center justify-between gap-4 ${
              item.isCompleted
                ? 'bg-[#F5F2ED]/60 border-[#121212]/20 opacity-60'
                : 'bg-white border-[#121212] hover:border-[#D44D26] shadow-xs'
            }`}
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <button
                type="button"
                className="text-[#D44D26] transition-colors shrink-0"
              >
                {item.isCompleted ? (
                  <CheckSquare className="w-5 h-5 text-[#D44D26]" />
                ) : (
                  <Square className="w-5 h-5 text-[#121212]/40" />
                )}
              </button>
              <div className="min-w-0">
                <p
                  className={`text-xs sm:text-sm font-semibold truncate ${
                    item.isCompleted ? 'line-through text-[#121212]/40' : 'text-[#121212]'
                  }`}
                >
                  {item.title}
                </p>
                <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-[#121212]/50 mt-0.5 tracking-wider">
                  <span>{TIMEFRAME_LABELS[item.timeframe] || item.timeframe}</span>
                  <span>•</span>
                  <span className="text-[#D44D26]">{item.category}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeTask(item.id);
                }}
                className="p-1.5 text-[#121212]/40 hover:text-[#D44D26] hover:bg-[#F5F2ED] transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
