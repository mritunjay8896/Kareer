import { AccentColor, FontId, SpacingId } from '../types/resume';

export function getFontFamilyClass(font: FontId): string {
  switch (font) {
    case 'Georgia':
      return 'font-serif';
    case 'Arial':
      return 'font-[Arial,Helvetica,sans-serif]';
    case 'Roboto':
      return 'font-[Roboto,sans-serif]';
    case 'Inter':
    default:
      return 'font-sans';
  }
}

export function getAccentClasses(accent: AccentColor) {
  switch (accent) {
    case 'blue':
      return {
        text: 'text-blue-600',
        bg: 'bg-blue-600',
        border: 'border-blue-600',
        subtleBg: 'bg-blue-50',
        hex: '#2563eb',
      };
    case 'green':
      return {
        text: 'text-emerald-800',
        bg: 'bg-emerald-850',
        border: 'border-emerald-800',
        subtleBg: 'bg-emerald-50',
        hex: '#065f46',
      };
    case 'black':
      return {
        text: 'text-slate-950',
        bg: 'bg-slate-950',
        border: 'border-slate-950',
        subtleBg: 'bg-slate-100',
        hex: '#020617',
      };
    case 'navy':
    default:
      return {
        text: 'text-blue-950',
        bg: 'bg-blue-950',
        border: 'border-blue-950',
        subtleBg: 'bg-slate-100',
        hex: '#0f172a',
      };
  }
}

export function getSpacingClasses(spacing: SpacingId) {
  switch (spacing) {
    case 'Compact':
      return {
        sectionGap: 'mb-3',
        itemGap: 'space-y-1',
        headerPad: 'pb-2 mb-2',
        bodyText: 'text-[12px] leading-[1.35]',
        headingText: 'text-sm font-bold tracking-tight',
        subText: 'text-[11px]',
      };
    case 'Comfortable':
      return {
        sectionGap: 'mb-5',
        itemGap: 'space-y-2.5',
        headerPad: 'pb-4 mb-4',
        bodyText: 'text-[13.5px] leading-[1.55]',
        headingText: 'text-base font-bold tracking-normal',
        subText: 'text-[12px]',
      };
    case 'Standard':
    default:
      return {
        sectionGap: 'mb-4',
        itemGap: 'space-y-1.5',
        headerPad: 'pb-3 mb-3',
        bodyText: 'text-[13px] leading-[1.45]',
        headingText: 'text-[15px] font-bold tracking-tight',
        subText: 'text-[11.5px]',
      };
  }
}
