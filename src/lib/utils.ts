import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const FILENAME_KEY = "uploaded_filenames";

export function saveFilenameToLocalStorage(filename: string) {
    const existing = getFilenamesFromLocalStorage();
    if (!existing.includes(filename)) {
        localStorage.setItem(FILENAME_KEY, JSON.stringify([...existing, filename]));
    }
}

export function getFilenamesFromLocalStorage(): string[] {
    const raw = localStorage.getItem(FILENAME_KEY);
    if (!raw) return [];
    try {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.every((item) => typeof item === "string")) {
            return parsed;
        }
        return [];
    } catch {
        return [];
    }
}

export function removeExpiredFilenamesFromLocalStorage() {
    const now = Date.now();
    const filenames = getFilenamesFromLocalStorage();
    const validFilenames = filenames.filter((filename) => {
        // Extract timestamp prefix before first underscore
        const match = /^(\d+)_/.exec(filename);
        if (!match) return false;
        const timestamp = Number(match[1]);
        return !isNaN(timestamp) && timestamp > now;
    });
    if (validFilenames.length !== filenames.length) {
        localStorage.setItem(FILENAME_KEY, JSON.stringify(validFilenames));
    }
    return validFilenames;
}
