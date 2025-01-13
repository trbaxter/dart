/// <reference types="vite/client" />

interface ImportMeta {
    readonly hot?: {
        accept: (callback?: () => void) => void;
        decline: () => void;
        dispose: (callback: (data: unknown) => void) => void;
        invalidate: () => void;
        on: (event: string, callback: (...args: unknown[]) => void) => void;
    };
}