import "./bootstrap";
import "../css/app.css";
import "../css/global.css";

import React, { ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { AppProvider } from "@/Context/AppContext";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

type PageComponent = {
    default: React.ComponentType & {
        layout?: (children: React.ReactNode) => React.ReactNode;
    };
};

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const pages = import.meta.glob<PageComponent>("./Pages/**/*.tsx", {
            eager: true,
        });
        const pageComponent = pages[`./Pages/${name}.tsx`];
        if (!pageComponent) {
            throw new Error(`Page component for ${name} not found`);
        }

        const page = pageComponent.default;
        page.layout =
            page.layout ||
            ((children: ReactNode) => <MainLayout>{children}</MainLayout>);

        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        const renderWithLayout = (page: React.ReactNode) => (
            <MainLayout>{page}</MainLayout>
        );
        root.render(
            <AppProvider>
                <App {...props} />
            </AppProvider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
