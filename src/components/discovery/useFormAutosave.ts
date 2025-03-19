
import { useState, useRef, useCallback, useEffect } from 'react';

interface UseFormAutosaveProps {
  formData: Record<string, string>;
  interval?: number;
}

interface UseFormAutosaveReturn {
  lastSaved: Date | null;
  saveFormData: () => void;
  renderLastSavedText: () => React.ReactNode | null;
}

const useFormAutosave = ({ formData, interval = 30000 }: UseFormAutosaveProps): UseFormAutosaveReturn => {
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const autoSaveTimerRef = useRef<number | null>(null);

  const saveFormData = useCallback(() => {
    localStorage.setItem('discoveryFormData', JSON.stringify(formData));
    setLastSaved(new Date());
    console.log('Form data autosaved', new Date().toLocaleTimeString());
  }, [formData]);

  useEffect(() => {
    if (autoSaveTimerRef.current) {
      window.clearInterval(autoSaveTimerRef.current);
    }
    autoSaveTimerRef.current = window.setInterval(saveFormData, interval);
    return () => {
      if (autoSaveTimerRef.current) {
        window.clearInterval(autoSaveTimerRef.current);
        autoSaveTimerRef.current = null;
      }
    };
  }, [saveFormData, interval]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      saveFormData();
    }, 2000);
    return () => clearTimeout(debounceTimer);
  }, [formData, saveFormData]);

  const renderLastSavedText = useCallback(() => {
    if (!lastSaved) return null;
    return (
      <div className="text-xs text-stone-500 dark:text-stone-400 font-mono">
        Last saved: {lastSaved.toLocaleTimeString()}
      </div>
    );
  }, [lastSaved]);

  return {
    lastSaved,
    saveFormData,
    renderLastSavedText
  };
};

export default useFormAutosave;
