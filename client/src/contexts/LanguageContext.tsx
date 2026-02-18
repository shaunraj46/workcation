import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { type Language, type TranslationKey, t as translate } from '@/i18n';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    toggleLanguage: () => void;
    t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('bfc-lang');
            if (saved === 'en' || saved === 'de') return saved;
        }
        return 'de'; // German default
    });

    const setLanguage = useCallback((lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('bfc-lang', lang);
        document.documentElement.lang = lang === 'de' ? 'de-DE' : 'en';
    }, []);

    const toggleLanguage = useCallback(() => {
        setLanguage(language === 'de' ? 'en' : 'de');
    }, [language, setLanguage]);

    const t = useCallback((key: TranslationKey) => {
        return translate(language, key);
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
