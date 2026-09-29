import React, { useRef, useState, useEffect } from 'react';
import { ResumeData } from '../../types/resume';
import { TemplateRenderer } from '../../templates/TemplateRenderer';
import { ZoomIn, ZoomOut, RotateCcw, Maximize2, AlertCircle } from 'lucide-react';

interface Props {
  data: ResumeData;
  onPageCountChange?: (count: number) => void;
}

export const ResumePreview: React.FC<Props> = ({ data, onPageCountChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState<number>(0.9);
  const [pageCount, setPageCount] = useState<number>(1);

  // Monitor physical rendered height relative to standard A4 (approx 1122px at 96 DPI / 297mm)
  useEffect(() => {
    if (!paperRef.current) return;
    const observer = new ResizeObserver(() => {
      if (paperRef.current) {
        const height = paperRef.current.scrollHeight;
        // Standard A4 pixel height in web layout is ~1050-1120px
        const estimatedPages = Math.max(1, Math.ceil(height / 1060));
        setPageCount(estimatedPages);
        if (onPageCountChange) {
          onPageCountChange(estimatedPages);
        }
      }
    });

    observer.observe(paperRef.current);
    return () => observer.disconnect();
  }, [data, onPageCountChange]);

  const handleZoom = (delta: number) => {
    setZoom((prev) => Math.min(1.4, Math.max(0.5, +(prev + delta).toFixed(1))));
  };

  return (
    <div className="flex flex-col h-full bg-slate-200/70 relative">
      {/* Preview Top Controls */}
      <div className="bg-white/90 backdrop-blur-xs border-b border-slate-200 px-4 py-2 flex items-center justify-between z-10 print:hidden shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Live Preview
          </span>
          <span
            className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
              pageCount === 1
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-amber-50 text-amber-800 border-amber-200'
            }`}
          >
            {pageCount === 1 ? '1 Page (Optimal for ATS)' : `${pageCount} Pages`}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-600">
          <button
            type="button"
            onClick={() => handleZoom(-0.1)}
            className="p-1.5 rounded-md hover:bg-slate-100 transition"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="font-mono text-[11px] w-12 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            onClick={() => handleZoom(0.1)}
            className="p-1.5 rounded-md hover:bg-slate-100 transition"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setZoom(0.9)}
            className="p-1.5 rounded-md hover:bg-slate-100 transition"
            title="Reset Zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {pageCount > 1 && (
        <div className="px-4 py-1.5 bg-amber-50 border-b border-amber-200 text-amber-900 text-[11px] flex items-center gap-2 print:hidden">
          <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>
            Tip: Your resume spans into <strong>page 2</strong>. For students and junior developers, 1 page is strongly recommended. Try switching Spacing to <em>Compact</em> or reducing bullet points.
          </span>
        </div>
      )}

      {/* Sheet Container with Zoom Transformation */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start print:p-0 print:m-0 print:overflow-visible"
      >
        <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out',
          }}
          className="print:transform-none"
        >
          {/* A4 Paper Dimensions: standard 794px width (approx 210mm at 96 DPI) */}
          <div
            id="glitread-resume-canvas"
            ref={paperRef}
            className="w-[794px] min-h-[1122px] bg-white shadow-xl border border-slate-300 print:shadow-none print:border-none print:w-full print:min-h-0 print:m-0"
          >
            <TemplateRenderer data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};
