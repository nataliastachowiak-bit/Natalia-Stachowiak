import React from 'react';
import { X, Play, Upload, Film } from 'lucide-react';
import { MediaAssets } from '../types';

interface VideoPlayerModalProps {
  isOpen: boolean;
  mediaAssets: MediaAssets;
  onClose: () => void;
  onUploadMedia: (key: string) => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  isOpen,
  mediaAssets,
  onClose,
  onUploadMedia,
}) => {
  if (!isOpen) return null;

  const videoUrl = mediaAssets.streetLifeVideoUrl;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/90 p-4 backdrop-blur-md animate-fadeIn">
      <div className="relative my-8 w-full max-w-3xl overflow-hidden rounded-2xl border border-[#C9A66B]/50 bg-[#080B09] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.95)] sm:p-8">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#C9A66B]/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#C9A66B] bg-[#063F35]/40 text-[#C9A66B]">
              <Film className="h-5 w-5" />
            </div>
            <div>
              <span className="font-sans text-xs font-semibold tracking-widest text-[#C9A66B] uppercase">
                STREET.LIFE / FANPULSE
              </span>
              <h3 className="font-serif text-xl font-semibold text-[#F5F1E8]">
                Konzept & Case Study Video
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[#C9A66B]/30 p-1.5 text-[#B9C4BD] transition-colors hover:border-[#C9A66B] hover:bg-[#063F35] hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Video Area */}
        <div className="mt-6">
          {videoUrl ? (
            <div className="aspect-video w-full overflow-hidden rounded-xl bg-black border border-[#0B5A4D]">
              <video
                src={videoUrl}
                controls
                autoPlay
                className="h-full w-full object-contain"
              >
                Dein Browser unterstützt das Video-Tag leider nicht.
              </video>
            </div>
          ) : (
            <div
              onClick={() => onUploadMedia('streetLifeVideoUrl')}
              className="flex aspect-video w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#C9A66B]/50 bg-gradient-to-b from-[#063F35]/30 to-[#080B09] p-8 text-center transition-all hover:bg-[#063F35]/40"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#C9A66B] bg-[#0B5A4D]/40 text-[#C9A66B] shadow-[0_0_15px_rgba(201,166,107,0.3)]">
                <Play className="h-6 w-6 ml-0.5" />
              </div>
              <p className="font-sans text-xs font-bold tracking-widest text-[#F5F1E8] uppercase">
                PROJEKT-VIDEO HIER HOCHLADEN ODER VERLINKEN
              </p>
              <p className="mt-2 text-xs text-[#B9C4BD]">
                MP4-Datei oder Video-URL für street.life / FanPulse hinterlegen
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-between border-t border-[#C9A66B]/20 pt-4">
          <button
            type="button"
            onClick={() => onUploadMedia('streetLifeVideoUrl')}
            className="flex items-center gap-1.5 text-xs text-[#C9A66B] hover:underline"
          >
            <Upload className="h-3.5 w-3.5" />
            <span>{videoUrl ? 'Anderes Video hochladen' : 'Video hochladen'}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[#C9A66B] bg-[#0B5A4D] px-6 py-2 text-xs font-semibold tracking-wider text-white hover:bg-[#148B78] uppercase"
          >
            Schließen
          </button>
        </div>

      </div>
    </div>
  );
};
