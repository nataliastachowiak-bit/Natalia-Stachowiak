import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, Link as LinkIcon, Trash2, CheckCircle2, RefreshCw, Image as ImageIcon, Loader2 } from 'lucide-react';
import { MediaAssets } from '../types';
import { optimizeImageFile } from '../data/dbStorage';

interface MediaUploadModalProps {
  isOpen: boolean;
  targetKey: string | null;
  mediaAssets: MediaAssets;
  onClose: () => void;
  onSaveAsset: (key: string, value: string) => void;
  onResetAssets: () => void;
}

const ASSET_LABELS: Record<string, string> = {
  heroPortrait: 'Hero-Porträt (Natalia)',
  aboutPortrait: 'Porträt mit französischer Bulldogge',
  gainImage: 'GAIN — Netflix Innovation Screenshot',
  gainAppUrl: 'GAIN: Web-App / Prototyp Link (URL)',
  streetLifeImage: 'street.life / FanPulse Projektbild',
  streetLifeAppUrl: 'street.life / FanPulse: Web-App / Prototyp Link (URL)',
  streetLifeVideoUrl: 'street.life / FanPulse: Konzeptvideo (URL/MP4)',
  vinylImage: 'Vinyl — AI Event Support Screenshot',
  vinylAppUrl: 'Vinyl: Web-App / Prototyp Link (URL)',
  dineEaseImage: 'Dine-Ease Screenshot',
  dineEaseAppUrl: 'Dine-Ease: Web-App / Prototyp Link (URL)',
  bookCover: 'Original Buchcover „Du bist nicht zu viel“',
  duBistNichtZuVielUrl: 'Du bist nicht zu viel: Instagram / Shop Link (URL)',
  instagramQr: 'Original Instagram QR-Code (@frau_en_power2026)',
  cvPdfUrl: 'Curriculum Vitae (PDF)',
};

