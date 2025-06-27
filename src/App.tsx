import { useState } from "react";

import viteLogo from "/vite.svg";
import reactLogo from "@/assets/react.svg";
import { Button } from "@/components/ui/button";

function App() {
    const [count, setCount] = useState(0);
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-y-4 bg-gradient-to-t from-slate-950 to-neutral-800">
            <div className="flex justify-center gap-4">
                <a
                    href="https://vite.dev"
                    rel="noreferrer"
                    target="_blank"
                >
                    <img
                        alt="Vite logo"
                        className="w-24"
                        src={viteLogo}
                    />
                </a>
                <a
                    href="https://react.dev"
                    rel="noreferrer"
                    target="_blank"
                >
                    <img
                        alt="React logo"
                        className="w-24 animate-spin"
                        src={reactLogo}
                        style={{ animationDuration: "10s" }}
                    />
                </a>
            </div>
            <h1 className="my-6 text-3xl">Vite + React</h1>
            <div className="flex items-center justify-center gap-x-2">
                <Button
                    onClick={() => {
                        setCount((count) => count + 1);
                    }}
                >
                    count is {count}
                </Button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p>Click on the Vite and React logos to learn more</p>
        </div>
    );
}

export default App;
