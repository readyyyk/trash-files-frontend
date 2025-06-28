import { List } from "@/components/List";
import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { UploadForm } from "@/components/UploadForm";

import { TabsList } from "./components/ui/tabs";

function App() {
    return (
        <div className="flex h-screen flex-col items-center justify-center bg-neutral-950 px-4">
            <Tabs
                className="flex max-w-[400px] flex-col items-center justify-center gap-4"
                defaultValue="form"
            >
                <TabsContent value="list">
                    <List />
                </TabsContent>
                <TabsContent value="form">
                    <UploadForm />
                </TabsContent>
                <TabsList className="fixed bottom-4 left-auto right-auto">
                    <TabsTrigger value="list">List</TabsTrigger>
                    <TabsTrigger value="form">Form</TabsTrigger>
                </TabsList>
            </Tabs>
            <Toaster />
        </div>
    );
}

export default App;
