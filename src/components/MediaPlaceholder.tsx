import React from 'react';
import { Upload, Image as ImageIcon, Disc, BookOpen, QrCode } from 'lucide-react';

interface MediaPlaceholderProps {
  label: string;
  mediaKey: string;
  currentSrc?: string;
  aspectRatio?: string;
  className?: string;
  type?: 'heroPortrait' | 'aboutPortrait' | 'gain' | 'streetLife' | 'vinyl' | 'dineEase' | 'bookCover' | 'instagramQr' | 'generic';
  onUploadClick?: (key: string) => void;
  showHoverButton?: boolean;
}

export const MediaPlaceholder: React.FC<MediaPlaceholderProps> = ({
  label,
  mediaKey,
  currentSrc,
  aspectRatio = 'aspect-4/3',
  className = '',
  type = 'generic',
  onUploadClick,
  showHoverButton = true,
}) => {
  if (currentSrc) {
    return (
      <div
        className={`group relative overflow-hidden rounded-xl border border-[#C9A66B]/30 bg-[#063F35]/20 ${aspectRatio} ${className}`}
      >
        <img
          src={currentSrc}
          alt={label}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {showHoverButton && onUploadClick && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onUploadClick(mediaKey);
            }}
            className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-[#080B09]/90 px-3 py-1.5 text-xs font-medium text-[#C9A66B] shadow-lg backdrop-blur-md opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:bg-[#0B5A4D] hover:text-white"
          >
            <Upload className="h-3.5 w-3.5" />
            <span>Ersetzen</span>
          </button>
        )}
      </div>
    );
  }

  // Visual placeholder archetypes matching the reference aesthetic
  return (
    <div
      onClick={() => onUploadClick?.(mediaKey)}
      className={`group relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-[#C9A66B]/40 bg-gradient-to-b from-[#080B09] via-[#063F35]/25 to-[#080B09] p-4 text-center transition-all duration-300 hover:border-[#C9A66B] hover:shadow-[0_0_25px_rgba(11,90,77,0.4)] ${aspectRatio} ${className}`}
    >
      {/* Background Graphic Hints based on type */}
      {type === 'heroPortrait' && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-25">
          <div className="h-64 w-64 rounded-full bg-[#0B5A4D]/40 blur-3xl" />
        </div>
      )}

      {type === 'vinyl' && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-20 transition-transform duration-700 group-hover:rotate-45">
          <div className="flex h-36 w-36 items-center justify-center rounded-full border border-[#C9A66B]/40 bg-black">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#0B5A4D] bg-[#063F35]/60">
              <div className="h-4 w-4 rounded-full bg-[#C9A66B]" />
            </div>
          </div>
        </div>
      )}

      {type === 'gain' && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-15">
          <span className="font-serif text-6xl font-bold tracking-wider text-red-600">N</span>
        </div>
      )}

      {type === 'bookCover' && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-20">
          <BookOpen className="h-24 w-24 text-[#C9A66B]" />
        </div>
      )}

      {type === 'instagramQr' && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-20">
          <QrCode className="h-20 w-20 text-[#C9A66B]" />
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center gap-2.5 px-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C9A66B]/50 bg-[#0B5A4D]/30 text-[#C9A66B] transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#0B5A4D] group-hover:text-white">
          {type === 'vinyl' ? (
            <Disc className="h-5 w-5" />
          ) : type === 'bookCover' ? (
            <BookOpen className="h-5 w-5" />
          ) : type === 'instagramQr' ? (
            <QrCode className="h-5 w-5" />
          ) : (
            <Upload className="h-5 w-5" />
          )}
        </div>

        <span className="font-sans text-[11px] font-semibold tracking-wider text-[#F5F1E8] uppercase drop-shadow-sm">
          {label}
        </span>

        <span className="text-[10px] text-[#B9C4BD]/80 transition-colors group-hover:text-[#C9A66B]">
          Hier klicken zum Hochladen
        </span>
      </div>
    </div>
  );
};
