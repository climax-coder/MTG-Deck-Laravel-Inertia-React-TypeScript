// Layouts/MainLayout.tsx

import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const { auth } = usePage<PageProps>().props;

    return (
        <>
            <Navbar auth={auth} />
            <div>{children}</div>
            <Footer />
        </>
    );
};

export default MainLayout;