export const MediaUploadModal: React.FC<MediaUploadModalProps> = ({
  isOpen,
  targetKey,
  mediaAssets,
  onClose,
  onSaveAsset,
  onResetAssets,
}) => {
  const [selectedKey, setSelectedKey] = useState<string>(targetKey || 'heroPortrait');
  const [urlInput, setUrlInput] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (targetKey) {
      setSelectedKey(targetKey);
      const val = mediaAssets[targetKey as keyof MediaAssets] || '';
      if (typeof val === 'string' && (val.startsWith('http') || val.startsWith('mailto:'))) {
        setUrlInput(val);
      } else {
        setUrlInput('');
      }
    }
  }, [targetKey, isOpen, mediaAssets]);

  if (!isOpen) return null;

  const currentLabel = ASSET_LABELS[selectedKey] || selectedKey;
  const currentVal = mediaAssets[selectedKey as keyof MediaAssets];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    try {
      // Compress and optimize image to safe web dimensions (~200KB)
      const optimizedDataUrl = await optimizeImageFile(file, 1600, 0.85);
      onSaveAsset(selectedKey, optimizedDataUrl);
      setSuccessMsg(`„${currentLabel}“ erfolgreich optimiert und gespeichert!`);
      setTimeout(() => setSuccessMsg(null), 3500);
    } catch (err) {
      console.error('File optimization error:', err);
      // Fallback to basic file reader
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        onSaveAsset(selectedKey, result);
        setSuccessMsg(`„${currentLabel}“ gespeichert!`);
        setTimeout(() => setSuccessMsg(null), 3500);
      };
      reader.readAsDataURL(file);
    } finally {
      setIsProcessing(false);
      // Reset input value so same file can be chosen again if desired
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    onSaveAsset(selectedKey, urlInput.trim());
    setUrlInput('');
    setSuccessMsg(`„${currentLabel}“ erfolgreich aktualisiert!`);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleRemove = () => {
    onSaveAsset(selectedKey, '');
    setSuccessMsg(`„${currentLabel}“ auf Platzhalter zurückgesetzt.`);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/85 p-4 backdrop-blur-md animate-fadeIn">
      <div className="relative my-8 w-full max-w-2xl overflow-hidden rounded-2xl border border-[#C9A66B]/50 bg-[#080B09] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.95)] sm:p-8">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#C9A66B]/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#C9A66B] bg-[#063F35]/40 text-[#C9A66B]">
              <ImageIcon className="h-5 w-5" />
            </div>
            <div>
              <span className="font-sans text-xs font-semibold tracking-widest text-[#C9A66B] uppercase">
                MEDIEN- & ASSET-VERWALTUNG
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#F5F1E8]">
                Bilder & Dokumente hochladen
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

        {/* Notification banner */}
        {successMsg && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-[#148B78] bg-[#063F35]/40 p-3 text-xs text-[#F5F1E8]">
            <CheckCircle2 className="h-4 w-4 text-[#148B78] shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <div className="mt-6 space-y-6">
          {/* Target Asset Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#C9A66B] mb-2">
              Zu bearbeitendes Element auswählen:
            </label>
            <select
              value={selectedKey}
              onChange={(e) => setSelectedKey(e.target.value)}
              className="w-full rounded-xl border border-[#C9A66B]/40 bg-[#080B09] px-4 py-2.5 text-xs text-[#F5F1E8] focus:border-[#C9A66B] focus:outline-none"
            >
              {Object.entries(ASSET_LABELS).map(([k, label]) => (
                <option key={k} value={k} className="bg-[#080B09] text-white">
                  {label} {mediaAssets[k as keyof MediaAssets] ? '✓ (Vorhanden)' : '○ (Platzhalter)'}
                </option>
              ))}
            </select>
          </div>

          {/* Current State Preview */}
          <div className="rounded-xl border border-[#0B5A4D]/40 bg-[#063F35]/15 p-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-[#F5F1E8]">{currentLabel}</span>
                <p className="text-[11px] text-[#B9C4BD]">
                  Status: {currentVal ? 'Eigenes Dokument aktiv' : 'Eleganter Platzhalter aktiv'}
                </p>
              </div>

              {currentVal && (
                <button
                  type="button"
                  onClick={handleRemove}
                  className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Auf Platzhalter zurücksetzen</span>
                </button>
              )}
            </div>

            {currentVal && (
              <div className="mt-3 overflow-hidden rounded-lg border border-[#C9A66B]/30 max-h-36 flex items-center justify-center bg-black/40">
                <img
                  src={currentVal}
                  alt="Vorschau"
                  className="h-full max-h-36 object-contain"
                />
              </div>
            )}
          </div>

          {/* Upload Method 1: Local File Drag/Pick */}
          <div>
            <span className="text-xs font-bold text-[#F5F1E8] uppercase tracking-wider">
              Methode 1: Lokale Datei hochladen (Bild / PDF / Video)
            </span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*,application/pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              type="button"
              disabled={isProcessing}
              onClick={() => fileInputRef.current?.click()}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#C9A66B] bg-[#063F35]/25 py-4 text-xs font-semibold text-[#C9A66B] hover:bg-[#063F35]/40 disabled:opacity-60 disabled:cursor-wait transition-all"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-[#C9A66B]" />
                  <span>Wird optimiert & gespeichert...</span>
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  <span>Datei auswählen oder hierher ziehen (Automatisch optimiert)</span>
                </>
              )}
            </button>
          </div>

          {/* Upload Method 2: Paste Public URL */}
          <div>
            <span className="text-xs font-bold text-[#F5F1E8] uppercase tracking-wider">
              Methode 2: Web-URL einfügen
            </span>
            <form onSubmit={handleUrlSubmit} className="mt-2 flex gap-2">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://meine-domain.de/bild.jpg"
                className="flex-1 rounded-xl border border-[#C9A66B]/40 bg-[#080B09] px-4 py-2.5 text-xs text-[#F5F1E8] placeholder-[#B9C4BD]/40 focus:border-[#C9A66B] focus:outline-none"
              />
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-xl border border-[#C9A66B] bg-[#0B5A4D] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#148B78]"
              >
                <LinkIcon className="h-3.5 w-3.5" />
                <span>Speichern</span>
              </button>
            </form>
          </div>

          {/* Reset All Trigger */}
          <div className="border-t border-[#C9A66B]/20 pt-4 flex justify-between items-center">
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Möchten Sie wirklich alle Medien auf die Standard-Platzhalter zurücksetzen?')) {
                  onResetAssets();
                  setSuccessMsg('Alle Assets wurden auf Standard-Platzhalter zurückgesetzt.');
                }
              }}
              className="flex items-center gap-1.5 text-xs text-[#B9C4BD] hover:text-[#C9A66B]"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Alle Assets auf Platzhalter zurücksetzen</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-[#C9A66B] bg-[#0B5A4D] px-6 py-2 text-xs font-semibold tracking-wider text-white hover:bg-[#148B78] uppercase"
            >
              Fertig
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
