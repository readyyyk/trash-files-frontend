import { Copy, Download, File, FileWarning } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { getFileUrl } from "@/api";
import { getFilenamesFromLocalStorage, removeExpiredFilenamesFromLocalStorage } from "@/lib/utils";

export const List = () => {
    removeExpiredFilenamesFromLocalStorage();
    const files = getFilenamesFromLocalStorage();
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const handleCopy = async (url: string, idx: number) => {
        try {
            await navigator.clipboard.writeText(url);
            setCopiedIndex(idx);
            toast.success("URL copied to clipboard");
            setTimeout(() => {
                setCopiedIndex(null);
            }, 1200);
        } catch (e) {
            toast.error("Failed to copy URL");
        }
    };

    const handleDownload = (filename: string) => {
        toast("Download started", { description: filename });
    };

    if (!files.length) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <FileWarning
                    className="mb-4 text-neutral-400"
                    size={48}
                />
                <h1 className="mb-2 text-center text-2xl font-semibold text-neutral-400">
                    No files found
                </h1>
                <p className="text-center text-neutral-500">
                    You have no uploaded or unexpired files.
                </p>
            </div>
        );
    }
    return (
        <div className="mx-auto mt-8 w-full max-w-xl rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 shadow-lg">
            <h2 className="mb-4 text-center text-2xl font-bold text-white">Your Files</h2>
            <ul className="divide-y divide-neutral-800">
                {files.map((filename, i) => {
                    const url = getFileUrl(filename);
                    return (
                        <li
                            className="group flex items-center justify-between py-3"
                            key={i}
                        >
                            <div className="flex min-w-0 items-center gap-3">
                                <File
                                    className="shrink-0 text-blue-400"
                                    size={24}
                                />
                                <span
                                    className="max-w-[12rem] truncate font-mono text-sm text-white"
                                    title={filename}
                                >
                                    {filename}
                                </span>
                            </div>
                            <div className="ml-4 flex items-center gap-2">
                                <a
                                    download
                                    aria-label="Download file"
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500 text-white shadow transition hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    href={url}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    onClick={() => {
                                        handleDownload(filename);
                                    }}
                                >
                                    <Download size={18} />
                                </a>
                                <button
                                    aria-label="Copy file URL"
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800 text-neutral-200 transition hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    type="button"
                                    onClick={() => {
                                        void handleCopy(url, i);
                                    }}
                                >
                                    <Copy size={16} />
                                    <span className="sr-only">
                                        {copiedIndex === i ? "Copied!" : "Copy URL"}
                                    </span>
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
