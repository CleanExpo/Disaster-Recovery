'use client';

import { useRef } from 'react';
import { CheckCircle2, Upload, X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { ALLOWED_IMAGE_TYPES, MAX_FILE_BYTES } from './types';

export interface FileUploadSlotProps {
  label: string;
  hint: string;
  fileName: string;
  onFileSelected: (name: string, dataUrl: string) => void;
  onFileRemoved: () => void;
  onError: (msg: string) => void;
}

export function FileUploadSlot({
  label,
  hint,
  fileName,
  onFileSelected,
  onFileRemoved,
  onError,
}: FileUploadSlotProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      onError(`${label}: upload a JPG, PNG, WEBP, HEIC or PDF file.`);
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      onError(`${label}: file must be under 10 MB.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      onFileSelected(file.name, ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-1.5">
      <Label className="text-slate-300 text-xs">
        {label}
        <span className="text-slate-500 ml-1">({hint})</span>
      </Label>

      {fileName ? (
        <div className="flex items-center gap-2 p-3 bg-emerald-900/30 border border-emerald-600/40 rounded-lg text-sm text-emerald-300">
          <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
          <span className="truncate flex-1 text-xs">{fileName}</span>
          <button
            type="button"
            onClick={() => {
              onFileRemoved();
              if (inputRef.current) inputRef.current.value = '';
            }}
            className="text-emerald-400 hover:text-red-400 transition-colors"
            aria-label="Remove file"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full border-2 border-dashed border-slate-600 hover:border-blue-500 rounded-lg p-4 text-center transition-colors group"
        >
          <Upload className="h-5 w-5 text-slate-500 group-hover:text-blue-400 mx-auto mb-1.5 transition-colors" />
          <p className="text-slate-400 text-xs group-hover:text-slate-300 transition-colors">
            Click to upload
          </p>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/heic,image/heif,application/pdf"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
