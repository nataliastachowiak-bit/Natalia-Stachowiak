import React, { useState, useEffect } from 'react';
import { X, Link as LinkIcon, ExternalLink, Trash2, CheckCircle2, Globe } from 'lucide-react';
import { ProjectData, Language, MediaAssets } from '../types';
import { getProjectLinkKey, getProjectUrl } from '../data/mediaConfig';

interface ProjectLinkModalProps {
  project: ProjectData | null;
  isOpen: boolean;
  currentLang: Language;
  mediaAssets: MediaAssets;
  onClose: () => void;
  onSaveLink: (key: string, url: string) => void;
}

export const ProjectLinkModal: React.FC<ProjectLinkModalProps> = ({
  project,
  isOpen,
  currentLang,
  mediaAssets,
  onClose,
  onSaveLink,
}) => {
  if (!isOpen || !project) return null;

  const linkKey = getProjectLinkKey(project.id);
  const activeUrl = getProjectUrl(project.id, mediaAssets);

  const [inputUrl, setInputUrl] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    setInputUrl(activeUrl || '');
  }, [project.id, activeUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let cleaned = inputUrl.trim();
    if (cleaned && !/^https?:\/\//i.test(cleaned)) {
      cleaned = 'https://' + cleaned;
    }

    onSaveLink(linkKey, cleaned);
    setSuccessMsg(
      currentLang === 'pl'
        ? 'Link do projektu został pomyślnie zaktualizowany!'
        : currentLang === 'en'
        ? 'Project link successfully updated!'
        : 'Projekt-Link wurde erfolgreich aktualisiert!'
    );

    setTimeout(() => {
      setSuccessMsg(null);
      onClose();
    }, 1200);
  };

  const handleRemove = () => {
    onSaveLink(linkKey, '');
    setInputUrl('');
    setSuccessMsg(
      currentLang === 'pl'
        ? 'Link został usunięty.'
        : currentLang === 'en'
        ? 'Link removed.'
        : 'Link wurde entfernt.'
    );
    setTimeout(() => {
      setSuccessMsg(null);
      onClose();
    }, 1200);
  };

  const labels = {
    de: {
      tag: 'PROJEKT-VERLINKUNG',
      title: 'Projekt-Link hinzufügen / bearbeiten',
      subtitle: `Hinterlege die Web-App, den Prototyp oder die Landingpage für ${project.name}`,
      inputLabel: 'Live-URL / Prototyp Link eingeben:',
      placeholder: 'https://meine-app.de oder https://figma.com/...',
      testLink: 'Link testen',
      save: 'Link speichern',
      remove: 'Link entfernen',
      cancel: 'Abbrechen',
      currentActive: 'Aktuell verlinkt:',
      noLinkYet: 'Noch kein Link hinterlegt',
    },
    en: {
      tag: 'PROJECT LINK',
      title: 'Add / Edit Project Link',
      subtitle: `Connect live app, interactive prototype, or case study for ${project.name}`,
      inputLabel: 'Enter Live URL / Prototype link:',
      placeholder: 'https://my-app.com or https://figma.com/...',
      testLink: 'Test link',
      save: 'Save link',
      remove: 'Remove link',
      cancel: 'Cancel',
      currentActive: 'Currently linked:',
      noLinkYet: 'No link set yet',
    },
    pl: {
      tag: 'LINK DO PROJEKTU',
      title: 'Dodaj / edytuj link do projektu',
      subtitle: `Podłącz aplikację na żywo, prototyp lub landing page dla ${project.name}`,
      inputLabel: 'Wprowadź adres URL aplikacji lub prototypu:',
      placeholder: 'https://moja-aplikacja.pl lub https://figma.com/...',
      testLink: 'Przetestuj link',
      save: 'Zapisz link',
      remove: 'Usuń link',
      cancel: 'Anuluj',
      currentActive: 'Aktualny link:',
      noLinkYet: 'Brak aktywnego linku',
    },
  };

  const t = labels[currentLang] || labels.de;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/85 p-4 backdrop-blur-md animate-fadeIn">
      <div className="relative my-8 w-full max-w-lg overflow-hidden rounded-2xl border border-[#C9A66B]/60 bg-[#080B09] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.95)] sm:p-8">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#C9A66B]/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#C9A66B] bg-[#063F35]/50 text-[#C9A66B] shadow-[0_0_15px_rgba(201,166,107,0.25)]">
              <LinkIcon className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-sans text-[11px] font-bold tracking-widest text-[#C9A66B] uppercase">
                  {t.tag}
                </span>
                <span className="rounded bg-[#0B5A4D] px-1.5 py-0.2 text-[10px] font-bold text-white">
                  #{project.number}
                </span>
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#F5F1E8]">
                {project.name}
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

        {/* Success Banner */}
        {successMsg && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#148B78] bg-[#063F35]/50 p-3 text-xs text-[#F5F1E8]">
            <CheckCircle2 className="h-4 w-4 text-[#148B78] shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <p className="text-xs text-[#B9C4BD] leading-relaxed">
            {t.subtitle}
          </p>

          {/* Current URL preview badge */}
          <div className="rounded-xl border border-[#0B5A4D]/40 bg-[#063F35]/20 p-3.5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 overflow-hidden pr-2">
              <Globe className="h-4 w-4 text-[#C9A66B] shrink-0" />
              <div className="truncate">
                <span className="text-[#B9C4BD] text-[11px] block">{t.currentActive}</span>
                <span className="font-mono text-xs text-[#F5F1E8] truncate">
                  {activeUrl ? activeUrl : <span className="italic text-[#B9C4BD]/60">{t.noLinkYet}</span>}
                </span>
              </div>
            </div>

            {activeUrl && (
              <a
                href={activeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 flex items-center gap-1 rounded-lg border border-[#C9A66B]/40 bg-[#080B09] px-2.5 py-1 text-[11px] text-[#C9A66B] hover:bg-[#063F35] hover:text-white"
              >
                <span>{t.testLink}</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>

          {/* Input field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#C9A66B] mb-1.5">
              {t.inputLabel}
            </label>
            <div className="relative">
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder={t.placeholder}
                className="w-full rounded-xl border border-[#C9A66B]/40 bg-[#080B09] px-4 py-2.5 text-xs text-[#F5F1E8] placeholder-[#B9C4BD]/40 focus:border-[#C9A66B] focus:outline-none focus:ring-1 focus:ring-[#C9A66B]"
                autoFocus
              />
            </div>
            <p className="mt-1 text-[11px] text-[#B9C4BD]/70">
              Beispiele: Figma-Prototyp-Link, Vercel/Base44 Web-App, GitHub Repository oder Notion Case Study.
            </p>
          </div>

          {/* Action buttons */}
          <div className="border-t border-[#C9A66B]/20 pt-4 flex items-center justify-between">
            {activeUrl ? (
              <button
                type="button"
                onClick={handleRemove}
                className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>{t.remove}</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-[#C9A66B]/30 px-4 py-2 text-xs font-semibold text-[#B9C4BD] hover:bg-[#063F35]/40 hover:text-white"
              >
                {t.cancel}
              </button>

              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-full border border-[#C9A66B] bg-[#0B5A4D] px-6 py-2 text-xs font-semibold tracking-wider text-white shadow-lg hover:bg-[#148B78] uppercase"
              >
                <LinkIcon className="h-3.5 w-3.5" />
                <span>{t.save}</span>
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};
