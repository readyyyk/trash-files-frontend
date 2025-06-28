import { useState } from "react";
import { toast } from "sonner";

import { Toaster } from "@/components/ui/sonner";

import { sendFile } from "./api";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

function App() {
    // Get current date-time in 'YYYY-MM-DDTHH:mm' format
    const getCurrentDateTimeLocal = () => {
        const now = new Date();
        const pad = (n: number) => n.toString().padStart(2, "0");
        const year = String(now.getFullYear());
        const month = pad(now.getMonth() + 1);
        const day = pad(now.getDate());
        const hours = pad(now.getHours());
        const minutes = pad(now.getMinutes());
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };
    const [file, setFile] = useState<File | null>(null);
    const [expire, setExpire] = useState<number | null>(() =>
        Math.floor(new Date().getTime() / 1000),
    );
    const [expireInput, setExpireInput] = useState<string>(() => getCurrentDateTimeLocal());
    const [error, setError] = useState<string | null>(null);
    const isSendDisabled = !file || !expire;
    return (
        <div className="flex h-screen flex-col items-center justify-center bg-neutral-950 px-4">
            <div className="flex w-full max-w-md flex-col gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/80 p-4 shadow-2xl backdrop-blur-md transition-all duration-300">
                <h1 className="mb-2 text-center text-4xl font-extrabold tracking-tight text-white">
                    File trash
                </h1>
                <div className="flex flex-col gap-3">
                    <label
                        className="font-semibold text-neutral-300"
                        htmlFor="file-input"
                    >
                        Select file
                    </label>
                    <div className="flex items-center gap-3">
                        <label
                            className="inline-block cursor-pointer rounded-lg border border-white/10 bg-white/10 px-4 py-2 font-semibold text-white shadow-sm transition-colors hover:border-white/20 hover:bg-white/20"
                            htmlFor="file-input"
                        >
                            Choose File
                        </label>
                        <input
                            className="hidden"
                            id="file-input"
                            type="file"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                setError(null);
                                if (!file) return;
                                setFile(file);
                            }}
                        />
                        {file && (
                            <span className="max-w-[10rem] truncate text-sm text-neutral-400">
                                {file.name}
                            </span>
                        )}
                    </div>
                </div>
                <div className="mt-1 flex flex-col gap-3">
                    <label
                        className="font-semibold text-neutral-300"
                        htmlFor="expire-input"
                    >
                        Expire at
                    </label>
                    <Input
                        className="rounded-lg border border-neutral-700 bg-neutral-800 text-white transition-all duration-200 placeholder:text-neutral-500 focus:border-white/30 focus:ring-2 focus:ring-white/20"
                        id="expire-input"
                        min={expireInput}
                        type="datetime-local"
                        value={expireInput}
                        onChange={(e) => {
                            const value = e.target.value;
                            setExpireInput(value);
                            setError(null);
                            // Convert to timestamp (seconds since epoch)
                            const timestamp =
                                value ? Math.floor(new Date(value).getTime() / 1000) : null;
                            setExpire(timestamp);
                        }}
                    />
                    <span className="text-xs text-neutral-500">
                        Choose when the file should expire (must be in the future).
                    </span>
                </div>
                <Button
                    className="mt-2 w-full rounded-lg bg-white py-2 font-bold text-black shadow transition-colors hover:bg-neutral-200 disabled:bg-neutral-700 disabled:text-neutral-400"
                    disabled={isSendDisabled}
                    onClick={() => {
                        void (async () => {
                            if (!file || !expire) {
                                setError("Please select a file and expiration date.");
                                return;
                            }
                            setError(null);
                            const result = await sendFile(
                                file,
                                expire * 1000 - new Date().getTime(),
                            );
                            if (!result.success) {
                                setError(result.error.message);
                                toast.error(result.error.message);
                                return;
                            }
                            toast.success("File sent successfully");
                            setFile(null);
                            setError(null);
                        })();
                    }}
                >
                    Send
                </Button>
                {error && <div className="mt-2 text-center text-sm text-red-500">{error}</div>}
            </div>
            <Toaster />
        </div>
    );
}

export default App;
